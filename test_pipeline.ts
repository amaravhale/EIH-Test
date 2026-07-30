import { runMarketIntelligencePipeline } from './src/lib/ai/market-intelligence/pipeline';
import { config } from 'dotenv';
config({ path: '.env.local' });

async function test() {
  try {
    console.log("Starting pipeline...");
    const result = await runMarketIntelligencePipeline();
    console.log("Success! Extracted events:", result.events.length);
  } catch (error) {
    console.error("Pipeline Error:", error);
  }
}

test();
