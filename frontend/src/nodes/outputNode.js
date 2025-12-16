// outputNode.js
// Output node for displaying/exporting pipeline results

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={<Upload size={14} />}
      type="customOutput"
      inputs={[{ id: `${id}-value` }]}
    >
      <div className="node-field">
        <label>Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          placeholder="Enter output name"
        />
      </div>
      <div className="node-field">
        <label>Type</label>
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
