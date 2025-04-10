"use client";
import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css"
import { Sidebar } from "./sidebar"
import { EC2InstanceNode } from "./node-types/ec2-instance"
import { S3BucketNode } from "./node-types/s3-bucket"
import { RDSInstanceNode } from "./node-types/rds-instance"
import { LambdaFunctionNode } from "./node-types/lambda-function"
import { VPCNode } from "./node-types/vpc"
import { Button } from "@/components/ui/button"
import { Download, Save, Undo, Redo, ZoomIn, ZoomOut, ArrowLeft } from "lucide-react"

// Define custom node types
const nodeTypes = {
  ec2Instance: EC2InstanceNode,
  s3Bucket: S3BucketNode,
  rdsInstance: RDSInstanceNode,
  lambdaFunction: LambdaFunctionNode,
  vpc: VPCNode,
}

// Initial nodes and edges for demonstration
const initialNodes = [
  {
    id: "vpc-1",
    type: "vpc",
    data: { label: "VPC" },
    position: { x: 250, y: 100 },
  },
]

const initialEdges = []

export default function DiagramCanvas({
  selectedCloud,
  onBack
}) {
  return (
    <ReactFlowProvider>
      <CanvasContent selectedCloud={selectedCloud} onBack={onBack} />
    </ReactFlowProvider>
  );
}

function CanvasContent({
  selectedCloud,
  onBack
}) {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // Handle connections between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  )

  // Handle dropping a new node onto the canvas
  const onDrop = useCallback((event) => {
    event.preventDefault()

    if (reactFlowWrapper.current && reactFlowInstance) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")
      const name = event.dataTransfer.getData("application/nodeName")

      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: name || type },
      }

      setNodes((nds) => nds.concat(newNode))
    }
  }, [reactFlowInstance, setNodes])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  // Handle saving the diagram (placeholder for actual implementation)
  const handleSave = () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      console.log("Saving diagram:", flow)
      // In a real implementation, this would save to a database or generate CloudFormation/Oracle
    }
  }

  // Handle exporting the diagram (placeholder for actual implementation)
  const handleExport = () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      console.log("Exporting diagram:", flow)
      // In a real implementation, this would generate CloudFormation/Oracle code

      // Example of how you might download a JSON representation
      const data = JSON.stringify(flow, null, 2)
      const blob = new Blob([data], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "cloud-diagram.json"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Get cloud provider name for display
  const getCloudProviderName = () => {
    switch (selectedCloud) {
      case "aws":
        return "AWS"
      case "azure":
        return "Azure"
      case "gcp":
        return "Google Cloud"
      case "oracle":
        return "Oracle"
      default:
        return selectedCloud
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <header
        className="bg-white shadow-sm py-3 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold text-gray-800">{getCloudProviderName()} Infrastructure Diagram</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </header>
      <div className="flex-1 flex">
        <Sidebar selectedCloud={selectedCloud} />

        <div className="flex-1 h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}>
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />

            <Panel position="top-right" className="bg-white p-2 rounded shadow-md">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Redo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
