from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Node(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict[str, float]] = None
    data: Optional[Dict[str, Any]] = None

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm (topological sort via BFS).
    
    A graph is a DAG if and only if it can be topologically sorted,
    which means we can process all nodes by repeatedly removing nodes with no incoming edges.
    """
    if len(nodes) == 0:
        return True  # Empty graph is a DAG
    
    # Build adjacency list and in-degree count
    node_ids = {node.id for node in nodes}
    in_degree = {node_id: 0 for node_id in node_ids}
    adj = {node_id: [] for node_id in node_ids}
    
    for edge in edges:
        # Only process edges where both source and target exist
        if edge.source in node_ids and edge.target in node_ids:
            adj[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Initialize queue with nodes that have no incoming edges
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    visited_count = 0
    
    while queue:
        node = queue.pop(0)
        visited_count += 1
        
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, the graph is a DAG
    # If some nodes couldn't be visited, there's a cycle
    return visited_count == len(nodes)

@app.post('/pipelines/parse', response_model=PipelineResponse)
async def parse_pipeline(pipeline: PipelineData):
    """
    Parse the pipeline and return analysis results.
    
    Returns:
        - num_nodes: Number of nodes in the pipeline
        - num_edges: Number of edges (connections) in the pipeline
        - is_dag: Whether the pipeline forms a valid Directed Acyclic Graph
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=dag_status
    )
