import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { DotLoader } from 'react-spinners';
import { getGroqResponse } from '../../utils/groqClient.ts';
import ReactMarkdown from 'react-markdown';
import "./ChatBot.css"

interface Message {
  content: string;
  isUser: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
  
    // Add user message
    setMessages(prev => [...prev, { content: inputMessage, isUser: true }]);
    setInputMessage('');
    setIsLoading(true);
  
    try {
      // Get Groq response
      const botResponse = await getGroqResponse(inputMessage);
      
      setMessages(prev => [...prev, { 
        content: botResponse || "I couldn't process that agricultural query.", 
        isUser: false 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        content: "Error connecting to farming knowledge base. Please check your internet.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Agri Bot</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                {msg.isUser ? (
                  msg.content
                ) : (
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
            {isLoading && <DotLoader size={30} color="#2c3e50" />}
            <div ref={messagesEndRef} />
          </div>

          <form className="input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about crops, weather, or farming..."
            />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaRobot size={24} />
      </button>
    </div>
  );
}