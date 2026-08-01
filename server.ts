/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Express + Vite Server for AI Fitness Coach MVP
 * Server-side Gemini API integration for personalized coaching & split advice.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { generateWeeklySplit } from './src/services/splitGenerator.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for GoogleGenAI SDK to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      aiClient = new GoogleGenAI({ apiKey: key });
    }
  }
  return aiClient;
}

// ==========================================
// API Endpoints
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    ai_enabled: !!process.env.GEMINI_API_KEY 
  });
});

/**
 * POST /api/coach/generate-split
 * Generates an optimized weekly workout split
 */
app.post('/api/coach/generate-split', async (req, res) => {
  try {
    const userProfile = req.body.userProfile;
    if (!userProfile) {
      return res.status(400).json({ error: 'userProfile is required' });
    }

    // Always generate baseline scientific split
    const split = generateWeeklySplit(userProfile);

    // Optionally enhance with Gemini AI tips if available
    const ai = getAIClient();
    if (ai) {
      try {
        const prompt = `You are an expert AI Fitness Coach.
User profile:
- Name: ${userProfile.name}
- Goal: ${userProfile.goal} (build_muscle = hypertrophy, lose_fat = recomp/cut, strength = power)
- Experience: ${userProfile.experience_level}
- Equipment: ${userProfile.equipment_available}
- Weight: ${userProfile.weight} kg, Height: ${userProfile.height} cm

Provide a concise 2-sentence motivational summary and 3 key scientific rules for this user's weekly split in Armenian (or bilingual Armenian/English).
Return valid JSON matching:
{
  "coach_note": "string",
  "key_rules": ["rule 1", "rule 2", "rule 3"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          (split as any).ai_coach_notes = parsed;
        }
      } catch (err) {
        console.warn('AI enhancement fallback:', err);
      }
    }

    res.json({ split, success: true });
  } catch (error: any) {
    console.error('Error generating split:', error);
    res.status(500).json({ error: 'Failed to generate workout split' });
  }
});

/**
 * POST /api/coach/advice
 * Conversational AI Fitness Coach for Q&A, form check tips, and progressive overload
 */
app.post('/api/coach/advice', async (req, res) => {
  try {
    const { question, userProfile, recentSessions } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'question is required' });
    }

    const ai = getAIClient();
    if (!ai) {
      // Offline fallback response if API key isn't configured
      return res.json({
        summary: 'Առաջարկություն. Հետևեք Progressive Overload-ի սկզբունքին — յուրաքանչյուր շաբաթ ավելացրեք 1-2 կգ կամ 1-2 կրկնություն:',
        tips: [
          'Միշտ տաքացրեք հոդերը վարժությունից առաջ (5-10 րոպե):',
          'Պահպանեք ճիշտ տեխնիկա (Form over Ego)՝ վնասվածքներից խուսափելու համար:',
          'Քնեք առնվազն 7-8 ժամ և ընդունեք 1.6 - 2.0 գրամ սպիտակուց յուրաքանչյուր կգ քաշի համար:'
        ],
        progressive_overload_recommendation: 'Եթե վերջին սեթում RPE-ն 8-ից ցածր է, հաջորդ անգամ ավելացրեք 2.5 կգ:',
        form_focus: 'Վերահսկեք էկցենտրիկ (իջեցման) փուլը՝ 2-3 վայրկյան:'
      });
    }

    const prompt = `You are a professional, motivating AI Fitness Coach ("AI Ֆիթնես Մարզիչ") speaking in Armenian (with standard fitness terms in English parentheses).
User profile: ${JSON.stringify(userProfile || {})}
Recent workout logs count: ${recentSessions?.length || 0}
User Question: "${question}"

Respond in JSON format with clear, scientific, actionable advice:
{
  "summary": "Direct, helpful Armenian answer to the user's question (2-3 sentences)",
  "tips": ["Tip 1 in Armenian", "Tip 2 in Armenian", "Tip 3 in Armenian"],
  "progressive_overload_recommendation": "Specific weight/rep progression recommendation",
  "form_focus": "Key technique cue to focus on"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in coach advice:', error);
    res.status(500).json({ error: 'Failed to get coach advice' });
  }
});

// ==========================================
// Vite Middleware / Static Serving
// ==========================================

async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Fitness Coach server running on http://localhost:${PORT}`);
  });
}

setupServer();
