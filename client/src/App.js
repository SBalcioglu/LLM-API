import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialChatLog = [{ user: "gpt", message: "How can I help you today?" }];
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState(initialChatLog);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [selectedModel, setSelectedModel] = useState("Select a Model");
  const [schemas, setSchemas] = useState({}); //
  const [timer, setTimer] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [inputTokenCount, setInputTokenCount] = useState(0);

  const models = ["GPT4","Deepseek", "Orca2"];

  useEffect(() => {
    let interval = null;
    if (isWaiting) {
      interval = setInterval(() => {
        setTimer((oldTimer) => oldTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isWaiting]);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await fetch('http://localhost:3080/schemas');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fetchedSchemas = await response.json();
        setSchemas(fetchedSchemas);
      } catch (error) {
        console.error("Failed to fetch schemas:", error);
      }
    };
  
    fetchSchemas();
  }, []);

  useEffect(() => {
    const fullText = selectedSchema ? schemas[selectedSchema] + "\n" + input : input;
    setInputTokenCount(countTokens(fullText));
  }, [input, selectedSchema, schemas]);

  function handleModelChange(event) {
    setSelectedModel(event.target.value);
  }

  function clearChat() {
    setChatLog([...initialChatLog]);
  }

  function handleSchemaChange(event) {
    setSelectedSchema(event.target.value);
  }

  function countTokens(text) {
    const tokens = text.split(/\s+|[,.!?;:()'"-]/).filter(Boolean);
    return tokens.length;
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let prependText = "";
    if (selectedSchema) {
      prependText = schemas[selectedSchema] + "\n";
    }
    setIsWaiting(true);
    setTimer(0);
    const startTime = Date.now();

    const messageToSend = prependText + input;
    const chatLogUpdate = [...chatLog, { user: "me", message: input, isWaiting: true }];
    setInput("");
    setChatLog(chatLogUpdate);

    try {
      const response = await fetch("http://localhost:3080/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend, model: selectedModel})
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const endTime = Date.now();
      const responseTime = ((endTime - startTime) / 1000).toFixed(1);
      const lastMessageIndex = chatLogUpdate.length - 1;
      chatLogUpdate[lastMessageIndex] = {
        ...chatLogUpdate[lastMessageIndex],
        responseTime: ` ${responseTime} s`,
        isWaiting: false, 
      };
      
      chatLogUpdate.push({ user: "gpt", message: data.message });
      setChatLog(chatLogUpdate);
    
      } catch (error) {
        console.error("An error occurred during the fetch operation:", error);
      } finally {
        setIsWaiting(false);
      }
    }
    
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span> New Chat
        </div>
        <select onChange={handleModelChange} value={selectedModel} className="model-selector">
        <option value="">Select a Model</option>
        {models.map(model => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
        <select onChange={handleSchemaChange} value={selectedSchema} className="schema-selector">
          <option value="">Select a Schema</option>
          {Object.keys(schemas).map(key => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isWaiting && <div className="timer"> {timer} seconds</div>}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={handleInputChange}
              className="chat-input-textarea"
              placeholder="Type your message here"
            />
            <div className="token-count-display">
            Total Token Count: {inputTokenCount}</div>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" ? "chatgpt" : ""}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" ? "chatgpt" : ""}`}>
        {message.user === "gpt" && <svg
            xmlns="http://www.w3.org/2000/svg"
            width={41}
            height={41}
            fill="none"
            className="icon-sm"
          >
            <text x={-9999} y={-9999}>
              {"ChatGPT"}
            </text>
            <path
              fill="currentColor"
              d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
            />
          </svg>}
        </div>
        <div className="message">
          {message.message}
          {message.responseTime && <span className="response-time">{message.responseTime}</span>}
          {message.isWaiting && <span className="response-time"></span>}
        </div>
      </div>
    </div>
  );
}

export default App;