const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ key: process.env.CLOUD_TRANSLATE_KEY });

export default async function handler(req, res) {
    const { text, targetLanguage } = req.body;

    try {
        const [translation] = await translate.translate(text, targetLanguage);
        res.status(200).json({ translation });
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
}