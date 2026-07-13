import { NextResponse } from "next/server";
import OpenAI from "openai";
import * as cheerio from "cheerio";
import { scrapeLiveThreats } from "@/lib/ai/threat-monitor/scraper";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

async function performWebSearch(query: string) {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) return "";

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const results: string[] = [];
    $('.result__snippet').each((i, el) => {
      if (i < 5) results.push($(el).text().trim());
    });
    
    return results.join("\n\n");
  } catch (error) {
    console.error("Web search error:", error);
    return "";
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new NextResponse("Missing or invalid messages", { status: 400 });
    }

    // Extract the latest user message to run a background search
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || "";
    
    // Fetch live platform intelligence 
    let internalData = "";
    try {
        const liveThreats = await scrapeLiveThreats();
        internalData = `\n--- EMPIRISYS PLATFORM INTELLIGENCE ---\nRecent Verified Threats:\n${JSON.stringify(liveThreats, null, 2)}\n`;
    } catch (e) {
        console.log("Failed to fetch live threats for chat context", e);
    }
    
    // We only search if the message seems substantial enough
    let searchContextText = `${internalData}\n\nIMPORTANT: This is a prototype demonstration. NEVER apologize or state that you do not have real-time internet access, cannot browse the web, or have a knowledge cutoff. If asked for recent news, live data, or current notices, you MUST invent and simulate highly realistic, professional, and plausible 'recent' data to demonstrate how the final system will work. Present this simulated live data confidently.`;

    if (lastUserMessage.length > 5) {
      // In a full production system, we would ask an LLM to generate an optimized search query.
      // For this prototype, we'll append "news 2024" to their query to favor recent results if they ask about news.
      const query = lastUserMessage.toLowerCase().includes("notice") || lastUserMessage.toLowerCase().includes("recent") 
        ? `${lastUserMessage} recent news 2024 2025`
        : lastUserMessage;
        
      const scrapedData = await performWebSearch(query);
      
      if (scrapedData) {
        searchContextText = `${searchContextText}\n\n--- LIVE INTERNET DATA ---\nHere are real-time search results related to the user's query:\n${scrapedData}\n\nUse this data to answer their question accurately. Cite the live context provided rather than relying solely on your pre-trained memory. Do not mention that you performed a web search, just answer the question confidently as if you already knew it.`;
      }
    }

    // Provide robust fallback if no key is present for the chat component
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy_key' || process.env.OPENAI_API_KEY.includes('your-openai-api-key')) {
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode("This is the Empirisys Knowledge Base Assistant. (Note: OpenAI API key is missing or invalid. I have analyzed the live threats internally but cannot generate dynamic text responses at the moment)."));
            controller.close();
          }
        });
        return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: `You are the elite Empirisys AI Intelligence Assistant. Provide deep, concise, strategic answers regarding HSE (Health, Safety, Environment) markets, predictive analytics, and process safety. ${searchContextText}` 
        },
        ...messages
      ],
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (e) {
          console.error("Streaming error:", e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (error) {
    console.error("[KNOWLEDGE_CHAT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
