
import { ReactNode } from "react";
import { 
  FileText, 
  Users, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Shield, 
  Award,
  BookOpen,
  Link
} from "lucide-react";

export interface ReportData {
  id: string;
  title: string;
  description: string;
  updated: string;
  type: string;
  icon: ReactNode;
  isDemo?: boolean;
}

// Mock data for reports
export const demoReports: ReportData[] = [
  {
    id: "partner-integration",
    title: "Opleider Integratie",
    description: "Koppeling met externe opleiders",
    updated: "Nieuwe functionaliteit",
    type: "integration",
    icon: <Link className="text-blue-500" size={24} />,
    isDemo: true
  },
  {
    id: "bhv-coverage",
    title: "BHV-dekking per locatie",
    description: "Analyse van BHV-capaciteit per locatie",
    updated: "Laatst bijgewerkt: 12-02-2025",
    type: "bhv",
    icon: <Users className="text-orange-500" size={24} />
  },
  {
    id: "compliance-scorecard",
    title: "Compliance Scorecard",
    description: "Mate van naleving van veiligheidsvoorschriften",
    updated: "Laatst bijgewerkt: 18-02-2025",
    type: "compliance",
    icon: <Award className="text-yellow-500" size={24} />
  },
  {
    id: "training-planning",
    title: "Opleidingsplanning",
    description: "Geplande trainingen en deelname",
    updated: "Laatst bijgewerkt: 15-02-2025",
    type: "training",
    icon: <Calendar className="text-violet-500" size={24} />
  },
  {
    id: "1",
    title: "Certificatenoverzicht",
    description: "Overzicht van alle certificaten en status",
    updated: "Laatst bijgewerkt: 20-02-2025",
    type: "certificate",
    icon: <FileText className="text-blue-500" size={24} />
  },
  {
    id: "2",
    title: "PBM Rapportage",
    description: "Status van persoonlijke beschermingsmiddelen",
    updated: "Laatst bijgewerkt: 15-02-2025",
    type: "pbm",
    icon: <Shield className="text-green-500" size={24} />
  },
  {
    id: "3",
    title: "Incidentrapportage",
    description: "Overzicht van gemelde incidenten",
    updated: "Laatst bijgewerkt: 07-02-2025",
    type: "incident",
    icon: <AlertTriangle className="text-amber-500" size={24} />
  },
  {
    id: "4",
    title: "Ontruimingsoefeningen",
    description: "Status en planning van ontruimingsoefeningen",
    updated: "Laatst bijgewerkt: 29-01-2025",
    type: "exercise",
    icon: <Users className="text-indigo-500" size={24} />
  },
  {
    id: "5",
    title: "Audit Resultaten",
    description: "Resultaten van recente veiligheidsaudits",
    updated: "Laatst bijgewerkt: 12-02-2025",
    type: "audit",
    icon: <CheckCircle2 className="text-emerald-500" size={24} />
  },
  {
    id: "6",
    title: "Herinnering Verlopen Items",
    description: "Items die aandacht vereisen",
    updated: "Laatst bijgewerkt: 01-02-2025",
    type: "notification",
    icon: <Bell className="text-red-500" size={24} />
  },
  {
    id: "7",
    title: "Veiligheidsmiddelen Status",
    description: "Status van alle veiligheidsmiddelen",
    updated: "Laatst bijgewerkt: 19-02-2025",
    type: "safety",
    icon: <Shield className="text-cyan-500" size={24} />
  },
  {
    id: "8",
    title: "Opleidingsoverzicht",
    description: "Status van verplichte en optionele trainingen",
    updated: "Laatst bijgewerkt: 05-02-2025",
    type: "training",
    icon: <BookOpen className="text-purple-500" size={24} />
  }
];
