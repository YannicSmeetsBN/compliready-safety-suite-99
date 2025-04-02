
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Modules die geconfigureerd kunnen worden
export type ConfigurableModule = 
  | "certificates" 
  | "safety" 
  | "documents" 
  | "tachograph" 
  | "emergency";

export interface ModulesContextType {
  enabledModules: ConfigurableModule[];
  isModuleEnabled: (module: ConfigurableModule) => boolean;
  toggleModule: (module: ConfigurableModule) => void;
}

const defaultEnabledModules: ConfigurableModule[] = [
  "certificates",
  "safety",
  "documents",
  "tachograph",
  "emergency"
];

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export const ModulesProvider = ({ children }: { children: ReactNode }) => {
  // Laad ingeschakelde modules uit localStorage of gebruik standaardwaarden
  const [enabledModules, setEnabledModules] = useState<ConfigurableModule[]>(() => {
    const savedModules = localStorage.getItem("enabledModules");
    return savedModules ? JSON.parse(savedModules) : defaultEnabledModules;
  });

  // Bijwerken van localStorage wanneer modules veranderen
  useEffect(() => {
    localStorage.setItem("enabledModules", JSON.stringify(enabledModules));
  }, [enabledModules]);

  const isModuleEnabled = (module: ConfigurableModule) => {
    return enabledModules.includes(module);
  };

  const toggleModule = (module: ConfigurableModule) => {
    setEnabledModules(current => {
      if (current.includes(module)) {
        return current.filter(m => m !== module);
      } else {
        return [...current, module];
      }
    });
  };

  const value = {
    enabledModules,
    isModuleEnabled,
    toggleModule
  };

  return (
    <ModulesContext.Provider value={value}>
      {children}
    </ModulesContext.Provider>
  );
};

export const useModules = (): ModulesContextType => {
  const context = useContext(ModulesContext);
  if (context === undefined) {
    throw new Error("useModules must be used within a ModulesProvider");
  }
  return context;
};
