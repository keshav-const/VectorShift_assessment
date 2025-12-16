// BaseNode.js
// Reusable node component that provides consistent structure and styling for all nodes

import { Handle, Position } from 'reactflow';
import '../styles/nodes.css';

/**
 * BaseNode - A reusable wrapper component for all pipeline nodes
 * 
 * @param {string} id - Unique node identifier
 * @param {string} title - Display title for the node header
 * @param {React.ReactNode} icon - Icon component (from lucide-react)
 * @param {string} type - Node type for styling purposes
 * @param {Array} inputs - Array of input handle configs: [{id, label, style}]
 * @param {Array} outputs - Array of output handle configs: [{id, label, style}]
 * @param {React.ReactNode} children - Custom content for the node body
 * @param {Object} style - Optional style overrides for the node container
 */
export const BaseNode = ({
    id,
    title,
    icon,
    type = 'default',
    inputs = [],
    outputs = [],
    children,
    style = {},
    selected = false
}) => {
    // Calculate handle positions to space them evenly
    const getHandleStyle = (index, total) => {
        if (total === 1) return { top: '50%' };
        const percentage = ((index + 1) / (total + 1)) * 100;
        return { top: `${percentage}%` };
    };

    return (
        <div
            className={`base-node ${type}-node ${selected ? 'selected' : ''}`}
            style={style}
        >
            {/* Input Handles */}
            {inputs.map((input, index) => (
                <Handle
                    key={input.id}
                    type="target"
                    position={Position.Left}
                    id={input.id}
                    className="node-handle input-handle"
                    style={input.style || getHandleStyle(index, inputs.length)}
                />
            ))}

            {/* Node Header */}
            <div className="node-header">
                <span className="node-icon">{icon}</span>
                <span className="node-title">{title}</span>
            </div>

            {/* Node Content */}
            <div className="node-content">
                {children}
            </div>

            {/* Output Handles */}
            {outputs.map((output, index) => (
                <Handle
                    key={output.id}
                    type="source"
                    position={Position.Right}
                    id={output.id}
                    className="node-handle output-handle"
                    style={output.style || getHandleStyle(index, outputs.length)}
                />
            ))}

            {/* Handle Labels (positioned on sides) */}
            {inputs.length > 0 && (
                <div className="handle-labels left">
                    {inputs.map((input, index) => (
                        input.label && (
                            <span
                                key={input.id}
                                className="handle-label"
                                style={getHandleStyle(index, inputs.length)}
                            >
                                {input.label}
                            </span>
                        )
                    ))}
                </div>
            )}

            {outputs.length > 0 && (
                <div className="handle-labels right">
                    {outputs.map((output, index) => (
                        output.label && (
                            <span
                                key={output.id}
                                className="handle-label"
                                style={getHandleStyle(index, outputs.length)}
                            >
                                {output.label}
                            </span>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default BaseNode;
