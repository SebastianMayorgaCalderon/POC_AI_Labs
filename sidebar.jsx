"use client";
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Sidebar({
  selectedCloud
}) {
  const [searchTerm, setSearchTerm] = useState("")

  // Get resources based on selected cloud provider
  const getCloudResources = () => {
    switch (selectedCloud) {
      case "aws":
        return awsResources
      case "azure":
        return azureResources
      case "gcp":
        return gcpResources
      case "terraform":
        return terraformResources
      default:
        return awsResources
    }
  }

  // AWS resources
  const awsResources = [
    { type: "ec2Instance", name: "EC2 Instance", category: "compute", icon: "/images/aws/ec2.png" },
    { type: "s3Bucket", name: "S3 Bucket", category: "storage", icon: "/images/aws/s3.png" },
    { type: "rdsInstance", name: "RDS Database", category: "database", icon: "/images/aws/rds.png" },
    { type: "lambdaFunction", name: "Lambda Function", category: "compute", icon: "/images/aws/lambda.png" },
    { type: "vpc", name: "VPC", category: "network", icon: "/images/aws/vpc.png" },
    { type: "securityGroup", name: "Security Group", category: "network", icon: "/images/aws/security-group.png" },
    { type: "elasticLoadBalancer", name: "Elastic Load Balancer", category: "network", icon: "/images/aws/elb.png" },
    { type: "dynamoDb", name: "DynamoDB", category: "database", icon: "/images/aws/dynamodb.png" },
  ]

  // Azure resources (placeholder - would be expanded in a real implementation)
  const azureResources = [
    {
      type: "virtualMachine",
      name: "Virtual Machine",
      category: "compute",
      icon: "/placeholder.svg?height=32&width=32",
    },
    { type: "blobStorage", name: "Blob Storage", category: "storage", icon: "/placeholder.svg?height=32&width=32" },
    { type: "sqlDatabase", name: "SQL Database", category: "database", icon: "/placeholder.svg?height=32&width=32" },
    { type: "function", name: "Function App", category: "compute", icon: "/placeholder.svg?height=32&width=32" },
    { type: "vnet", name: "Virtual Network", category: "network", icon: "/placeholder.svg?height=32&width=32" },
  ]

  // GCP resources (placeholder - would be expanded in a real implementation)
  const gcpResources = [
    { type: "computeEngine", name: "Compute Engine", category: "compute", icon: "/placeholder.svg?height=32&width=32" },
    { type: "cloudStorage", name: "Cloud Storage", category: "storage", icon: "/placeholder.svg?height=32&width=32" },
    { type: "cloudSQL", name: "Cloud SQL", category: "database", icon: "/placeholder.svg?height=32&width=32" },
    { type: "cloudFunction", name: "Cloud Function", category: "compute", icon: "/placeholder.svg?height=32&width=32" },
    { type: "vpc", name: "VPC Network", category: "network", icon: "/placeholder.svg?height=32&width=32" },
  ]

  // Terraform resources (placeholder - would be expanded in a real implementation)
  const terraformResources = [
    { type: "instance", name: "Instance", category: "compute", icon: "/placeholder.svg?height=32&width=32" },
    { type: "bucket", name: "Bucket", category: "storage", icon: "/placeholder.svg?height=32&width=32" },
    { type: "database", name: "Database", category: "database", icon: "/placeholder.svg?height=32&width=32" },
    { type: "function", name: "Function", category: "compute", icon: "/placeholder.svg?height=32&width=32" },
    { type: "network", name: "Network", category: "network", icon: "/placeholder.svg?height=32&width=32" },
  ]

  const resources = getCloudResources()

  // Filter resources based on search term
  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Group resources by category
  const computeResources = filteredResources.filter((r) => r.category === "compute")
  const storageResources = filteredResources.filter((r) => r.category === "storage")
  const databaseResources = filteredResources.filter((r) => r.category === "database")
  const networkResources = filteredResources.filter((r) => r.category === "network")

  const onDragStart = (event, nodeType, nodeName) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.setData("application/nodeName", nodeName)
    event.dataTransfer.effectAllowed = "move"
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
      case "terraform":
        return "Terraform"
      default:
        return selectedCloud
    }
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="compute">Compute</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="all" className="m-0">
            <div className="p-4">
              <h3 className="font-medium mb-2">{getCloudProviderName()} Resources</h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.type} resource={resource} onDragStart={onDragStart} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compute" className="m-0">
            <div className="p-4">
              <h3 className="font-medium mb-2">Compute Resources</h3>
              <div className="grid grid-cols-2 gap-2">
                {computeResources.map((resource) => (
                  <ResourceCard key={resource.type} resource={resource} onDragStart={onDragStart} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="storage" className="m-0">
            <div className="p-4">
              <h3 className="font-medium mb-2">Storage Resources</h3>
              <div className="grid grid-cols-2 gap-2">
                {storageResources.map((resource) => (
                  <ResourceCard key={resource.type} resource={resource} onDragStart={onDragStart} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="network" className="m-0">
            <div className="p-4">
              <h3 className="font-medium mb-2">Network Resources</h3>
              <div className="grid grid-cols-2 gap-2">
                {networkResources.map((resource) => (
                  <ResourceCard key={resource.type} resource={resource} onDragStart={onDragStart} />
                ))}
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

function ResourceCard({
  resource,
  onDragStart
}) {
  return (
    <Card
      className="cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={(event) => onDragStart(event, resource.type, resource.name)}>
      <CardContent className="p-2 flex flex-col items-center">
        <div className="w-8 h-8 mb-1 flex items-center justify-center">
          <img
            src={resource.icon || "/placeholder.svg?height=32&width=32"}
            alt={resource.name}
            className="max-w-full max-h-full" />
        </div>
        <span className="text-xs text-center">{resource.name}</span>
      </CardContent>
    </Card>
  );
}
