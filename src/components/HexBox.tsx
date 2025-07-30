// src/components/HexBox.tsx
import React from 'react';

interface HexBoxProps {
  title: string;
  number: number;
  ariaId: string;
}

const HexBox: React.FC<HexBoxProps> = ({ title, number, ariaId }) => {
  // Styles direkt hier, clean & modern
  const hexBoxStyle: React.CSSProperties = {
    flex: '0 0 260px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem',
  };

  const hexShapeStyle: React.CSSProperties = {
    width: '100%',
    paddingTop: '86.6%', // height proportional to width for hexagon
    position: 'relative',
    backgroundColor: '#AA0000', // Catan Red
    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    border: '3px solid #D4AF37', // gold border
    borderRadius: 6,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  };

  const hexShapeHoverStyle: React.CSSProperties = {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
  };

  const hexContentStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#D4AF37', // gold text
    textAlign: 'center',
    padding: '1rem',
    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    userSelect: 'none',
  };

  const hexTitleStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  };

  const hexNumberStyle: React.CSSProperties = {
    fontSize: '2.4rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
  };

  // State to handle hover for smooth inline style changes
  const [hover, setHover] = React.useState(false);

  return (
    <div style={hexBoxStyle} aria-describedby={ariaId}>
      <div
        style={{ ...hexShapeStyle, ...(hover ? hexShapeHoverStyle : {}) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={hexContentStyle}>
          <div id={ariaId} style={hexTitleStyle}>{title}</div>
          <div style={hexNumberStyle}>{number}</div>
        </div>
      </div>
    </div>
  );
};

export default HexBox;
