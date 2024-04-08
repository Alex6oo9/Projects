import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Port = 5000;
const app = express();

// Use only one body parser middleware
app.use(bodyParser.json()); // Choose either bodyParser.json() or express.json()

app.use(cors());

const genAI = new GoogleGenerativeAI('AIzaSyC06aNxDPnWKrTtyxg83VkUX6CD2_88Eyk');

let datas_B:string[] = [];

async function run(inputData : string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = inputData;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log("type is ", typeof(text)); // Should be string

  return text;
}

function isLibraryRelated(userInput: string) {
  
  const libraryKeywords = ["book", "borrow", "research", "event"];
  return libraryKeywords.some(keyword => userInput.includes(keyword));
}


app.post('/answer', async (req, res) => {
  const inputData = req.body.message;
  console.log("The prompt is:", inputData);

  if (isLibraryRelated(inputData)) {
    console.log("Library-related response:");
  } else {
    console.log("Unrelated answer: Please ask related questions");
    res.status(400).send("Unrelated question: Please ask library-related questions"); 
    return;
  }

  try {
    const datas_A:string = await run(inputData);
    datas_B.push(datas_A);
    console.log("Data is:", datas_B);
    res.json({ response: datas_A }); 
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).send("Error generating response");
  }
});

app.listen(Port, () => console.log("Server is listening on", Port));
