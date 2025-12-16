// conditionalNode.js
// Conditional node for if/else branching logic

import { useState } from 'react';
import { GitBranch } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const ConditionalNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || 'equals');
    const [compareValue, setCompareValue] = useState(data?.compareValue || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const conditions = [
        { value: 'equals', label: '==' },
        { value: 'notEquals', label: '!=' },
        { value: 'contains', label: 'Contains' },
        { value: 'isEmpty', label: 'Is Empty' },
        { value: 'isNotEmpty', label: 'Is Not Empty' },
        { value: 'greaterThan', label: '>' },
        { value: 'lessThan', label: '<' },
    ];

    const handleConditionChange = (e) => {
        setCondition(e.target.value);
        updateNodeField(id, 'condition', e.target.value);
    };

    const handleValueChange = (e) => {
        setCompareValue(e.target.value);
        updateNodeField(id, 'compareValue', e.target.value);
    };

    const showValueField = !['isEmpty', 'isNotEmpty'].includes(condition);

    return (
        <BaseNode
            id={id}
            title="Conditional"
            icon={<GitBranch size={14} />}
            type="conditional"
            inputs={[{ id: `${id}-input` }]}
            outputs={[
                { id: `${id}-true`, label: 'true' },
                { id: `${id}-false`, label: 'false' }
            ]}
        >
            <div className="node-field">
                <label>Condition</label>
                <select value={condition} onChange={handleConditionChange}>
                    {conditions.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </div>
            {showValueField && (
                <div className="node-field">
                    <label>Compare Value</label>
                    <input
                        type="text"
                        value={compareValue}
                        onChange={handleValueChange}
                        placeholder="Enter value"
                    />
                </div>
            )}
            <div style={{
                display: 'flex',
                gap: '6px',
                marginTop: '6px',
                fontSize: '10px'
            }}>
                <span style={{
                    background: 'var(--success-bg)',
                    color: 'var(--success)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    flex: 1,
                    textAlign: 'center'
                }}>
                    ✓ True
                </span>
                <span style={{
                    background: 'var(--error-bg)',
                    color: 'var(--error)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    flex: 1,
                    textAlign: 'center'
                }}>
                    ✗ False
                </span>
            </div>
        </BaseNode>
    );
};
