"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CloudProviderCard } from "./cloud-provider-card"
import { ArrowRight } from "lucide-react"

export default function CloudSelection({
  onCloudSelect,
  selectedCloud,
  onProceed
}) {
  const cloudProviders = [
    {
      id: "aws",
      name: "Amazon Web Services",
      description: "Create infrastructure diagrams for AWS CloudFormation",
      logoUrl: "/images/aws-logo.png",
    },
    {
      id: "azure",
      name: "Microsoft Azure",
      description: "Create infrastructure diagrams for Azure Resource Manager",
      logoUrl: "/images/azure-logo.png",
    },
    {
      id: "gcp",
      name: "Google Cloud Platform",
      description: "Create infrastructure diagrams for Google Cloud Deployment Manager",
      logoUrl: "/images/gcp-logo.png",
    },
    {
      id: "terraform",
      name: "Terraform",
      description: "Create infrastructure diagrams for Terraform HCL",
      logoUrl: "/images/terraform-logo.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800">Cloud Infrastructure Diagram Tool</h1>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-center">Select a Cloud Provider</h2>
            <p className="text-gray-600 mb-8 text-center">
              Choose the cloud provider you want to create infrastructure diagrams for
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {cloudProviders.map((provider) => (
                <CloudProviderCard
                  key={provider.id}
                  provider={provider}
                  isSelected={selectedCloud === provider.id}
                  onSelect={() => onCloudSelect(provider.id)} />
              ))}
            </div>

            <div className="flex justify-center">
              <Button onClick={onProceed} disabled={!selectedCloud} className="px-6">
                Proceed to Canvas <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-white py-4 px-6 text-center text-gray-500 text-sm">
        Cloud Infrastructure Diagram Tool - Internal DevOps Tool
      </footer>
    </div>
  );
}
