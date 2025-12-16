// apiNode.js
// API node for making external HTTP requests

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
    const [method, setMethod] = useState(data?.method || 'GET');
    const [url, setUrl] = useState(data?.url || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const methods = [
        { value: 'GET', color: '#10B981' },
        { value: 'POST', color: '#3B82F6' },
        { value: 'PUT', color: '#F59E0B' },
        { value: 'DELETE', color: '#EF4444' },
        { value: 'PATCH', color: '#8B5CF6' },
    ];

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
        updateNodeField(id, 'method', e.target.value);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        updateNodeField(id, 'url', e.target.value);
    };

    const currentMethod = methods.find(m => m.value === method);

    return (
        <BaseNode
            id={id}
            title="API"
            icon={<Globe size={14} />}
            type="api"
            inputs={[
                { id: `${id}-body`, label: 'body' },
                { id: `${id}-headers`, label: 'headers' }
            ]}
            outputs={[{ id: `${id}-response` }]}
        >
            <div className="node-field">
                <label>Method</label>
                <select
                    value={method}
                    onChange={handleMethodChange}
                    style={{
                        background: `${currentMethod?.color}15`,
                        borderColor: currentMethod?.color
                    }}
                >
                    {methods.map(m => (
                        <option key={m.value} value={m.value}>{m.value}</option>
                    ))}
                </select>
            </div>
            <div className="node-field">
                <label>URL</label>
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="https://api.example.com"
                    style={{ fontFamily: 'monospace', fontSize: '11px' }}
                />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '4px',
                fontSize: '10px',
                color: 'var(--text-muted)'
            }}>
                <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: url ? 'var(--success)' : 'var(--error)',
                }} />
                {url ? 'Ready' : 'No URL'}
            </div>
        </BaseNode>
    );
};
