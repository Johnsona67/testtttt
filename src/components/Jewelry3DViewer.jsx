import { useState, useEffect, useRef } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Download } from 'lucide-react';

const Jewelry3DViewer = ({ design, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentView, setCurrentView] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Generate jewelry based on design description
  const generateJewelryModel = (description) => {
    const lowerDesc = description.toLowerCase();
    
    // Determine jewelry type and materials
    let type = 'ring';
    let material = 'gold';
    let gemstone = 'diamond';
    let style = 'classic';
    
    if (lowerDesc.includes('necklace') || lowerDesc.includes('chain')) {
      type = 'necklace';
    } else if (lowerDesc.includes('earring') || lowerDesc.includes('stud')) {
      type = 'earring';
    } else if (lowerDesc.includes('bracelet') || lowerDesc.includes('bangle')) {
      type = 'bracelet';
    }
    
    if (lowerDesc.includes('silver')) {
      material = 'silver';
    } else if (lowerDesc.includes('platinum')) {
      material = 'platinum';
    } else if (lowerDesc.includes('rose gold')) {
      material = 'rose-gold';
    }
    
    if (lowerDesc.includes('sapphire')) {
      gemstone = 'sapphire';
    } else if (lowerDesc.includes('emerald')) {
      gemstone = 'emerald';
    } else if (lowerDesc.includes('ruby')) {
      gemstone = 'ruby';
    } else if (lowerDesc.includes('pearl')) {
      gemstone = 'pearl';
    }
    
    if (lowerDesc.includes('modern') || lowerDesc.includes('contemporary')) {
      style = 'modern';
    } else if (lowerDesc.includes('vintage') || lowerDesc.includes('antique')) {
      style = 'vintage';
    }
    
    return { type, material, gemstone, style };
  };

  const jewelryModel = generateJewelryModel(design);

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating) {
      const animate = () => {
        setRotation(prev => (prev + 1) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoRotating]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up gradient background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save context for transformations
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(zoom, zoom);
    ctx.rotate((rotation * Math.PI) / 180);
    
    // Draw jewelry based on type
    drawJewelry(ctx, jewelryModel);
    
    ctx.restore();
  }, [rotation, zoom, jewelryModel]);

  const drawJewelry = (ctx, model) => {
    const { type, material, gemstone, style } = model;
    
    // Set material colors
    const materialColors = {
      gold: '#d4af37',
      silver: '#c0c0c0',
      platinum: '#e5e4e2',
      'rose-gold': '#b76e79'
    };
    
    const gemstoneColors = {
      diamond: '#ffffff',
      sapphire: '#0f52ba',
      emerald: '#50c878',
      ruby: '#e0115f',
      pearl: '#f0e6e6'
    };
    
    ctx.fillStyle = materialColors[material] || materialColors.gold;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    switch (type) {
      case 'ring':
        drawRing(ctx, gemstoneColors[gemstone] || gemstoneColors.diamond, style);
        break;
      case 'necklace':
        drawNecklace(ctx, gemstoneColors[gemstone] || gemstoneColors.diamond, style);
        break;
      case 'earring':
        drawEarring(ctx, gemstoneColors[gemstone] || gemstoneColors.diamond, style);
        break;
      case 'bracelet':
        drawBracelet(ctx, gemstoneColors[gemstone] || gemstoneColors.diamond, style);
        break;
      default:
        drawRing(ctx, gemstoneColors[gemstone] || gemstoneColors.diamond, style);
    }
  };

  const drawRing = (ctx, gemstoneColor, style) => {
    // Ring band
    ctx.beginPath();
    ctx.ellipse(0, 0, 60, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Gemstone setting
    ctx.fillStyle = gemstoneColor;
    ctx.beginPath();
    ctx.ellipse(0, -15, 25, 25, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Add sparkle effect
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-8, -20, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(8, -25, 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawNecklace = (ctx, gemstoneColor, style) => {
    // Chain
    ctx.beginPath();
    ctx.ellipse(0, 0, 80, 40, 0, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Pendant
    ctx.fillStyle = gemstoneColor;
    ctx.beginPath();
    ctx.ellipse(0, 20, 20, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Chain links
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const x = Math.cos(angle) * 60;
      const y = Math.sin(angle) * 30;
      ctx.beginPath();
      ctx.ellipse(x, y, 8, 4, angle, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const drawEarring = (ctx, gemstoneColor, style) => {
    // Earring hook
    ctx.beginPath();
    ctx.arc(0, -30, 15, 0, Math.PI, true);
    ctx.stroke();
    
    // Main gemstone
    ctx.fillStyle = gemstoneColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 25, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Decorative elements
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-5, -5, 3, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawBracelet = (ctx, gemstoneColor, style) => {
    // Bracelet band
    ctx.beginPath();
    ctx.ellipse(0, 0, 70, 25, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Gemstones along the band
    ctx.fillStyle = gemstoneColor;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * 50;
      const y = Math.sin(angle) * 20;
      ctx.beginPath();
      ctx.ellipse(x, y, 8, 8, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(1);
    setIsAutoRotating(true);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `jewelry-${jewelryModel.type}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const views = [
    { name: 'Front', rotation: 0 },
    { name: 'Side', rotation: 90 },
    { name: 'Back', rotation: 180 },
    { name: 'Top', rotation: 45 }
  ];

  return (
    <div className="jewelry-3d-viewer">
      <div className="viewer-header">
        <h3>360° Jewelry Preview</h3>
        <button onClick={onClose} className="close-btn">
          ×
        </button>
      </div>
      
      <div className="viewer-content">
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="jewelry-canvas"
          />
          
          <div className="viewer-controls">
            <button onClick={handleZoomIn} title="Zoom In">
              <ZoomIn size={20} />
            </button>
            <button onClick={handleZoomOut} title="Zoom Out">
              <ZoomOut size={20} />
            </button>
            <button 
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={isAutoRotating ? 'active' : ''}
              title="Auto Rotate"
            >
              <RotateCcw size={20} />
            </button>
            <button onClick={handleReset} title="Reset View">
              Reset
            </button>
            <button onClick={handleDownload} title="Download">
              <Download size={20} />
            </button>
          </div>
        </div>
        
        <div className="viewer-info">
          <div className="jewelry-details">
            <h4>Your Custom Design</h4>
            <div className="detail-item">
              <strong>Type:</strong> {jewelryModel.type.charAt(0).toUpperCase() + jewelryModel.type.slice(1)}
            </div>
            <div className="detail-item">
              <strong>Material:</strong> {jewelryModel.material.charAt(0).toUpperCase() + jewelryModel.material.slice(1)}
            </div>
            <div className="detail-item">
              <strong>Gemstone:</strong> {jewelryModel.gemstone.charAt(0).toUpperCase() + jewelryModel.gemstone.slice(1)}
            </div>
            <div className="detail-item">
              <strong>Style:</strong> {jewelryModel.style.charAt(0).toUpperCase() + jewelryModel.style.slice(1)}
            </div>
          </div>
          
          <div className="quick-views">
            <h4>Quick Views</h4>
            <div className="view-buttons">
              {views.map((view, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setRotation(view.rotation);
                    setIsAutoRotating(false);
                  }}
                  className={currentView === index ? 'active' : ''}
                >
                  {view.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jewelry3DViewer; 