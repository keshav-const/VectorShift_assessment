// mergerNode.js
// Merger node for combining multiple inputs into one output

import { useState } from 'react';
import { Merge } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const MergerNode = ({ id, data }) => {
    const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');
    const [separator, setSeparator] = useState(data?.separator || '\\n');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const mergeTypes = [
        { value: 'concat', label: 'Concatenate' },
        { value: 'array', label: 'Array' },
        { value: 'object', label: 'Object' },
        { value: 'first', label: 'First Non-Empty' },
        { value: 'last', label: 'Last Non-Empty' },
    ];

    const handleTypeChange = (e) => {
        setMergeType(e.target.value);
        updateNodeField(id, 'mergeType', e.target.value);
    };

    const handleSeparatorChange = (e) => {
        setSeparator(e.target.value);
        updateNodeField(id, 'separator', e.target.value);
    };

    return (
        <BaseNode
            id={id}
            title="Merger"
            icon={<Merge size={14} />}
            type="merger"
            inputs={[
                { id: `${id}-input1`, label: 'in 1' },
                { id: `${id}-input2`, label: 'in 2' },
                { id: `${id}-input3`, label: 'in 3' }
            ]}
            outputs={[{ id: `${id}-output` }]}
        >
            <div className="node-field">
                <label>Merge Type</label>
                <select value={mergeType} onChange={handleTypeChange}>
                    {mergeTypes.map(mt => (
                        <option key={mt.value} value={mt.value}>{mt.label}</option>
                    ))}
                </select>
            </div>
            {mergeType === 'concat' && (
                <div className="node-field">
                    <label>Separator</label>
                    <input
                        type="text"
                        value={separator}
                        onChange={handleSeparatorChange}
                        placeholder="\\n"
                    />
                </div>
            )}
        </BaseNode>
    );
};
