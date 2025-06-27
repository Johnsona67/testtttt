import { createContext, useContext, useState, useEffect } from 'react';

const WebsiteContentContext = createContext();

export const useWebsiteContent = () => {
  const context = useContext(WebsiteContentContext);
  if (!context) {
    throw new Error('useWebsiteContent must be used within a WebsiteContentProvider');
  }
  return context;
};

export const WebsiteContentProvider = ({ children }) => {
  const [websiteContent, setWebsiteContent] = useState({
    headline: "Timeless Elegance Meets Modern Luxury",
    description: "Discover our curated collection of fine jewelry, crafted with precision and designed to celebrate life's most precious moments.",
    ctaText: "Shop Collection",
    heroImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop"
  });

  const [designSettings, setDesignSettings] = useState({
    // Layout
    headerHeight: '80px',
    headerLogoPosition: 'center',
    heroSectionHeight: '600px',
    sectionSpacing: '80px',
    
    // Colors
    primaryColor: '#d4af37',
    secondaryColor: '#764ba2',
    backgroundColor: '#ffffff',
    textColor: '#374151',
    accentColor: '#667eea',
    
    // Typography
    headingFont: 'serif',
    bodyFont: 'sans-serif',
    fontSize: {
      h1: '3rem',
      h2: '2.5rem',
      h3: '2rem',
      body: '1rem'
    },
    
    // Spacing
    containerPadding: '20px',
    elementMargin: '16px',
    elementPadding: '12px',
    
    // Borders & Shadows
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: '#e5e7eb',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    
    // Animations
    transitionDuration: '0.3s',
    hoverEffect: 'scale(1.05)',
    
    // Visibility
    showHeader: true,
    showHero: true,
    showFeatures: true,
    showProducts: true,
    showNewsletter: true,
    
    // Background
    backgroundType: 'solid', // solid, gradient, image, video
    backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundImage: '',
    backgroundVideo: '',
    
    // Custom sections
    customSections: []
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load content from backend on component mount
  useEffect(() => {
    loadContentFromBackend();
    loadDesignFromBackend();
  }, []);

  const loadContentFromBackend = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/get-content');
      if (response.ok) {
        const savedContent = await response.json();
        setWebsiteContent(savedContent);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Keep default content if loading fails
    } finally {
      setIsLoading(false);
    }
  };

  const loadDesignFromBackend = async () => {
    try {
      const response = await fetch('/api/get-design');
      if (response.ok) {
        const savedDesign = await response.json();
        setDesignSettings(savedDesign);
      }
    } catch (error) {
      console.error('Error loading design:', error);
      // Keep default design if loading fails
    }
  };

  const updateWebsiteContent = (newContent) => {
    setWebsiteContent(newContent);
  };

  const updateDesignSettings = (newSettings) => {
    setDesignSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addCustomSection = (section) => {
    setDesignSettings(prev => ({
      ...prev,
      customSections: [...prev.customSections, { ...section, id: Date.now() }]
    }));
  };

  const removeCustomSection = (sectionId) => {
    setDesignSettings(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.id !== sectionId)
    }));
  };

  const updateCustomSection = (sectionId, updates) => {
    setDesignSettings(prev => ({
      ...prev,
      customSections: prev.customSections.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const saveContentToBackend = async (content) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save content');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const saveDesignToBackend = async (design) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/save-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(design)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save design');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving design:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    setWebsiteContent({
      headline: "Timeless Elegance Meets Modern Luxury",
      description: "Discover our curated collection of fine jewelry, crafted with precision and designed to celebrate life's most precious moments.",
      ctaText: "Shop Collection",
      heroImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop"
    });
    
    setDesignSettings({
      headerHeight: '80px',
      headerLogoPosition: 'center',
      heroSectionHeight: '600px',
      sectionSpacing: '80px',
      primaryColor: '#d4af37',
      secondaryColor: '#764ba2',
      backgroundColor: '#ffffff',
      textColor: '#374151',
      accentColor: '#667eea',
      headingFont: 'serif',
      bodyFont: 'sans-serif',
      fontSize: {
        h1: '3rem',
        h2: '2.5rem',
        h3: '2rem',
        body: '1rem'
      },
      containerPadding: '20px',
      elementMargin: '16px',
      elementPadding: '12px',
      borderRadius: '8px',
      borderWidth: '1px',
      borderColor: '#e5e7eb',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transitionDuration: '0.3s',
      hoverEffect: 'scale(1.05)',
      showHeader: true,
      showHero: true,
      showFeatures: true,
      showProducts: true,
      showNewsletter: true,
      backgroundType: 'solid',
      backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundImage: '',
      backgroundVideo: '',
      customSections: []
    });
  };

  const value = {
    websiteContent,
    designSettings,
    updateWebsiteContent,
    updateDesignSettings,
    addCustomSection,
    removeCustomSection,
    updateCustomSection,
    saveContentToBackend,
    saveDesignToBackend,
    loadContentFromBackend,
    resetToDefaults,
    isLoading
  };

  return (
    <WebsiteContentContext.Provider value={value}>
      {children}
    </WebsiteContentContext.Provider>
  );
}; 