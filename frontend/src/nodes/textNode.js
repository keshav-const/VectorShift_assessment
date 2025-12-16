// textNode.js
// Text node with dynamic variable detection and auto-resize

import { useState, useMemo, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Type } from 'lucide-react';
import { useStore } from '../store';
import '../styles/nodes.css';

/**
 * Extracts valid JavaScript variable names from text wrapped in {{ }}
 * Valid JS variable: starts with letter, _, or $, followed by letters, numbers, _, or $
 */
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const matches = [...text.matchAll(regex)];
  const variables = [...new Set(matches.map(m => m[1]))];
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variables from the text
  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Calculate dynamic height based on content
  const [dimensions, setDimensions] = useState({ width: 220, height: 'auto' });

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to get accurate scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;

      // Calculate width based on longest line
      const lines = currText.split('\n');
      const maxLength = Math.max(...lines.map(line => line.length));
      const width = Math.max(220, Math.min(400, maxLength * 7 + 40));

      setDimensions({ width, height: 'auto' });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  // Calculate handle positions for even spacing
  const getHandleStyle = (index, total) => {
    if (total === 1) return { top: '50%' };
    const percentage = ((index + 1) / (total + 1)) * 100;
    return { top: `${percentage}%` };
  };

  return (
    <div
      className="base-node text-node"
      style={{ minWidth: dimensions.width }}
    >
      {/* Dynamic Input Handles for Variables */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="node-handle input-handle"
          style={getHandleStyle(index, variables.length)}
        />
      ))}

      {/* Node Header */}
      <div className="node-header">
        <span className="node-icon"><Type size={14} /></span>
        <span className="node-title">Text</span>
        {variables.length > 0 && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '10px',
            color: 'var(--text-muted)',
            background: 'var(--primary-bg)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            {variables.length} var{variables.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Node Content */}
      <div className="node-content">
        <div className="node-field">
          <label>Text Content</label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            placeholder="Use {{variable}} for inputs"
            style={{ minHeight: '50px' }}
          />
        </div>

        {/* Variable Indicators */}
        {variables.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginTop: '4px'
          }}>
            {variables.map(variable => (
              <span key={variable} style={{
                fontSize: '10px',
                background: 'var(--primary-bg)',
                color: 'var(--primary-light)',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid var(--primary)'
              }}>
                {variable}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="node-handle output-handle"
        style={{ top: '50%' }}
      />

      {/* Handle Labels */}
      {variables.length > 0 && (
        <div className="handle-labels left">
          {variables.map((variable, index) => (
            <span
              key={variable}
              className="handle-label"
              style={getHandleStyle(index, variables.length)}
            >
              {variable}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
