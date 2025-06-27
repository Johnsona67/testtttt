# Jewelry Shop Website with AI Assistant

A modern, responsive jewelry e-commerce website built with React, featuring an AI-powered website assistant that can dynamically modify content in real-time and integrate ChatGPT knowledge.

## 🚀 Features

### Core E-commerce Features
- **Responsive Design**: Modern, elegant UI that works on all devices
- **Product Catalog**: Browse jewelry by categories (rings, necklaces, earrings, bracelets)
- **Shopping Cart**: Add, remove, and manage items with real-time updates
- **Product Details**: Detailed product pages with images and descriptions
- **Navigation**: Smooth routing between pages

### AI-Powered Features
- **AI Designer Chat**: Generate custom jewelry designs with AI assistance
- **3D Jewelry Viewer**: Interactive 3D visualization of generated designs
- **AI Website Assistant**: Real-time content modification through natural language commands
- **ChatGPT Knowledge Integration**: Import and use your ChatGPT knowledge base

## 🤖 AI Website Assistant with ChatGPT Integration

The AI Website Assistant allows you to modify website content using natural language commands AND integrates with your ChatGPT knowledge base for intelligent responses.

### ChatGPT Knowledge Integration

#### Import Your ChatGPT Knowledge
You can import your ChatGPT conversations and knowledge in several ways:

1. **Upload JSON File**: Use the upload button to import a structured JSON file
2. **Paste Knowledge**: Directly paste your knowledge data
3. **Sample Template**: Use the provided `sample-knowledge.json` as a template

#### Supported Knowledge Formats
```json
{
  "questions": [
    {
      "question": "What are the best practices for responsive web design?",
      "answer": "Responsive web design best practices include...",
      "category": "web-design",
      "tags": ["responsive", "css", "mobile"]
    }
  ],
  "topics": [
    {
      "title": "Color Theory in Web Design",
      "content": "Color theory is fundamental to web design...",
      "category": "design",
      "tags": ["color", "theory", "design"]
    }
  ]
}
```

#### Knowledge Base Features
- **Smart Search**: Search through your imported knowledge
- **Category Organization**: Knowledge is organized by categories
- **Tag-based Filtering**: Find information using tags
- **Persistent Storage**: Knowledge is saved locally and to backend
- **Real-time Access**: Use knowledge for intelligent responses

### Supported Commands

#### Content Modification
- `"change headline to Welcome to MERGE"`
- `"update description to something new"`
- `"change button text to Get Started"`
- `"change image to https://example.com/new-image.jpg"`

#### Design Changes
- `"make the header 80px tall and center the logo"`
- `"set the background to a golden gradient"`
- `"change all text to a futuristic serif font"`
- `"add a new section titled Merge Stars"`
- `"hide the features section"`

#### Knowledge Commands
- `"import knowledge from ChatGPT"`
- `"search knowledge about web design"`
- `"what do you know about responsive design?"`
- `"explain color theory"`

#### Content Management
- `"show me current content"` - Preview all current content
- `"undo"` - Revert the last change
- `"save"` - Persist changes to backend

### How It Works

1. **Real-time Updates**: Changes are applied immediately to the website
2. **Content History**: Track and revert changes with undo functionality
3. **Backend Persistence**: Save changes to persist across page refreshes
4. **Natural Language Processing**: Understands various command formats
5. **Knowledge Integration**: Uses your ChatGPT knowledge for intelligent responses

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with animations

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **File System** - JSON-based data persistence

### AI Features
- **React Context** - State management for website content
- **Canvas API** - 3D jewelry visualization
- **Natural Language Processing** - Command interpretation
- **Knowledge Base System** - ChatGPT knowledge integration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jewelry-shop
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development servers**
   ```bash
   npm run dev:full
   ```

   This starts both:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🎯 Usage

### Starting the Application

```bash
# Start both frontend and backend
npm run dev:full

# Start only frontend
npm run dev

# Start only backend
npm run server
```

### Using the AI Website Assistant

1. **Open the Assistant**: Click the "Website AI" floating button
2. **Import Knowledge**: Use the upload button to import your ChatGPT knowledge
3. **Make Changes**: Type commands like "make the header 80px tall"
4. **Ask Questions**: Ask about web design, programming, or any topic in your knowledge base
5. **Preview Changes**: Use "show me current content" to see all content
6. **Save Changes**: Click the save button or type "save" to persist changes
7. **Undo Changes**: Use the undo button or type "undo" to revert

### Importing ChatGPT Knowledge

