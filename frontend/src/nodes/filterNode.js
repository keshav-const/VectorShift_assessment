// filterNode.js
// Filter node for transforming/filtering data

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
    const [filterType, setFilterType] = useState(data?.filterType || 'contains');
    const [filterValue, setFilterValue] = useState(data?.filterValue || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const filterTypes = [
        { value: 'contains', label: 'Contains' },
        { value: 'startsWith', label: 'Starts With' },
        { value: 'endsWith', label: 'Ends With' },
        { value: 'equals', label: 'Equals' },
        { value: 'regex', label: 'Regex Match' },
        { value: 'length', label: 'Length >' },
    ];

    const handleTypeChange = (e) => {
        setFilterType(e.target.value);
        updateNodeField(id, 'filterType', e.target.value);
    };

    const handleValueChange = (e) => {
        setFilterValue(e.target.value);
        updateNodeField(id, 'filterValue', e.target.value);
    };

    return (
        <BaseNode
            id={id}
            title="Filter"
            icon={<Filter size={14} />}
            type="filter"
            inputs={[{ id: `${id}-input` }]}
            outputs={[{ id: `${id}-output` }]}
        >
            <div className="node-field">
                <label>Condition</label>
                <select value={filterType} onChange={handleTypeChange}>
                    {filterTypes.map(ft => (
                        <option key={ft.value} value={ft.value}>{ft.label}</option>
                    ))}
                </select>
            </div>
            <div className="node-field">
                <label>Value</label>
                <input
                    type="text"
                    value={filterValue}
                    onChange={handleValueChange}
                    placeholder={filterType === 'regex' ? 'Enter pattern' : 'Enter value'}
                />
            </div>
        </BaseNode>
    );
};
