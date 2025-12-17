// submit.js
// Submit button component with backend integration

import { useState } from 'react';
import { Rocket, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        // Get current nodes and edges from the store
        const { nodes, edges } = useStore.getState();

        // Validate that there's something to submit
        if (nodes.length === 0) {
            setResult({
                error: true,
                message: 'Please add at least one node to the pipeline before submitting.'
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult({
                error: false,
                num_nodes: data.num_nodes,
                num_edges: data.num_edges,
                is_dag: data.is_dag,
            });
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setResult({
                error: true,
                message: 'Failed to connect to backend. Make sure the server is running on port 8000.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const closeResult = () => {
        setResult(null);
    };

    return (
        <>
            <div className="submit-container">
                <button
                    type="button"
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    <Rocket size={18} className={isLoading ? 'spin' : ''} />
                    {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
                </button>
            </div>

            {/* Result Modal */}
            {result && (
                <div className="toast-overlay" onClick={closeResult}>
                    <div className="toast-content" onClick={(e) => e.stopPropagation()}>
                        {result.error ? (
                            <>
                                <div className="toast-header">
                                    <AlertCircle size={24} color="var(--error)" />
                                    <span className="toast-title">Error</span>
                                </div>
                                <div className="toast-body">
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                        {result.message}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="toast-header">
                                    <CheckCircle size={24} color="var(--success)" />
                                    <span className="toast-title">Pipeline Analysis</span>
                                </div>
                                <div className="toast-body">
                                    <div className="toast-stat">
                                        <span className="toast-stat-label">Number of Nodes</span>
                                        <span className="toast-stat-value">{result.num_nodes}</span>
                                    </div>
                                    <div className="toast-stat">
                                        <span className="toast-stat-label">Number of Edges</span>
                                        <span className="toast-stat-value">{result.num_edges}</span>
                                    </div>
                                    <div className="toast-stat">
                                        <span className="toast-stat-label">Valid DAG</span>
                                        <span className={`toast-stat-value ${result.is_dag ? 'success' : 'error'}`}>
                                            {result.is_dag ? '✓ Yes' : '✗ No (contains cycle)'}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                        <button className="toast-close" onClick={closeResult}>
                            <X size={16} style={{ marginRight: '4px' }} />
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
