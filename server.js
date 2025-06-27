import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const dataFilePath = path.join(__dirname, 'data', 'website-content.json');
const designFilePath = path.join(__dirname, 'data', 'design-settings.json');
const knowledgeFilePath = path.join(__dirname, 'data', 'knowledge-base.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(dataFilePath);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Default content
const defaultContent = {
  headline: "Timeless Elegance Meets Modern Luxury",
  description: "Discover our curated collection of fine jewelry, crafted with precision and designed to celebrate life's most precious moments.",
  ctaText: "Shop Collection",
  heroImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop"
};

// Default design settings
const defaultDesign = {
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
};

// Load content from file
async function loadContent() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return default content
    console.log('No saved content found, using defaults');
    return defaultContent;
  }
}

// Save content to file
async function saveContent(content) {
  try {
    await ensureDataDirectory();
    await fs.writeFile(dataFilePath, JSON.stringify(content, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
}

// Load design settings from file
async function loadDesign() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(designFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return default design
    console.log('No saved design found, using defaults');
    return defaultDesign;
  }
}

// Save design settings to file
async function saveDesign(design) {
  try {
    await ensureDataDirectory();
    await fs.writeFile(designFilePath, JSON.stringify(design, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving design:', error);
    return false;
  }
}

// Load knowledge base from file
async function loadKnowledge() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(knowledgeFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    console.log('No saved knowledge found, starting with empty knowledge base');
    return [];
  }
}

// Save knowledge base to file
async function saveKnowledge(knowledge) {
  try {
    await ensureDataDirectory();
    await fs.writeFile(knowledgeFilePath, JSON.stringify(knowledge, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving knowledge:', error);
    return false;
  }
}

// API Routes

// GET /api/get-content - Get current website content
app.get('/api/get-content', async (req, res) => {
  try {
    const content = await loadContent();
    res.json(content);
  } catch (error) {
    console.error('Error loading content:', error);
    res.status(500).json({ error: 'Failed to load content' });
  }
});

// POST /api/save-content - Save website content
app.post('/api/save-content', async (req, res) => {
  try {
    const content = req.body;
    
    // Validate content structure
    if (!content.headline || !content.description || !content.ctaText || !content.heroImage) {
      return res.status(400).json({ error: 'Invalid content structure' });
    }
    
    const success = await saveContent(content);
    
    if (success) {
      res.json({ 
        message: 'Content saved successfully',
        content: content,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({ error: 'Failed to save content' });
    }
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/health - Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Website Content API is running'
  });
});

// POST /api/save-design - Save design settings
app.post('/api/save-design', async (req, res) => {
  try {
    const design = req.body;
    
    // Validate design structure
    if (!design.headerHeight || !design.primaryColor || !design.headingFont) {
      return res.status(400).json({ error: 'Invalid design structure' });
    }
    
    const success = await saveDesign(design);
    
    if (success) {
      res.json({ 
        message: 'Design saved successfully',
        design: design,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({ error: 'Failed to save design' });
    }
  } catch (error) {
    console.error('Error saving design:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/get-design - Get current design settings
app.get('/api/get-design', async (req, res) => {
  try {
    const design = await loadDesign();
    res.json(design);
  } catch (error) {
    console.error('Error loading design:', error);
    res.status(500).json({ error: 'Failed to load design' });
  }
});

// POST /api/save-knowledge - Save knowledge base
app.post('/api/save-knowledge', async (req, res) => {
  try {
    const knowledge = req.body;
    
    // Validate knowledge structure
    if (!Array.isArray(knowledge)) {
      return res.status(400).json({ error: 'Knowledge must be an array' });
    }
    
    const success = await saveKnowledge(knowledge);
    
    if (success) {
      res.json({ 
        message: 'Knowledge saved successfully',
        count: knowledge.length,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({ error: 'Failed to save knowledge' });
    }
  } catch (error) {
    console.error('Error saving knowledge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/get-knowledge - Get current knowledge base
app.get('/api/get-knowledge', async (req, res) => {
  try {
    const knowledge = await loadKnowledge();
    res.json(knowledge);
  } catch (error) {
    console.error('Error loading knowledge:', error);
    res.status(500).json({ error: 'Failed to load knowledge' });
  }
});

// POST /api/add-knowledge - Add new knowledge items
app.post('/api/add-knowledge', async (req, res) => {
  try {
    const newKnowledge = req.body;
    const existingKnowledge = await loadKnowledge();
    
    // Add new knowledge items
    const updatedKnowledge = [...existingKnowledge, ...newKnowledge];
    
    const success = await saveKnowledge(updatedKnowledge);
    
    if (success) {
      res.json({ 
        message: 'Knowledge added successfully',
        added: newKnowledge.length,
        total: updatedKnowledge.length,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({ error: 'Failed to add knowledge' });
    }
  } catch (error) {
    console.error('Error adding knowledge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/clear-knowledge - Clear all knowledge
app.delete('/api/clear-knowledge', async (req, res) => {
  try {
    const success = await saveKnowledge([]);
    
    if (success) {
      res.json({ 
        message: 'Knowledge base cleared successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({ error: 'Failed to clear knowledge' });
    }
  } catch (error) {
    console.error('Error clearing knowledge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Website Content API server running on port ${PORT}`);
  console.log(`📁 Data will be saved to: ${dataFilePath}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

export default app; 