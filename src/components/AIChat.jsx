import { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, Coins, MessageCircle, Eye } from 'lucide-react';
import Jewelry3DViewer from './Jewelry3DViewer';

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI jewelry designer. I can help you create custom jewelry pieces and generate a special gold coin containing your design. What would you like to create today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCoin, setGeneratedCoin] = useState(null);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [currentDesign, setCurrentDesign] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const responses = [
      "I love your design idea! Let me create a beautiful gold coin with your jewelry piece inside. The coin will feature intricate engravings and your custom design will be perfectly preserved within.",
      "Excellent choice! I'm crafting a special gold coin that will contain your jewelry creation. The coin will have a unique serial number and your design will be embedded with precious materials.",
      "Fantastic! I'm generating a one-of-a-kind gold coin with your jewelry piece. The coin will have a holographic effect and your design will be the centerpiece of this collectible item.",
      "Amazing design concept! I'm creating a premium gold coin that will house your jewelry creation. The coin will feature a transparent window showing your piece and include authentication details.",
      "Perfect! I'm designing a luxury gold coin with your jewelry piece inside. The coin will have a rotating mechanism to showcase your design and include a certificate of authenticity."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Generate a unique coin
    const coin = {
      id: Date.now(),
      serialNumber: `LC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      design: userMessage,
      createdAt: new Date(),
      features: [
        "24K Gold Plated",
        "Holographic Effect",
        "Rotating Mechanism",
        "Certificate of Authenticity",
        "Limited Edition"
      ]
    };
    
    setGeneratedCoin(coin);
    setCurrentDesign(userMessage);
    
    return {
      content: randomResponse,
      coin: coin
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Generate AI response
    const aiResponse = await generateAIResponse(userMessage);
    
    const aiMsg = {
      id: Date.now() + 1,
      type: 'ai',
      content: aiResponse.content,
      timestamp: new Date(),
      coin: aiResponse.coin
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsGenerating(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className={`ai-chat-overlay ${isOpen ? 'open' : ''}`}>
        <div className="ai-chat-modal">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <Sparkles size={20} />
              <span>AI Jewelry Designer</span>
            </div>
            <button onClick={onClose} className="ai-chat-close">
              <X size={20} />
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`ai-message ${message.type}`}>
                <div className="ai-message-content">
                  <div className="ai-message-text">{message.content}</div>
                  {message.coin && (
                    <div className="generated-coin">
                      <div className="coin-header">
                        <Coins size={24} />
                        <h4>Your Custom Gold Coin</h4>
                      </div>
                      <div className="coin-details">
                        <div className="coin-serial">
                          <strong>Serial Number:</strong> {message.coin.serialNumber}
                        </div>
                        <div className="coin-design">
                          <strong>Design:</strong> {message.coin.design}
                        </div>
                        <div className="coin-features">
                          <strong>Features:</strong>
                          <ul>
                            {message.coin.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="coin-created">
                          <strong>Created:</strong> {message.coin.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="coin-preview">
                        <div className="coin-visual">
                          <div className="coin-front">
                            <div className="coin-center">
                              <Sparkles size={32} />
                            </div>
                            <div className="coin-text">LUXE JEWELRY</div>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="view-3d-btn"
                        onClick={() => setShow3DViewer(true)}
                      >
                        <Eye size={16} />
                        View 360° Design
                      </button>
                    </div>
                  )}
                  <div className="ai-message-time">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="ai-message ai">
                <div className="ai-message-content">
                  <div className="ai-typing">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span>Creating your custom gold coin...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input">
            <div className="input-container">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe the jewelry piece you'd like me to create..."
                disabled={isGenerating}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isGenerating}
                className="send-button"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="ai-chat-suggestions">
              <span>Try asking:</span>
              <div className="suggestion-chips">
                <button onClick={() => setInputValue("Create a diamond ring with rose gold band")}>
                  Diamond ring with rose gold
                </button>
                <button onClick={() => setInputValue("Design a sapphire necklace with silver chain")}>
                  Sapphire necklace
                </button>
                <button onClick={() => setInputValue("Make emerald earrings with gold setting")}>
                  Emerald earrings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {show3DViewer && (
        <div className="viewer-overlay">
          <Jewelry3DViewer 
            design={currentDesign}
            onClose={() => setShow3DViewer(false)}
          />
        </div>
      )}
    </>
  );
};

export default AIChat; 