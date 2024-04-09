import express from "express";
import OpenAI from "openai";
import Replicate from "replicate";
import bodyParser from "body-parser";
import cors from "cors"; 
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

function updateFileContent(filePath, stringToAdd) {
  let data = fs.readFileSync(filePath, 'utf8');
  let lines = data.split('\n');

  if (lines.length > 6) {
    lines = lines.slice(4, -2);
  } else {
    throw new Error(`File doesn't have enough lines to perform the operation.`);
  }

  lines.unshift(stringToAdd);

  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`Updated file: ${filePath}`);
}

const directoryPath = path.join(__dirname, 'tsfiles');
const outputDirectory = path.join(__dirname, 'schemas');
const stringFilePath = path.join(__dirname, 'strings', 'PromptString.txt');
const stringToAdd = fs.readFileSync(stringFilePath, 'utf8');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    return;
  }

  files.filter(file => path.extname(file) === '.ts').forEach(file => {
    const filePath = path.join(directoryPath, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const outputFileName = file.replace('.ts', '.txt');
    const outputPath = path.join(outputDirectory, outputFileName);

    fs.writeFileSync(outputPath, content);
    console.log(`Converted ${file} to ${outputFileName}`);

    try {
      updateFileContent(outputPath, stringToAdd);
    } catch (error) {
      console.error(error.message);
    }
  });
});

app.get('/schemas', (req, res) => {
  fs.readdir(outputDirectory, (err, files) => {
    if (err) {
      console.error("Could not list the directory.", err);
      res.status(500).send("Server error occurred while fetching schemas.");
      return;
    }

    let schemas = {};
    files.filter(file => path.extname(file) === '.txt').forEach(file => {
      const filePath = path.join(outputDirectory, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const schemaName = path.basename(file, '.txt');
      schemas[schemaName] = content;
    });

    res.setHeader('Content-Type', 'application/json');
    res.json(schemas);
  });
});

app.post('/', async (req, res) => {
  const { message, model } = req.body;

  try {
    if (model === "GPT4") {
      const openai = new OpenAI({
        organization: 'org-gYDm6NPlRc3h7esrImNoO9Xi',
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: message }],
      });

      const lastMessageContent = response.choices[0].message.content;

      res.json({
        message: lastMessageContent,
      });
    } else if (model === "Deepseek") {
      let data = JSON.stringify({
        messages: [
          {
            content: "You are a helpful assistant",
            role: "system"
          },
          {
            content: message,
            role: "user"
          }
        ],
        model: "deepseek-chat", 
        frequency_penalty: 0,
        max_tokens: 2048,
        presence_penalty: 0,
        stop: null,
        stream: false,
        temperature: 1,
        top_p: 1
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.deepseek.com/v1/chat/completions',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${process.env.DS_API_KEY}`
        },
        data: data
      };

      try {
        const deepseekResponse = await axios(config);
        const lastMessageContent = deepseekResponse.data.choices[0].message.content;
        res.json({ message: lastMessageContent });
      } catch (error) {
        console.error("Error during Deepseek API call:", error);
        res.status(500).send("An error occurred while processing your request with Deepseek.");
      }
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});