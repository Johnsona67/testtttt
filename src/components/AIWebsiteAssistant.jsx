import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Settings, Save, Undo, Eye, Palette, Type, Layout, Video, Image, Brain, Upload, Download, Sparkles } from 'lucide-react';
import { useWebsiteContent } from '../context/WebsiteContentContext';

const AIWebsiteAssistant = ({ isOpen, onClose }) => {
  const { 
    websiteContent, 
    designSettings,
    updateWebsiteContent, 
    updateDesignSettings,
    addCustomSection,
    removeCustomSection,
    saveContentToBackend,
    saveDesignToBackend
  } = useWebsiteContent();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI web design assistant, and I work just like ChatGPT. Simply tell me how you want to update your website design in natural language, and I'll make it happen instantly! \n\nTry saying things like:\n• 'I want a modern dark theme with blue accents'\n• 'Make the header more elegant with a golden gradient'\n• 'Apply a minimalist design with lots of white space'\n• 'Change the fonts to serif for elegance'\n• 'Make the text bigger and add more spacing'\n• 'Import my ChatGPT knowledge for better assistance'\n\nJust describe your vision, and I'll transform your website accordingly!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [contentHistory, setContentHistory] = useState([]);
  const [designHistory, setDesignHistory] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [isKnowledgeMode, setIsKnowledgeMode] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load knowledge base from localStorage or backend
  useEffect(() => {
    loadKnowledgeBase();
  }, []);

  const loadKnowledgeBase = async () => {
    try {
      // Try to load from localStorage first
      const savedKnowledge = localStorage.getItem('chatgpt-knowledge');
      if (savedKnowledge) {
        setKnowledgeBase(JSON.parse(savedKnowledge));
      }
      
      // Also try to load from backend
      const response = await fetch('/api/get-knowledge');
      if (response.ok) {
        const backendKnowledge = await response.json();
        setKnowledgeBase(backendKnowledge);
        localStorage.setItem('chatgpt-knowledge', JSON.stringify(backendKnowledge));
      }
    } catch (error) {
      console.error('Error loading knowledge base:', error);
    }
  };

  const saveKnowledgeBase = async (knowledge) => {
    try {
      // Save to localStorage
      localStorage.setItem('chatgpt-knowledge', JSON.stringify(knowledge));
      
      // Save to backend
      const response = await fetch('/api/save-knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(knowledge)
      });
      
      if (response.ok) {
        console.log('Knowledge base saved successfully');
      }
    } catch (error) {
      console.error('Error saving knowledge base:', error);
    }
  };

  // Import ChatGPT knowledge
  const importChatGPTKnowledge = async (knowledgeData) => {
    try {
      setIsProcessing(true);
      
      // Process and structure the knowledge
      const processedKnowledge = processKnowledgeData(knowledgeData);
      
      // Add to existing knowledge base
      const updatedKnowledge = [...knowledgeBase, ...processedKnowledge];
      setKnowledgeBase(updatedKnowledge);
      
      // Save to storage
      await saveKnowledgeBase(updatedKnowledge);
      
      return {
        content: `Successfully imported ${processedKnowledge.length} knowledge items from ChatGPT! I now have access to this information and can use it to provide better assistance.`,
        success: true
      };
    } catch (error) {
      return {
        content: "Sorry, I couldn't import the ChatGPT knowledge. Please check the format and try again.",
        success: false
      };
    } finally {
      setIsProcessing(false);
    }
  };

  // Process different types of knowledge data
  const processKnowledgeData = (data) => {
    const processed = [];
    
    if (Array.isArray(data)) {
      // Handle array of knowledge items
      data.forEach(item => {
        if (item.question && item.answer) {
          processed.push({
            type: 'qa',
            question: item.question,
            answer: item.answer,
            category: item.category || 'general',
            tags: item.tags || []
          });
        } else if (item.topic && item.content) {
          processed.push({
            type: 'topic',
            topic: item.topic,
            content: item.content,
            category: item.category || 'general',
            tags: item.tags || []
          });
        }
      });
    } else if (typeof data === 'object') {
      // Handle single knowledge object
      if (data.questions && Array.isArray(data.questions)) {
        data.questions.forEach(qa => {
          processed.push({
            type: 'qa',
            question: qa.question,
            answer: qa.answer,
            category: qa.category || 'general',
            tags: qa.tags || []
          });
        });
      }
      
      if (data.topics && Array.isArray(data.topics)) {
        data.topics.forEach(topic => {
          processed.push({
            type: 'topic',
            topic: topic.title,
            content: topic.content,
            category: topic.category || 'general',
            tags: topic.tags || []
          });
        });
      }
    }
    
    return processed;
  };

  // Search knowledge base for relevant information
  const searchKnowledgeBase = (query) => {
    const lowerQuery = query.toLowerCase();
    const relevantKnowledge = knowledgeBase.filter(item => {
      if (item.type === 'qa') {
        return item.question.toLowerCase().includes(lowerQuery) || 
               item.answer.toLowerCase().includes(lowerQuery) ||
               item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      } else if (item.type === 'topic') {
        return item.topic.toLowerCase().includes(lowerQuery) || 
               item.content.toLowerCase().includes(lowerQuery) ||
               item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      }
      return false;
    });
    
    return relevantKnowledge;
  };

  // Save current state to history
  const saveToHistory = (type, data) => {
    if (type === 'content') {
      setContentHistory(prev => [...prev, { ...websiteContent, timestamp: new Date() }]);
    } else if (type === 'design') {
      setDesignHistory(prev => [...prev, { ...designSettings, timestamp: new Date() }]);
    }
  };

  // Enhanced natural language design processing
  const processNaturalLanguageDesign = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    let updatedDesign = { ...designSettings };
    let changes = [];

    // Theme-based changes with more natural language
    if (lowerMessage.includes('dark theme') || lowerMessage.includes('dark mode') || lowerMessage.includes('make it dark')) {
      updatedDesign.backgroundColor = '#1a1a1a';
      updatedDesign.textColor = '#ffffff';
      updatedDesign.primaryColor = '#3b82f6';
      updatedDesign.secondaryColor = '#8b5cf6';
      updatedDesign.borderColor = '#374151';
      changes.push('Applied dark theme with blue accents');
    }
    
    else if (lowerMessage.includes('light theme') || lowerMessage.includes('light mode') || lowerMessage.includes('make it light')) {
      updatedDesign.backgroundColor = '#ffffff';
      updatedDesign.textColor = '#374151';
      updatedDesign.primaryColor = '#d4af37';
      updatedDesign.secondaryColor = '#764ba2';
      updatedDesign.borderColor = '#e5e7eb';
      changes.push('Applied light theme with golden accents');
    }
    
    else if (lowerMessage.includes('modern') && (lowerMessage.includes('theme') || lowerMessage.includes('look') || lowerMessage.includes('style'))) {
      updatedDesign.backgroundColor = '#f8fafc';
      updatedDesign.textColor = '#1e293b';
      updatedDesign.primaryColor = '#3b82f6';
      updatedDesign.secondaryColor = '#10b981';
      updatedDesign.headingFont = 'sans-serif';
      updatedDesign.bodyFont = 'sans-serif';
      updatedDesign.borderRadius = '12px';
      updatedDesign.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
      changes.push('Applied modern theme with clean typography and subtle shadows');
    }
    
    else if (lowerMessage.includes('elegant') || lowerMessage.includes('luxury') || lowerMessage.includes('sophisticated')) {
      updatedDesign.primaryColor = '#d4af37';
      updatedDesign.secondaryColor = '#8b5cf6';
      updatedDesign.headingFont = 'serif';
      updatedDesign.bodyFont = 'serif';
      updatedDesign.backgroundGradient = 'linear-gradient(135deg, #d4af37 0%, #8b5cf6 100%)';
      updatedDesign.backgroundType = 'gradient';
      updatedDesign.borderRadius = '8px';
      updatedDesign.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.3)';
      changes.push('Applied elegant luxury theme with golden gradients');
    }
    
    else if (lowerMessage.includes('minimalist') || lowerMessage.includes('minimal') || lowerMessage.includes('clean') || lowerMessage.includes('simple')) {
      updatedDesign.backgroundColor = '#ffffff';
      updatedDesign.textColor = '#000000';
      updatedDesign.primaryColor = '#000000';
      updatedDesign.secondaryColor = '#666666';
      updatedDesign.headingFont = 'sans-serif';
      updatedDesign.bodyFont = 'sans-serif';
      updatedDesign.borderRadius = '0px';
      updatedDesign.boxShadow = 'none';
      updatedDesign.borderWidth = '0px';
      updatedDesign.elementPadding = '24px';
      updatedDesign.elementMargin = '32px';
      changes.push('Applied minimalist design with clean lines and lots of white space');
    }

    // Color-specific changes with natural language
    if (lowerMessage.includes('blue') || lowerMessage.includes('blues') || lowerMessage.includes('make it blue')) {
      updatedDesign.primaryColor = '#3b82f6';
      updatedDesign.secondaryColor = '#1d4ed8';
      if (lowerMessage.includes('gradient')) {
        updatedDesign.backgroundGradient = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
        updatedDesign.backgroundType = 'gradient';
      }
      changes.push('Applied blue color scheme');
    }
    
    else if (lowerMessage.includes('green') || lowerMessage.includes('greens') || lowerMessage.includes('make it green')) {
      updatedDesign.primaryColor = '#10b981';
      updatedDesign.secondaryColor = '#059669';
      if (lowerMessage.includes('gradient')) {
        updatedDesign.backgroundGradient = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        updatedDesign.backgroundType = 'gradient';
      }
      changes.push('Applied green color scheme');
    }
    
    else if (lowerMessage.includes('purple') || lowerMessage.includes('purples') || lowerMessage.includes('make it purple')) {
      updatedDesign.primaryColor = '#8b5cf6';
      updatedDesign.secondaryColor = '#7c3aed';
      if (lowerMessage.includes('gradient')) {
        updatedDesign.backgroundGradient = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
        updatedDesign.backgroundType = 'gradient';
      }
      changes.push('Applied purple color scheme');
    }
    
    else if (lowerMessage.includes('golden') || lowerMessage.includes('gold') || lowerMessage.includes('make it golden')) {
      updatedDesign.primaryColor = '#d4af37';
      updatedDesign.secondaryColor = '#ffd700';
      if (lowerMessage.includes('gradient')) {
        updatedDesign.backgroundGradient = 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)';
        updatedDesign.backgroundType = 'gradient';
      }
      changes.push('Applied golden color scheme');
    }

    // Typography changes with natural language
    if (lowerMessage.includes('serif') || lowerMessage.includes('elegant font') || lowerMessage.includes('classic font')) {
      updatedDesign.headingFont = 'serif';
      updatedDesign.bodyFont = 'serif';
      changes.push('Applied serif typography for elegant look');
    }
    
    else if (lowerMessage.includes('sans-serif') || lowerMessage.includes('modern font') || lowerMessage.includes('clean font')) {
      updatedDesign.headingFont = 'sans-serif';
      updatedDesign.bodyFont = 'sans-serif';
      changes.push('Applied sans-serif typography for modern look');
    }
    
    else if (lowerMessage.includes('larger font') || lowerMessage.includes('bigger text') || lowerMessage.includes('increase font size')) {
      updatedDesign.fontSize.h1 = '4rem';
      updatedDesign.fontSize.h2 = '3rem';
      updatedDesign.fontSize.h3 = '2.5rem';
      updatedDesign.fontSize.body = '1.2rem';
      changes.push('Increased font sizes for better readability');
    }
    
    else if (lowerMessage.includes('smaller font') || lowerMessage.includes('compact text') || lowerMessage.includes('decrease font size')) {
      updatedDesign.fontSize.h1 = '2.5rem';
      updatedDesign.fontSize.h2 = '2rem';
      updatedDesign.fontSize.h3 = '1.5rem';
      updatedDesign.fontSize.body = '0.9rem';
      changes.push('Decreased font sizes for compact layout');
    }

    // Layout and spacing changes with natural language
    if (lowerMessage.includes('more space') || lowerMessage.includes('lots of white space') || lowerMessage.includes('breathing room')) {
      updatedDesign.elementMargin = '48px';
      updatedDesign.elementPadding = '32px';
      updatedDesign.sectionSpacing = '120px';
      changes.push('Increased spacing for more breathing room');
    }
    
    else if (lowerMessage.includes('compact') || lowerMessage.includes('tight layout') || lowerMessage.includes('less space')) {
      updatedDesign.elementMargin = '8px';
      updatedDesign.elementPadding = '8px';
      updatedDesign.sectionSpacing = '40px';
      changes.push('Applied compact layout with tight spacing');
    }
    
    else if (lowerMessage.includes('rounded corners') || lowerMessage.includes('soft edges') || lowerMessage.includes('make it rounded')) {
      updatedDesign.borderRadius = '16px';
      changes.push('Applied rounded corners for soft appearance');
    }
    
    else if (lowerMessage.includes('sharp corners') || lowerMessage.includes('clean edges') || lowerMessage.includes('make it sharp')) {
      updatedDesign.borderRadius = '0px';
      changes.push('Applied sharp corners for clean appearance');
    }

    // Header and navigation changes with natural language
    if (lowerMessage.includes('taller header') || lowerMessage.includes('larger header') || lowerMessage.includes('make header bigger')) {
      updatedDesign.headerHeight = '100px';
      changes.push('Made header taller');
    }
    
    else if (lowerMessage.includes('shorter header') || lowerMessage.includes('compact header') || lowerMessage.includes('make header smaller')) {
      updatedDesign.headerHeight = '60px';
      changes.push('Made header more compact');
    }
    
    else if (lowerMessage.includes('center logo') || lowerMessage.includes('centered header') || lowerMessage.includes('logo in center')) {
      updatedDesign.headerLogoPosition = 'center';
      changes.push('Centered header logo');
    }

    // Animation and effects with natural language
    if (lowerMessage.includes('smooth animations') || lowerMessage.includes('gentle transitions') || lowerMessage.includes('make it smooth')) {
      updatedDesign.transitionDuration = '0.5s';
      updatedDesign.hoverEffect = 'scale(1.02)';
      changes.push('Applied smooth animations and gentle transitions');
    }
    
    else if (lowerMessage.includes('subtle shadows') || lowerMessage.includes('soft shadows') || lowerMessage.includes('gentle shadows')) {
      updatedDesign.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
      changes.push('Applied subtle shadows for depth');
    }
    
    else if (lowerMessage.includes('bold shadows') || lowerMessage.includes('strong shadows') || lowerMessage.includes('dramatic shadows')) {
      updatedDesign.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
      changes.push('Applied bold shadows for dramatic effect');
    }

    // Section visibility with natural language
    if (lowerMessage.includes('hide features') || lowerMessage.includes('remove features') || lowerMessage.includes('no features')) {
      updatedDesign.showFeatures = false;
      changes.push('Hidden features section');
    }
    
    else if (lowerMessage.includes('show features') || lowerMessage.includes('display features') || lowerMessage.includes('add features')) {
      updatedDesign.showFeatures = true;
      changes.push('Made features section visible');
    }
    
    else if (lowerMessage.includes('hide products') || lowerMessage.includes('remove products') || lowerMessage.includes('no products')) {
      updatedDesign.showProducts = false;
      changes.push('Hidden products section');
    }
    
    else if (lowerMessage.includes('show products') || lowerMessage.includes('display products') || lowerMessage.includes('add products')) {
      updatedDesign.showProducts = true;
      changes.push('Made products section visible');
    }

    return { updatedDesign, changes };
  };

  // Process AI commands and update content/design
  const processAICommand = async (userMessage) => {
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = userMessage.toLowerCase();
    let updatedContent = { ...websiteContent };
    let updatedDesign = { ...designSettings };
    let aiResponse = "I understand you want to make changes. Let me help you with that.";
    let changesMade = false;
    let changeType = '';

    // Enhanced natural language design processing
    if (lowerMessage.includes('theme') || lowerMessage.includes('design') || 
        lowerMessage.includes('style') || lowerMessage.includes('look') ||
        lowerMessage.includes('appearance') || lowerMessage.includes('make it') ||
        lowerMessage.includes('change the') || lowerMessage.includes('update the') ||
        lowerMessage.includes('i want') || lowerMessage.includes('can you') ||
        lowerMessage.includes('please') || lowerMessage.includes('would you')) {
      
      const designResult = processNaturalLanguageDesign(userMessage);
      if (designResult.changes.length > 0) {
        updatedDesign = designResult.updatedDesign;
        changesMade = true;
        changeType = 'design';
        aiResponse = `Perfect! I've updated your website design based on your request: ${designResult.changes.join(', ')}. The changes have been applied to create the look you described.`;
      } else {
        // Try to understand more specific requests
        if (lowerMessage.includes('color') || lowerMessage.includes('colour')) {
          const color = extractColor(userMessage);
          if (color) {
            updatedDesign.primaryColor = color;
            changesMade = true;
            changeType = 'design';
            aiResponse = `Great! I've changed the primary color to ${color} as you requested.`;
          }
        }
        
        if (lowerMessage.includes('font') || lowerMessage.includes('text')) {
          if (lowerMessage.includes('bigger') || lowerMessage.includes('larger')) {
            updatedDesign.fontSize.h1 = '4rem';
            updatedDesign.fontSize.h2 = '3rem';
            updatedDesign.fontSize.body = '1.2rem';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Perfect! I've increased the font sizes to make the text more readable.`;
          } else if (lowerMessage.includes('smaller') || lowerMessage.includes('compact')) {
            updatedDesign.fontSize.h1 = '2.5rem';
            updatedDesign.fontSize.h2 = '2rem';
            updatedDesign.fontSize.body = '0.9rem';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Great! I've made the fonts smaller for a more compact look.`;
          }
        }
        
        if (lowerMessage.includes('space') || lowerMessage.includes('padding') || lowerMessage.includes('margin')) {
          if (lowerMessage.includes('more') || lowerMessage.includes('increase')) {
            updatedDesign.elementMargin = '48px';
            updatedDesign.elementPadding = '32px';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Excellent! I've increased the spacing to give your website more breathing room.`;
          } else if (lowerMessage.includes('less') || lowerMessage.includes('decrease')) {
            updatedDesign.elementMargin = '8px';
            updatedDesign.elementPadding = '8px';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Perfect! I've reduced the spacing for a more compact layout.`;
          }
        }
        
        if (lowerMessage.includes('header')) {
          if (lowerMessage.includes('bigger') || lowerMessage.includes('taller')) {
            updatedDesign.headerHeight = '100px';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Great! I've made the header taller as you requested.`;
          } else if (lowerMessage.includes('smaller') || lowerMessage.includes('shorter')) {
            updatedDesign.headerHeight = '60px';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Perfect! I've made the header more compact.`;
          }
        }
        
        if (lowerMessage.includes('shadow') || lowerMessage.includes('shadow')) {
          if (lowerMessage.includes('more') || lowerMessage.includes('stronger')) {
            updatedDesign.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Excellent! I've added stronger shadows for more depth and drama.`;
          } else if (lowerMessage.includes('less') || lowerMessage.includes('subtle')) {
            updatedDesign.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Perfect! I've made the shadows more subtle and gentle.`;
          }
        }
        
        if (lowerMessage.includes('corner') || lowerMessage.includes('border')) {
          if (lowerMessage.includes('round') || lowerMessage.includes('soft')) {
            updatedDesign.borderRadius = '16px';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Great! I've made the corners rounded for a softer appearance.`;
          } else if (lowerMessage.includes('sharp') || lowerMessage.includes('clean')) {
            updatedDesign.borderRadius = '0px';
            changesMade = true;
            changeType = 'design';
            aiResponse = `Perfect! I've made the corners sharp for a clean, modern look.`;
          }
        }
        
        if (!changesMade) {
          aiResponse = "I understand you want to make design changes. Could you be more specific? Try saying things like 'I want a modern dark theme', 'make the fonts bigger', 'add more space between elements', or 'change the colors to blue'.";
        }
      }
    }

    // Content changes with natural language
    else if (lowerMessage.includes('headline') || lowerMessage.includes('title')) {
      const newHeadline = extractNewText(userMessage, 'headline');
      if (newHeadline) {
        updatedContent.headline = newHeadline;
        changesMade = true;
        changeType = 'content';
        aiResponse = `Perfect! I've updated the headline to "${newHeadline}" as you requested.`;
      } else {
        aiResponse = "I'd be happy to change the headline! Please tell me what you'd like the new headline to say.";
      }
    }
    
    else if (lowerMessage.includes('description') || lowerMessage.includes('text') || lowerMessage.includes('content')) {
      const newDescription = extractNewText(userMessage, 'description');
      if (newDescription) {
        updatedContent.description = newDescription;
        changesMade = true;
        changeType = 'content';
        aiResponse = `Great! I've updated the description to "${newDescription}" as you requested.`;
      } else {
        aiResponse = "I'd be happy to change the description! Please tell me what you'd like the new description to say.";
      }
    }
    
    else if (lowerMessage.includes('button') || lowerMessage.includes('cta') || lowerMessage.includes('call to action')) {
      const newButtonText = extractNewText(userMessage, 'button');
      if (newButtonText) {
        updatedContent.ctaText = newButtonText;
        changesMade = true;
        changeType = 'content';
        aiResponse = `Excellent! I've changed the button text to "${newButtonText}" as you requested.`;
      } else {
        aiResponse = "I'd be happy to change the button text! Please tell me what you'd like the new button to say.";
      }
    }

    // Knowledge Base Commands
    else if (lowerMessage.includes('import knowledge') || lowerMessage.includes('add knowledge') || lowerMessage.includes('upload knowledge')) {
      aiResponse = "To import your ChatGPT knowledge, you can:\n1. Use the 'Import Knowledge' button below\n2. Paste your knowledge data\n3. Upload a JSON file with your ChatGPT conversations\n\nThis will help me understand your preferences and provide better assistance!";
      return { content: aiResponse, showImport: true };
    }
    
    else if (lowerMessage.includes('search knowledge') || lowerMessage.includes('find information') || lowerMessage.includes('what do you know')) {
      const searchTerm = userMessage.replace(/search knowledge|find information|what do you know/gi, '').trim();
      if (searchTerm) {
        const relevantKnowledge = searchKnowledgeBase(searchTerm);
        if (relevantKnowledge.length > 0) {
          aiResponse = `I found ${relevantKnowledge.length} relevant items in my knowledge base:\n\n`;
          relevantKnowledge.slice(0, 3).forEach((item, index) => {
            if (item.type === 'qa') {
              aiResponse += `${index + 1}. Q: ${item.question}\nA: ${item.answer}\n\n`;
            } else {
              aiResponse += `${index + 1}. ${item.topic}: ${item.content.substring(0, 100)}...\n\n`;
            }
          });
        } else {
          aiResponse = `I couldn't find any information about "${searchTerm}" in my knowledge base. Try a different search term or import more knowledge from ChatGPT.`;
        }
      } else {
        const categories = [...new Set(knowledgeBase.map(item => item.category))];
        aiResponse = `I have ${knowledgeBase.length} knowledge items across ${categories.length} categories: ${categories.join(', ')}. You can ask me about any of these topics or search for specific information.`;
      }
    }

    // Section management
    else if (lowerMessage.includes('add section') || lowerMessage.includes('new section') || lowerMessage.includes('create section')) {
      const sectionTitle = extractSectionTitle(userMessage);
      if (sectionTitle) {
        const newSection = {
          title: sectionTitle,
          content: `This is the ${sectionTitle} section.`,
          type: 'text',
          visible: true
        };
        addCustomSection(newSection);
        changesMade = true;
        changeType = 'design';
        aiResponse = `Perfect! I've added a new section titled "${sectionTitle}" to your website as you requested.`;
      } else {
        aiResponse = "I'd be happy to add a new section! Please tell me what you'd like to call the new section.";
      }
    }
    
    else if (lowerMessage.includes('hide') || lowerMessage.includes('remove')) {
      const section = extractSection(userMessage);
      if (section) {
        updatedDesign[`show${section}`] = false;
        changesMade = true;
        changeType = 'design';
        aiResponse = `Great! I've hidden the ${section} section as you requested.`;
      } else {
        aiResponse = "I can hide sections for you. Which section would you like me to hide? (e.g., 'hide features', 'hide products')";
      }
    }
    
    else if (lowerMessage.includes('show') || lowerMessage.includes('display')) {
      const section = extractSection(userMessage);
      if (section) {
        updatedDesign[`show${section}`] = true;
        changesMade = true;
        changeType = 'design';
        aiResponse = `Perfect! I've made the ${section} section visible again as you requested.`;
      } else {
        aiResponse = "I can show sections for you. Which section would you like me to display? (e.g., 'show features', 'show products')";
      }
    }

    // Undo and save commands
    else if (lowerMessage.includes('undo') || lowerMessage.includes('revert') || lowerMessage.includes('go back')) {
      if (contentHistory.length > 0 || designHistory.length > 0) {
        if (contentHistory.length > 0) {
          const previousContent = contentHistory[contentHistory.length - 1];
          updateWebsiteContent(previousContent);
          setContentHistory(prev => prev.slice(0, -1));
        }
        if (designHistory.length > 0) {
          const previousDesign = designHistory[designHistory.length - 1];
          updateDesignSettings(previousDesign);
          setDesignHistory(prev => prev.slice(0, -1));
        }
        changesMade = true;
        aiResponse = "I've reverted the last changes as you requested. Your website is back to its previous state.";
      } else {
        aiResponse = "There are no changes to undo at the moment.";
      }
    }
    
    else if (lowerMessage.includes('save') || lowerMessage.includes('persist') || lowerMessage.includes('keep changes')) {
      try {
        await saveContentToBackend(updatedContent);
        await saveDesignToBackend(updatedDesign);
        aiResponse = "Perfect! I've saved all your changes to the backend. They will persist even after page refresh.";
      } catch (error) {
        aiResponse = "Sorry, I couldn't save the changes to the backend. Please try again later.";
      }
    }
    
    // Preview and reset commands
    else if (lowerMessage.includes('preview') || lowerMessage.includes('show me') || lowerMessage.includes('what does it look like')) {
      aiResponse = "Here's a preview of your current website settings:";
      return {
        content: aiResponse,
        preview: true,
        content: updatedContent,
        design: updatedDesign
      };
    }
    
    else if (lowerMessage.includes('reset') || lowerMessage.includes('default') || lowerMessage.includes('start over')) {
      aiResponse = "I've reset your website to the default design and content as you requested.";
      return { content: aiResponse, reset: true };
    }
    
    // General questions and help
    else if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why') || lowerMessage.includes('explain') || lowerMessage.includes('help')) {
      // Search knowledge base for relevant information
      const relevantKnowledge = searchKnowledgeBase(userMessage);
      if (relevantKnowledge.length > 0) {
        const bestMatch = relevantKnowledge[0];
        if (bestMatch.type === 'qa') {
          aiResponse = `Based on my knowledge: ${bestMatch.answer}`;
        } else {
          aiResponse = `Here's what I know about this: ${bestMatch.content}`;
        }
      } else {
        aiResponse = "I can help you modify your website design and content using natural language, just like ChatGPT! Try saying things like:\n\n• 'I want a modern dark theme with blue accents'\n• 'Make the header more elegant with a golden gradient'\n• 'Apply a minimalist design with lots of white space'\n• 'Change the fonts to serif for elegance'\n• 'Make the text bigger and add more spacing'\n\nYou can also ask me to import your ChatGPT knowledge for more personalized assistance!";
      }
    }
    
    else {
      aiResponse = "I can help you modify your website design and content using natural language, just like ChatGPT! Try saying things like:\n\n• 'I want a modern dark theme with blue accents'\n• 'Make the header more elegant with a golden gradient'\n• 'Apply a minimalist design with lots of white space'\n• 'Change the fonts to serif for elegance'\n• 'Make the text bigger and add more spacing'\n• 'Import my ChatGPT knowledge for better assistance'\n\nJust tell me how you want your website to look, and I'll make it happen!";
    }

    // Update content/design if changes were made
    if (changesMade) {
      if (changeType === 'content') {
        saveToHistory('content', websiteContent);
        updateWebsiteContent(updatedContent);
      } else if (changeType === 'design') {
        saveToHistory('design', designSettings);
        updateDesignSettings(updatedDesign);
      }
    }

    return { content: aiResponse };
  };

  // Helper functions for extracting values
  const extractHeight = (message) => {
    const match = message.match(/(\d+)\s*px/i);
    return match ? `${match[1]}px` : null;
  };

  const extractPosition = (message) => {
    if (message.includes('center')) return 'center';
    if (message.includes('left')) return 'left';
    if (message.includes('right')) return 'right';
    return null;
  };

  const extractColor = (message) => {
    const hexMatch = message.match(/#[0-9a-fA-F]{6}/);
    if (hexMatch) return hexMatch[0];
    
    const colorMatch = message.match(/(?:to|as)\s+([a-zA-Z]+)/i);
    if (colorMatch) {
      const color = colorMatch[1].toLowerCase();
      const colorMap = {
        'golden': '#d4af37',
        'gold': '#ffd700',
        'blue': '#3b82f6',
        'red': '#ef4444',
        'green': '#10b981',
        'purple': '#8b5cf6',
        'pink': '#ec4899',
        'orange': '#f97316'
      };
      return colorMap[color] || null;
    }
    return null;
  };

  const extractGradient = (message) => {
    if (message.includes('golden')) {
      return 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)';
    }
    if (message.includes('blue')) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    if (message.includes('purple')) {
      return 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)';
    }
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  const extractFontSize = (message) => {
    const sizes = {};
    if (message.includes('h1') || message.includes('headline')) {
      const match = message.match(/(\d+)\s*px/i);
      if (match) sizes.h1 = `${match[1]}px`;
    }
    if (message.includes('body') || message.includes('text')) {
      const match = message.match(/(\d+)\s*px/i);
      if (match) sizes.body = `${match[1]}px`;
    }
    return Object.keys(sizes).length > 0 ? sizes : null;
  };

  const extractSectionTitle = (message) => {
    const match = message.match(/(?:titled?|called?)\s+["']?([^"']+)["']?/i);
    return match ? match[1].trim() : null;
  };

  const extractSection = (message) => {
    if (message.includes('header')) return 'Header';
    if (message.includes('hero')) return 'Hero';
    if (message.includes('feature')) return 'Features';
    if (message.includes('product')) return 'Products';
    if (message.includes('newsletter')) return 'Newsletter';
    return null;
  };

  const extractDuration = (message) => {
    const match = message.match(/(\d+(?:\.\d+)?)\s*s/i);
    return match ? `${match[1]}s` : null;
  };

  const extractHoverEffect = (message) => {
    if (message.includes('scale')) return 'scale(1.05)';
    if (message.includes('glow')) return '0 0 20px rgba(255, 255, 255, 0.5)';
    if (message.includes('lift')) return 'translateY(-5px)';
    return 'scale(1.05)';
  };

  // Extract new text from user message
  const extractNewText = (message, type) => {
    const patterns = {
      headline: /(?:change|update)\s+(?:the\s+)?headline\s+(?:to\s+)?["']?([^"']+)["']?/i,
      description: /(?:change|update)\s+(?:the\s+)?description\s+(?:to\s+)?["']?([^"']+)["']?/i,
      button: /(?:change|update)\s+(?:the\s+)?(?:button|cta)\s+(?:text\s+)?(?:to\s+)?["']?([^"']+)["']?/i
    };
    
    const match = message.match(patterns[type]);
    return match ? match[1].trim() : null;
  };

  // Extract image URL from user message
  const extractImageUrl = (message) => {
    const urlPattern = /https?:\/\/[^\s]+/i;
    const match = message.match(urlPattern);
    return match ? match[0] : null;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

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

    // Process AI response
    const aiResponse = await processAICommand(userMessage);
    
    const aiMsg = {
      id: Date.now() + 1,
      type: 'ai',
      content: aiResponse.content,
      timestamp: new Date(),
      preview: aiResponse.preview,
      previewContent: aiResponse.content,
      previewDesign: aiResponse.design,
      reset: aiResponse.reset,
      showImport: aiResponse.showImport
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsProcessing(false);
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

  const handleUndo = () => {
    if (contentHistory.length > 0 || designHistory.length > 0) {
      if (contentHistory.length > 0) {
        const previousContent = contentHistory[contentHistory.length - 1];
        updateWebsiteContent(previousContent);
        setContentHistory(prev => prev.slice(0, -1));
      }
      if (designHistory.length > 0) {
        const previousDesign = designHistory[designHistory.length - 1];
        updateDesignSettings(previousDesign);
        setDesignHistory(prev => prev.slice(0, -1));
      }
      
      const undoMsg = {
        id: Date.now(),
        type: 'ai',
        content: "I've reverted the last changes for you.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, undoMsg]);
    }
  };

  const handleSave = async () => {
    try {
      await saveContentToBackend(websiteContent);
      await saveDesignToBackend(designSettings);
      const saveMsg = {
        id: Date.now(),
        type: 'ai',
        content: "All changes have been saved to the backend successfully!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, saveMsg]);
    } catch (error) {
      const errorMsg = {
        id: Date.now(),
        type: 'ai',
        content: "Sorry, I couldn't save the changes. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleImportKnowledge = () => {
    // Create a file input for importing knowledge
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.txt';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const text = await file.text();
        try {
          const knowledgeData = JSON.parse(text);
          const result = await importChatGPTKnowledge(knowledgeData);
          const importMsg = {
            id: Date.now(),
            type: 'ai',
            content: result.content,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, importMsg]);
        } catch (error) {
          const errorMsg = {
            id: Date.now(),
            type: 'ai',
            content: "Error parsing the file. Please make sure it's a valid JSON format.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMsg]);
        }
      }
    };
    input.click();
  };

  return (
    <div className={`ai-assistant-overlay ${isOpen ? 'open' : ''}`}>
      <div className="ai-assistant-modal">
        <div className="ai-assistant-header">
          <div className="ai-assistant-title">
            <Bot size={20} />
            <span>AI Web Design Assistant</span>
            {knowledgeBase.length > 0 && (
              <div className="knowledge-indicator">
                <Brain size={14} />
                <span>{knowledgeBase.length}</span>
              </div>
            )}
          </div>
          <div className="ai-assistant-actions">
            <button onClick={handleImportKnowledge} title="Import ChatGPT Knowledge">
              <Upload size={16} />
            </button>
            <button onClick={handleUndo} disabled={contentHistory.length === 0 && designHistory.length === 0} title="Undo Last Change">
              <Undo size={16} />
            </button>
            <button onClick={handleSave} title="Save Changes">
              <Save size={16} />
            </button>
            <button onClick={onClose} className="ai-assistant-close">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="ai-assistant-messages">
          {messages.map((message) => (
            <div key={message.id} className={`ai-message ${message.type}`}>
              <div className="ai-message-content">
                <div className="ai-message-text">{message.content}</div>
                {message.preview && (
                  <div className="content-preview">
                    <h4>Current Website Settings:</h4>
                    <div className="preview-section">
                      <h5>Content:</h5>
                      <div className="preview-item">
                        <strong>Headline:</strong> {websiteContent.headline}
                      </div>
                      <div className="preview-item">
                        <strong>Description:</strong> {websiteContent.description}
                      </div>
                      <div className="preview-item">
                        <strong>Button Text:</strong> {websiteContent.ctaText}
                      </div>
                    </div>
                    <div className="preview-section">
                      <h5>Design:</h5>
                      <div className="preview-item">
                        <strong>Header Height:</strong> {designSettings.headerHeight}
                      </div>
                      <div className="preview-item">
                        <strong>Primary Color:</strong> {designSettings.primaryColor}
                      </div>
                      <div className="preview-item">
                        <strong>Font Family:</strong> {designSettings.headingFont}
                      </div>
                    </div>
                  </div>
                )}
                {message.showImport && (
                  <div className="import-section">
                    <h4>Import ChatGPT Knowledge</h4>
                    <p>You can import your ChatGPT knowledge in several ways:</p>
                    <div className="import-options">
                      <button onClick={handleImportKnowledge} className="import-btn">
                        <Upload size={16} />
                        Upload JSON File
                      </button>
                      <button className="import-btn">
                        <Download size={16} />
                        Paste Knowledge
                      </button>
                    </div>
                  </div>
                )}
                <div className="ai-message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="ai-message ai">
              <div className="ai-message-content">
                <div className="ai-typing">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>Processing your design request...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-assistant-input">
          <div className="input-container">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Just tell me how you want your website to look... (e.g., 'I want a modern dark theme', 'make the header more elegant', 'apply a minimalist design')"
              disabled={isProcessing}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className="send-button"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="ai-assistant-suggestions">
            <span>Quick design requests:</span>
            <div className="suggestion-chips">
              <button onClick={() => setInputValue("I want a modern dark theme with blue accents")}>
                <Sparkles size={12} />
                Dark Theme
              </button>
              <button onClick={() => setInputValue("Make the header more elegant with a golden gradient")}>
                <Palette size={12} />
                Elegant
              </button>
              <button onClick={() => setInputValue("Apply a minimalist design with lots of white space")}>
                <Layout size={12} />
                Minimalist
              </button>
              <button onClick={() => setInputValue("Change fonts to serif for elegance")}>
                <Type size={12} />
                Serif Fonts
              </button>
              <button onClick={() => setInputValue("Make the text bigger and add more spacing")}>
                <Eye size={12} />
                Bigger Text
              </button>
              <button onClick={() => setInputValue("Import my ChatGPT knowledge for better assistance")}>
                <Brain size={12} />
                Import Knowledge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWebsiteAssistant; 