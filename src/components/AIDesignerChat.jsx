import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Simple 3D Silver Ring Model
function SilverRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1, 0.3, 32, 100]} />
      <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

const steps = [
  {
    key: 'type',
    prompt: 'What type of silver jewelry would you like to design? (e.g., ring, bracelet, pendant)'
  },
  {
    key: 'style',
    prompt: 'Great! What shape or style do you want for your jewelry? (e.g., round, heart, stone, engraving)'
  },
  {
    key: 'details',
    prompt: 'Any other details? (e.g., stone color, engravings, size, or say "no" to finish)'
  }
];

const defaultMessages = [
  {
    from: 'ai',
    text: steps[0].prompt
  }
];

const validTypes = ['ring', 'bracelet', 'pendant'];

const AIDesignerChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState({ type: '', style: '', details: '' });
  const [show3D, setShow3D] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);

    // Step logic
    if (stepIndex === 0) {
      // Validate jewelry type
      const type = input.trim().toLowerCase();
      if (!validTypes.includes(type)) {
        setInput('');
        setTimeout(() => {
          setMessages((msgs) => [
            ...msgs,
            { from: 'ai', text: `Sorry, I didn't recognize that jewelry type. Please choose: ring, bracelet, or pendant.` }
          ]);
        }, 500);
        return;
      }
    }
    if (stepIndex < steps.length) {
      const key = steps[stepIndex].key;
      setForm((prev) => ({ ...prev, [key]: input }));
      setInput('');
      setTimeout(() => {
        if (stepIndex < steps.length - 1 && input.toLowerCase() !== 'no') {
          setMessages((msgs) => [
            ...msgs,
            { from: 'ai', text: steps[stepIndex + 1].prompt }
          ]);
          setStepIndex(stepIndex + 1);
        } else {
          setMessages((msgs) => [
            ...msgs,
            { from: 'ai', text: 'Here is a 3D preview of your custom silver jewelry!' }
          ]);
          setShow3D(true);
        }
      }, 700);
    } else {
      setInput('');
    }
  };

  const handleRestart = () => {
    setMessages([{ from: 'ai', text: steps[0].prompt }]);
    setInput('');
    setStepIndex(0);
    setForm({ type: '', style: '', details: '' });
    setShow3D(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="ai-designer-fab"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        style={{ display: open ? 'none' : 'flex' }}
      >
        <MessageCircle size={28} />
        <span className="ai-designer-fab-label">AI Designer</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-designer-chat-window"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="ai-designer-chat-header">
              <span>AI Silver Jewelry Designer</span>
              <button className="ai-designer-close" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="ai-designer-chat-body">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`ai-designer-msg ${msg.from === 'ai' ? 'ai' : 'user'}`}
                >
                  {msg.text}
                </div>
              ))}
              {show3D && (
                <div className="ai-designer-3d-viewer">
                  <Canvas camera={{ position: [0, 0, 4] }} style={{ height: 200 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={0.7} />
                    <SilverRing />
                    <OrbitControls enablePan={false} />
                  </Canvas>
                  <div style={{ textAlign: 'center', marginTop: 8 }}>
                    <button onClick={handleRestart} style={{
                      background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 20,
                      padding: '0.5rem 1.5rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginTop: 8
                    }}>Design Another</button>
                  </div>
                </div>
              )}
            </div>
            {!show3D && (
              <form className="ai-designer-chat-input" onSubmit={handleSend} autoComplete="off">
                <input
                  type="text"
                  placeholder="Type your answer..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .ai-designer-fab {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1200;
          background: linear-gradient(135deg, #d4af37, #ffd700);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          cursor: pointer;
        }
        .ai-designer-fab-label {
          display: none;
        }
        @media (min-width: 500px) {
          .ai-designer-fab-label {
            display: inline;
          }
        }
        .ai-designer-chat-window {
          position: fixed;
          bottom: 2.5rem;
          right: 2.5rem;
          width: 340px;
          max-width: 95vw;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          z-index: 1300;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-height: 70vh;
        }
        .ai-designer-chat-header {
          background: linear-gradient(135deg, #2c3e50, #34495e);
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 600;
          flex-shrink: 0;
        }
        .ai-designer-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .ai-designer-chat-body {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          background: #f8f9fa;
          min-height: 120px;
          max-height: 40vh;
        }
        .ai-designer-msg {
          margin-bottom: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          max-width: 85%;
          word-break: break-word;
        }
        .ai-designer-msg.ai {
          background: #e6eaf0;
          color: #2c3e50;
          align-self: flex-start;
        }
        .ai-designer-msg.user {
          background: #d4af37;
          color: white;
          align-self: flex-end;
        }
        .ai-designer-3d-viewer {
          margin: 1rem 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .ai-designer-chat-input {
          display: flex;
          border-top: 1px solid #eee;
          background: #fff;
          flex-shrink: 0;
        }
        .ai-designer-chat-input input {
          flex: 1;
          border: none;
          padding: 1rem;
          font-size: 1rem;
          border-radius: 0;
          outline: none;
          background: transparent;
        }
        .ai-designer-chat-input button {
          background: linear-gradient(135deg, #d4af37, #ffd700);
          color: white;
          border: none;
          padding: 0 1.5rem;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 0 0 0 0;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default AIDesignerChat; 