// llmNode.js
// LLM node for AI/language model processing

import { Bot } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={<Bot size={14} />}
      type="llm"
      inputs={[
        { id: `${id}-system`, label: 'system' },
        { id: `${id}-prompt`, label: 'prompt' }
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <p className="node-info">
        Large Language Model
      </p>
    </BaseNode>
  );
};
