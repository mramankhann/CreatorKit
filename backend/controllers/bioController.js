const { GoogleGenAI } = require('@google/genai');

// @desc    Generate an AI Profile Bio / Caption
// @route   POST /api/bio/generate
// @access  Private (Guests & Registered users both allowed to generate temporarily)
const generateBioPrompt = async (req, res) => {
  try {
    const { niche, tone, length, platforms } = req.body;
    
    if (!niche) {
      return res.status(400).json({ message: 'Topic/Niche is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'Server is missing Gemini API configuration.' });
    }

    // Initialize Gemini SDK with the key from .env
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Construct System Prompt
    const prompt = `You are an expert Social Media Manager and copywriter.
Write a highly engaging, ${tone || 'casual'} bio or profile caption for a content creator. 
Their main topic/niche is: "${niche}".
This bio will be used on the following platforms: ${platforms && platforms.length > 0 ? platforms.join(', ') : 'Instagram, TikTok, YouTube'}.
The length of the bio should be ${length || 'medium'} (For context: Short = 1 sentence, Medium = 2-3 sentences, Long = 4-5 sentences).

CRITICAL INSTRUCTIONS:
1. ONLY return a beautifully formatted JSON object.
2. Do NOT wrap it in markdown block quotes like \`\`\`json. Return the raw JSON directly.
3. The JSON must exactly match this structure:
{
  "bioText": "The actual text of the bio here. Use emojis naturally. Do not use hashtags in this string.",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
}
`;

    // Call the newly installed Gemini 2.5 Flash model
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: 0.8 }
      });
    } catch (modelError) {
      // 503 High Demand Fallback
      if (modelError.message && modelError.message.includes('503')) {
         console.warn("Gemini 2.5 is busy. Falling back to the stable 1.5 model...");
         response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: { temperature: 0.8 }
         });
      } else {
         throw modelError;
      }
    }

    let textResponse = response.text;
    
    // Safety fallback: strip any markdown if the LLM leaked them
    if (textResponse.startsWith('```json')) {
      textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (textResponse.startsWith('```')) {
      textResponse = textResponse.replace(/```/g, '').trim();
    }

    const parsedData = JSON.parse(textResponse);

    res.status(200).json(parsedData);
  } catch (error) {
    console.error('Gemini AI Generation Error:', error.message || error);
    
    // Check if even the fallback failed due to high demand
    if (error.message && error.message.includes('503')) {
      return res.status(503).json({ message: 'Google AI servers are currently experiencing high demand. Please wait a few seconds and try again.' });
    }
    
    res.status(500).json({ message: 'Failed to generate bio with AI. Ensure API key is valid.' });
  }
};

module.exports = { generateBio: generateBioPrompt };