1. **Prepare Your Data**: Format your ChatGPT conversations as JSON
2. **Use the Template**: Start with `sample-knowledge.json` as a template
3. **Upload File**: Click the upload button in the AI assistant
4. **Verify Import**: Check the knowledge indicator shows your item count
5. **Start Using**: Ask questions that match your imported knowledge

### Example Commands

```bash
# Design Changes
"make the header 80px tall and center the logo"
"set the background to a golden gradient"
"change all text to a futuristic serif font"
"add a new section titled Merge Stars"

# Content Changes
"change headline to Welcome to MERGE"
"update description to Discover our exclusive collection"
"change button text to Shop Now"

# Knowledge Commands
"import knowledge from ChatGPT"
"search knowledge about web design"
"what are the best practices for responsive design?"
"explain color theory in web design"

# Management
"show me current content"
"save"
"undo"
```

## 📁 Project Structure

```
jewelry-shop/
├── src/
│   ├── components/
│   │   ├── AIWebsiteAssistant.jsx    # AI website assistant with knowledge integration
│   │   ├── AIChat.jsx                # AI jewelry designer
│   │   ├── Jewelry3DViewer.jsx       # 3D jewelry viewer
│   │   ├── Navbar.jsx                # Navigation component
│   │   ├── Footer.jsx                # Footer component
│   │   └── Cart.jsx                  # Shopping cart
│   ├── pages/
│   │   ├── Home.jsx                  # Homepage with dynamic content
│   │   ├── Shop.jsx                  # Product catalog
│   │   ├── ProductDetail.jsx         # Individual product page
│   │   ├── Cart.jsx                  # Cart page
│   │   ├── About.jsx                 # About page
│   │   └── Contact.jsx               # Contact page
│   ├── context/
│   │   └── WebsiteContentContext.jsx # Content and design state management
│   ├── data/
│   │   └── products.js               # Product database
│   └── App.jsx                       # Main app component
├── server.js                         # Backend API server
├── sample-knowledge.json             # Template for ChatGPT knowledge import
├── data/                             # Backend data storage
│   ├── website-content.json          # Saved website content
│   ├── design-settings.json          # Saved design settings
│   └── knowledge-base.json           # Saved knowledge base
└── package.json                      # Dependencies and scripts
```

## 🔧 API Endpoints

### Backend API (Port 3001)

#### Content Management
- `GET /api/get-content` - Retrieve current website content
- `POST /api/save-content` - Save website content changes

#### Design Management
- `GET /api/get-design` - Retrieve current design settings
- `POST /api/save-design` - Save design settings changes

#### Knowledge Base
- `GET /api/get-knowledge` - Retrieve knowledge base
- `POST /api/save-knowledge` - Save knowledge base
- `POST /api/add-knowledge` - Add new knowledge items
- `DELETE /api/clear-knowledge` - Clear all knowledge

#### Health Check
- `GET /api/health` - Health check endpoint

### Example API Usage

```javascript
// Get current content
const response = await fetch('/api/get-content');
const content = await response.json();

// Save content changes
const saveResponse = await fetch('/api/save-content', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    headline: "New Headline",
    description: "New Description",
    ctaText: "New Button Text",
    heroImage: "https://example.com/image.jpg"
  })
});

// Import knowledge
const knowledgeResponse = await fetch('/api/save-knowledge', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(knowledgeData)
});
```

## 🎨 Customization

### Adding New Editable Content

1. **Update the Context**: Add new fields to `WebsiteContentContext.jsx`
2. **Update the Home Page**: Use the new content fields in `Home.jsx`
3. **Update the AI Assistant**: Add command processing in `AIWebsiteAssistant.jsx`

### Extending Knowledge Base

1. **Add New Categories**: Create new knowledge categories
2. **Custom Tags**: Add relevant tags for better search
3. **Structured Data**: Use the provided JSON format
4. **Import Process**: Follow the import workflow

### Styling

- Main styles: `src/App.css`
- AI Assistant styles: Included in `App.css`
- Knowledge integration styles: Included in `App.css`
- Responsive design: Mobile-first approach

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
```bash
npm start
# Deploy server.js to your Node.js hosting service
```

### Knowledge Base Migration
- Export your knowledge base: `GET /api/get-knowledge`
- Import to new environment: `POST /api/save-knowledge`
- Backup data files in the `data/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions about the AI Website Assistant:
- Check the example commands above
- Review the API documentation
- Use the sample knowledge template
- Open an issue on GitHub

---

**Built with ❤️ using React, Node.js, and AI-powered features with ChatGPT knowledge integration**
