"use client"

import { useState } from "react"
import CloudSelection from "./cloud-selection"
import DiagramCanvas from "./canvas"

export default function AppContainer() {
  const [selectedCloud, setSelectedCloud] = useState(null)
  const [isCanvasVisible, setIsCanvasVisible] = useState(false)

  const handleCloudSelect = (cloudId) => {
    setSelectedCloud(cloudId)
  }

  const handleProceedToCanvas = () => {
    if (selectedCloud) {
      setIsCanvasVisible(true)
    }
  }

  const handleBackToSelection = () => {
    setIsCanvasVisible(false)
  }

  return (
    <div className="h-screen flex flex-col">
      {!isCanvasVisible ? (
        <CloudSelection
          onCloudSelect={handleCloudSelect}
          selectedCloud={selectedCloud}
          onProceed={handleProceedToCanvas} />
      ) : (
        <DiagramCanvas selectedCloud={selectedCloud} onBack={handleBackToSelection} />
      )}
    </div>
  );
}
