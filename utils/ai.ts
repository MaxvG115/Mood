import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { Document } from 'langchain/document'
import z from 'zod';

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
        mood: z.string().describe('The mood of the person who wrote the journal entry.'),
        summary: z.string().describe('Quick summary of the entire entry. Use no more than 8 words.'),
        subject: z.string().describe('The subject of the journal entry.'),
        negative: z.boolean().describe('Is the journal entry negative? (i.e. does it contain negative emotions?).'),
        color: z.string().describe('A hexadecimal color that represents the mood of the entry. Example #0101fe for blue representing happiness displayed in the entry.'),
    })
);

const getPrompt = async (content: string) => {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template:
        'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    });

    const input = await prompt.format({
        entry: content,
    });

    console.log('Generated Prompt Input:', input);

    return input;
};

export const analyze = async (content) => {
    const input = await getPrompt(content);
    const model = new ChatGoogleGenerativeAI({ temperature: 0, model: 'gemini-pro' })
    const result = await model.invoke(input)

    try{
        return parser.parse(result.content)
    }catch(e){
        console.log(e)
    }
};


export const qa = async (question, entries) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  )
  const model = new ChatGoogleGenerativeAI({ temperature: 0, model: 'gemini-pro' })
  const chain = loadQARefineChain(model)
  const embeddings = new GoogleGenerativeAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}