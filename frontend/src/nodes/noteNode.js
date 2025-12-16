// noteNode.js
// Note node for adding annotations/comments to the pipeline (no connections)

import { useState } from 'react';
import { StickyNote } from 'lucide-react';
import { useStore } from '../store';
import '../styles/nodes.css';

export const NoteNode = ({ id, data }) => {
    const [note, setNote] = useState(data?.note || 'Add your notes here...');
    const [color, setColor] = useState(data?.color || '#64748B');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const colors = [
        { value: '#64748B', label: 'Gray' },
        { value: '#3B82F6', label: 'Blue' },
        { value: '#10B981', label: 'Green' },
        { value: '#F59E0B', label: 'Yellow' },
        { value: '#EF4444', label: 'Red' },
        { value: '#8B5CF6', label: 'Purple' },
    ];

    const handleNoteChange = (e) => {
        setNote(e.target.value);
        updateNodeField(id, 'note', e.target.value);
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
        updateNodeField(id, 'color', e.target.value);
    };

    return (
        <div
            className="base-node note-node"
            style={{
                minWidth: '200px',
                borderLeft: `3px solid ${color}`,
                background: `linear-gradient(135deg, var(--bg-surface) 0%, ${color}15 100%)`
            }}
        >
            <div className="node-header" style={{ borderLeft: `3px solid ${color}` }}>
                <span className="node-icon"><StickyNote size={14} /></span>
                <span className="node-title">Note</span>
                <select
                    value={color}
                    onChange={handleColorChange}
                    style={{
                        marginLeft: 'auto',
                        background: color,
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 4px',
                        fontSize: '10px',
                        color: '#fff',
                        cursor: 'pointer',
                        width: 'auto',
                        minHeight: 'auto'
                    }}
                >
                    {colors.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </div>
            <div className="node-content">
                <textarea
                    value={note}
                    onChange={handleNoteChange}
                    placeholder="Write your notes..."
                    className="note-textarea"
                    style={{
                        background: 'transparent',
                        border: '1px dashed var(--border-default)',
                        borderRadius: '4px',
                        padding: '8px',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        fontFamily: 'var(--font-family)',
                        minHeight: '50px',
                        resize: 'both',
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                />
            </div>
        </div>
    );
};
