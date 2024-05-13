# LLM Query Explainer

## Description
This application serves as a dynamic interface to evaluate the performance of Large Language Models (LLMs) like GPT-4 and Deepseek in interpreting and explaining queries directed at knowledge graph schemas. Built on React for the frontend and Node.js for the backend, it provides a user-friendly platform for users to interact with LLMs, facilitating real-time evaluations and insights into LLM capabilities in processing complex knowledge graph queries.

## Features
Dynamic Schema Selection: Users can select different knowledge graph schemas in JSON format to set the context for their queries.
Model Selection: Choose between different LLM models such as GPT-4 and Deepseek to interpret the queries.
Real-time Query Processing: Submit queries related to the selected knowledge graph schema and receive interpretations and explanations in natural language.
Token Count Display: View the total token count used in the conversation, aiding in managing API usage effectively.

## Installation
1. Prerequisites:

Node.js installed on your system.
Access to GPT-4 and Deepseek APIs (API keys required).

2. Clone the repository:

Open a new terminal and type:
git clone https://github.com/SBalcioglu/LLM-Query-Explainer.git
cd LLM-Query-Explainer

3. Install dependencies:

For the back-end:
In the terminal from step 2, run:
    npm install

For the front-end:
Open a new terminal and run:
    cd client
    npm install

4. Configure Environment Variables:

Edit the .env.example file in the root directory. 
Add your GPT-4 and Deepseek API keys.

5. Start the Application:

Start the back-end server:
In the terminal from step 2, run:
    node index.js

Start the front-end client:
Open a new terminal and run:
    cd client
    npm start

The application should now be running and accessible through http://localhost:3000. (It'll automatically load if ready)

## Usage

1.Select a knowledge graph schema: Choose from the available schemas which set the context for your query.
2.Choose an LLM model: Select the model you wish to use for interpreting your query.
3.Input your query: Type in your query related to the selected schema.
4.Submit: Submit your query and wait for the LLM's response.

## Contributing
Contributions are welcome! If you have suggestions for improving this application or have found a bug, please open an issue or submit a pull request.

## Author
Abdussamed Balcioglu
