import * as cheerio from "cheerio";

/**
 * Performs a real-time web search via DuckDuckGo HTML interface.
 * Returns an empty string if the search fails, gets blocked, or returns no snippets.
 */
export async function performWebSearch(query: string): Promise<string> {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    
    const response = await fetch(url, {
      headers: {
        // High-quality modern user-agent to bypass basic bot protection
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      console.warn(`[performWebSearch] DuckDuckGo returned non-OK status: ${response.status}`);
      return "";
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const results: string[] = [];
    $('.result__snippet').each((i, el) => {
      // Limit to top 5 results to keep LLM context window manageable
      if (i < 5) {
        results.push($(el).text().trim());
      }
    });
    
    const combinedResults = results.join("\n\n");
    
    if (combinedResults.length > 0) {
      console.log(`[performWebSearch] Successfully extracted ${results.length} snippets for query: "${query}"`);
    } else {
      console.log(`[performWebSearch] No snippets found for query: "${query}"`);
    }

    return combinedResults;
  } catch (error) {
    console.error("[performWebSearch] Web search error:", error);
    return "";
  }
}
