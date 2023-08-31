import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {

        req.body = JSON?.parse?.(req.body);
        const { content } = req.body;

        try {
            const resp: any = await openai.chat.completions.create({
                model: "gpt-4-0613",
                //   model: "gpt-3.5-turbo-0613",
                messages: [{ role: "user", content: content }],
                functions: [
                    {
                        name: "review_sentiment_analyzer",
                        description: "sentiment analysis of the review",
                        parameters: {
                            type: "object",
                            properties: {
                                sentiment: {
                                    type: "string",
                                    enum: [
                                        "Positive",
                                        "Negative",
                                        "Neutral"
                                    ],
                                    description: "sentiment of the review",
                                }
                            }
                        }
                    }
                ],
                function_call: {
                    name: "review_sentiment_analyzer"
                }
            })

            const args = resp?.choices?.[0]?.message?.function_call?.arguments;

            // Check if args is already an object or needs parsing
            let data = typeof args === "string" ? JSON.parse(args) : args;

            return res.json({ data });
        } catch (e: any) {
            return res.status(400).send({
                error: e?.response?.data?.error?.message || "Internal server error",
            });
        }
    }
    else {
        res.status(500).json({ error: 'Invalid method' })
    }
}