import { useState, useRef } from 'react';
import wsi from "../../public/images/whole-slide-image.jpg.png";

function CenterPanel() {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 1));

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    const container = containerRef.current;
    const image = container.querySelector('img');
    
    if (container && image) {
      const containerRect = container.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      const maxX = Math.max(0, (imageRect.width - containerRect.width) / 2);
      const maxY = Math.max(0, (imageRect.height - containerRect.height) / 2);

      const clampedX = Math.min(Math.max(newX, -maxX), maxX);
      const clampedY = Math.min(Math.max(newY, -maxY), maxY);

      setPosition({
        x: clampedX,
        y: clampedY
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <div className="center-panel-container">
      <div className="header-section">
        <h2 className="panel-title">WSI Zoomed IN View</h2>
        <div className="zoom-controls">
          <button 
            className="control-button"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
          >
            <span className="button-icon">－</span>
            Zoom Out
          </button>
          
          <div className="zoom-display">
            {(zoom * 100).toFixed(0)}%
          </div>
          
          <button 
            className="control-button"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
          >
            <span className="button-icon">＋</span>
            Zoom In
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="image-viewport"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={wsi}
          alt="WSI"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.1s',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
      </div>

      <style jsx>{`
        .center-panel-container {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                      0 2px 4px -1px rgba(0, 0, 0, 0.06);
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0 0.5rem;
        }

        .panel-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .zoom-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: #f3f4f6;
          border-radius: 8px;
        }

        .image-viewport {
          position: relative;
          height: 500px;
          overflow: hidden;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
          background: #f9fafb;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        }

        .control-button {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.75rem;
          border: none;
          border-radius: 6px;
          background: white;
          color: #374151;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .control-button:hover:not(:disabled) {
          background: #f9fafb;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        }

        .control-button:active:not(:disabled) {
          transform: translateY(0);
          background: #f3f4f6;
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #e5e7eb;
        }

        .button-icon {
          font-size: 1rem;
          font-weight: bold;
          color: #6b7280;
        }

        .zoom-display {
          padding: 0.5rem 0.75rem;
          background: white;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          min-width: 4rem;
          text-align: center;
          box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 640px) {
          .header-section {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .zoom-controls {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default CenterPanel;