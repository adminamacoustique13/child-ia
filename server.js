import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, 'dist')));

const SYSTEM_PROMPTS = {
  '4-7': `Tu es une IA pédagogique pour enfants de 4-7 ans. Règles absolues :
1. Maximum 2 phrases très courtes et simples.
2. Utilise des mots simples et une analogie avec le quotidien (doudou, goûter, parc, maman/papa...).
3. Ta dernière phrase doit contenir une petite question rigolote ou un truc bizarre qui donne envie d'en savoir plus. Langue : français.`,

  '8-11': `Tu es une IA pédagogique pour enfants de 8-11 ans. Règles absolues :
1. Maximum 3 phrases.
2. Commence toujours par une analogie avec du vécu d'enfant (dispute dans la cour, jouet, repas...).
3. Ta dernière phrase doit contenir une légère incongruité ou absurdité douce — quelque chose qui gratte et donne envie de poser une autre question. Jamais de réponse encyclopédique. Langue : français.`,

  '12-15': `Tu es une IA pédagogique pour ados de 12-15 ans. Règles absolues :
1. Maximum 4 phrases.
2. Commence par un angle inattendu ou une comparaison avec quelque chose de leur quotidien (réseaux sociaux, jeux vidéo, collège...).
3. Ta dernière phrase doit être une question philosophique ou un paradoxe qui pousse à réfléchir — jamais de morale. Langue : français.`,
};

app.post('/api/chat', async (req, res) => {
  const { question, ageGroup } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question manquante' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY non configurée sur le serveur' });
  }

  const systemPrompt = SYSTEM_PROMPTS[ageGroup] || SYSTEM_PROMPTS['8-11'];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: 'user', content: question }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || `Erreur API Anthropic (${response.status})`,
      });
    }

    const text = data.content?.[0]?.text || '';
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SPA fallback (Express v5 syntax)
app.get('{*path}', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Child-IA server running on port ${PORT}`);
});
