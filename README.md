VectorShift Pipeline Builder
============================

A full-stack application that allows users to design, connect, and analyze workflow pipelines through an intuitive drag-and-drop interface. This project was developed as part of the VectorShift Frontend Technical Assessment.

🚀 Key Features
---------------

### Frontend (React + ReactFlow)

*   **Node Abstraction:** Implemented a BaseNode component to eliminate code duplication, allowing for rapid creation of new node types with consistent styling.
    
*   **Dynamic Text Nodes:** Text nodes automatically resize as you type and dynamically generate input handles when variables are defined using {{ variable\_name }}.
    
*   **Enhanced UI/UX:** A modern, polished design featuring custom toolbars, styled handles, and a responsive canvas.
    
*   **Rich Node Library:** Includes 9 different node types: Input, Output, LLM, Text, API, Conditional, Filter, Merger, and Note.
    

### Backend (FastAPI)

*   **Pipeline Analysis:** A Python backend that receives the graph structure and calculates key metrics.
    
*   **DAG Verification:** Uses Kahn's Algorithm (Topological Sort) to determine if the user's pipeline is a valid Directed Acyclic Graph (DAG).
    
*   **CORS Integration:** Fully configured to communicate with the React frontend during local development.
    

📂 Project Structure
--------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ├── backend/  │   └── main.py          # FastAPI server, DAG logic, and API endpoints  └── frontend/      ├── src/      │   ├── nodes/       # Reusable BaseNode and specialized node types      │   ├── styles/      # Modular CSS for nodes, toolbars, and layout      │   ├── store.js     # State management for nodes/edges (Zustand)      │   ├── submit.js    # Backend integration logic      │   ├── toolbar.js   # Draggable node palette      │   └── ui.js        # Main ReactFlow canvas configuration      └── package.json     # Frontend dependencies and scripts   `

🛠️ Installation & Setup
------------------------

### Prerequisites

*   **Node.js** (v16+)
    
*   **Python** (v3.8+)
    

### 1\. Backend Setup

Navigate to the backend directory and start the FastAPI server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend  pip install fastapi uvicorn  uvicorn main:app --reload   `

The backend will run on http://localhost:8000.

### 2\. Frontend Setup

In a new terminal, navigate to the frontend directory and start the React app:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd frontend  npm install  npm start   `

The frontend will open automatically at http://localhost:3000.

📖 How to Use
-------------

1.  **Build:** Drag nodes from the top toolbar onto the canvas.
    
2.  **Connect:** Click and drag between handles to create edges.
    
3.  **Variables:** In a **Text Node**, type {{ my\_var }} to automatically create a new input handle named "my\_var".
    
4.  **Analyze:** Click the **Submit** button. An alert will display:
    
    *   Total number of nodes.
        
    *   Total number of edges.
        
    *   Whether the pipeline is a valid DAG.
        

🛠️ Tech Stack
--------------

*   **Frontend:** React, ReactFlow, Lucide Icons, CSS3.
    
*   **Backend:** Python, FastAPI, Pydantic.
    
*   **State Management:** Zustand.
