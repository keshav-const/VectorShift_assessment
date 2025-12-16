// toolbar.js
// Pipeline toolbar with all available node types

import {
    Download,
    Bot,
    Upload,
    Type,
    StickyNote,
    Filter,
    Merge,
    GitBranch,
    Globe
} from 'lucide-react';
import { DraggableNode } from './draggableNode';
import './styles/toolbar.css';

export const PipelineToolbar = () => {
    // Define all available node types with their properties
    const nodeTypes = [
        // Original nodes
        { type: 'customInput', label: 'Input', icon: <Download size={18} /> },
        { type: 'llm', label: 'LLM', icon: <Bot size={18} /> },
        { type: 'customOutput', label: 'Output', icon: <Upload size={18} /> },
        { type: 'text', label: 'Text', icon: <Type size={18} /> },
        // New nodes demonstrating abstraction
        { type: 'note', label: 'Note', icon: <StickyNote size={18} /> },
        { type: 'filter', label: 'Filter', icon: <Filter size={18} /> },
        { type: 'merger', label: 'Merger', icon: <Merge size={18} /> },
        { type: 'conditional', label: 'If/Else', icon: <GitBranch size={18} /> },
        { type: 'api', label: 'API', icon: <Globe size={18} /> },
    ];

    return (
        <div className="toolbar">
            <div className="toolbar-title">Pipeline Nodes</div>
            <div className="toolbar-nodes">
                {nodeTypes.map((node) => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                        icon={node.icon}
                    />
                ))}
            </div>
        </div>
    );
};
