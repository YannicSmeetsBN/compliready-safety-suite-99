
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useModules, ConfigurableModule } from "@/contexts/ModulesContext";
import { toast } from "@/hooks/use-toast";
import { FileText, Bell, Phone, Clock, Building } from "lucide-react";

interface ModuleItemProps {
  id: ConfigurableModule;
  title: string;
  description: string;
  icon: React.ReactNode;
  isEnabled: boolean;
  onToggle: () => void;
}

const ModuleItem = ({ id, title, description, icon, isEnabled, onToggle }: ModuleItemProps) => (
  <div className="flex items-start justify-between py-4 border-b last:border-0">
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <Switch id={`module-${id}`} checked={isEnabled} onCheckedChange={onToggle} />
  </div>
);

export const ModulesTab = () => {
  const { isModuleEnabled, toggleModule } = useModules();
  
  const handleSaveChanges = () => {
    toast({
      title: "Wijzigingen opgeslagen",
      description: "De moduleconfiguratie is bijgewerkt.",
    });
  };
  
  const modules = [
    {
      id: "certificates" as ConfigurableModule,
      title: "Certificaten",
      description: "Beheer en monitor certificaten van medewerkers",
      icon: <FileText size={20} />
    },
    {
      id: "safety" as ConfigurableModule,
      title: "Veiligheidsbeheer",
      description: "Beheer veiligheidsmiddelen en PBM's",
      icon: <Bell size={20} />
    },
    {
      id: "documents" as ConfigurableModule,
      title: "Documentbeheer",
      description: "RI&E documenten en andere documentatie",
      icon: <FileText size={20} />
    },
    {
      id: "tachograph" as ConfigurableModule,
      title: "Tachograaf",
      description: "Beheer tachograafkaarten en -gegevens",
      icon: <Clock size={20} />
    },
    {
      id: "emergency" as ConfigurableModule,
      title: "BHV-Oproep",
      description: "BHV-noodoproepfunctionaliteit",
      icon: <Phone size={20} />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Modules configureren</h2>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg">Beschikbare modules</CardTitle>
          <CardDescription>
            Configureer welke modules zichtbaar zijn in uw omgeving
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {modules.map((module) => (
            <ModuleItem
              key={module.id}
              id={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              isEnabled={isModuleEnabled(module.id)}
              onToggle={() => toggleModule(module.id)}
            />
          ))}
        </CardContent>
      </Card>

      <p className="text-sm text-gray-500">
        <strong>Let op:</strong> Sommige functies zoals Dashboard, Medewerkers, en Rapportages zijn standaard altijd beschikbaar en kunnen niet uitgeschakeld worden.
      </p>

      <div className="flex justify-end">
        <Button 
          className="bg-compliblue hover:bg-compliblue/90"
          onClick={handleSaveChanges}
        >
          Wijzigingen opslaan
        </Button>
      </div>
    </div>
  );
};
