"use client";
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export function CloudProviderCard({
  provider,
  isSelected,
  onSelect
}) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
      onClick={onSelect}>
      <CardContent className="p-6 flex items-center">
        <div className="relative h-16 w-16 flex-shrink-0 mr-4">
          <Image
            src={provider.logoUrl || "/placeholder.svg"}
            alt={`${provider.name} logo`}
            fill
            className="object-contain" />
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-lg">{provider.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{provider.description}</p>
        </div>

        {isSelected && (
          <div
            className="ml-4 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
