import React, { createContext, useState, useContext } from "react";

// Types
interface ARSceneState {
  modelName: string;
  isRotationActive: boolean;
}

interface ARSceneContextType {
  sceneState: ARSceneState;
  setSceneState: React.Dispatch<React.SetStateAction<ARSceneState>>;
}

// Default Values
const defaultSceneState: ARSceneState = {
  modelName: "defaultModel",
  isRotationActive: true,
};

// Context
const ARSceneContext = createContext<ARSceneContextType | undefined>(undefined);

// Provider
export const ARSceneProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sceneState, setSceneState] = useState<ARSceneState>(defaultSceneState);

  return (
    <ARSceneContext.Provider value={{ sceneState, setSceneState }}>
      {children}
    </ARSceneContext.Provider>
  );
};

// Hook to use the context
export const useARSceneContext = () => {
  const context = useContext(ARSceneContext);
  if (!context) {
    throw new Error("useARSceneContext must be used within an ARSceneProvider");
  }
  return context;
};
