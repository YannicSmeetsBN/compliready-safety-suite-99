
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
  BookOpen
} from "lucide-react";

export interface ReportData {
  id: string;
  title: string;
  description: string;
  updated: string;
  type: string;
  icon: ReactNode;
}

// Mock data for reports
export const demoReports: ReportData[] = [
  {
    id: "1",
    title: "Certificatenoverzicht",
    description: "Overzicht van alle certificaten en status",
    updated: "Laatst bijgewerkt: 23 mei 2023",
    type: "certificate",
    icon: <FileText className="text-blue-500" size={24} />
  },
  {
    id: "2",
    title: "PBM Rapportage",
    description: "Status van persoonlijke beschermingsmiddelen",
    updated: "Laatst bijgewerkt: 15 juni 2023",
    type: "pbm",
    icon: <Shield className="text-green-500" size={24} />
  },
  {
    id: "3",
    title: "Incidentrapportage",
    description: "Overzicht van gemelde incidenten",
    updated: "Laatst bijgewerkt: 7 juli 2023",
    type: "incident",
    icon: <AlertTriangle className="text-amber-500" size={24} />
  },
  {
    id: "4",
    title: "Ontruimingsoefeningen",
    description: "Status en planning van ontruimingsoefeningen",
    updated: "Laatst bijgewerkt: 30 april 2023",
    type: "exercise",
    icon: <Users className="text-indigo-500" size={24} />
  },
  {
    id: "5",
    title: "Audit Resultaten",
    description: "Resultaten van recente veiligheidsaudits",
    updated: "Laatst bijgewerkt: 12 mei 2023",
    type: "audit",
    icon: <CheckCircle2 className="text-emerald-500" size={24} />
  },
  {
    id: "6",
    title: "Herinnering Verlopen Items",
    description: "Items die aandacht vereisen",
    updated: "Laatst bijgewerkt: 1 juli 2023",
    type: "notification",
    icon: <Bell className="text-red-500" size={24} />
  },
  {
    id: "7",
    title: "Veiligheidsmiddelen Status",
    description: "Status van alle veiligheidsmiddelen",
    updated: "Laatst bijgewerkt: 19 juni 2023",
    type: "safety",
    icon: <Shield className="text-cyan-500" size={24} />
  },
  {
    id: "8",
    title: "Opleidingsoverzicht",
    description: "Status van verplichte en optionele trainingen",
    updated: "Laatst bijgewerkt: 5 juli 2023",
    type: "training",
    icon: <BookOpen className="text-purple-500" size={24} />
  },
  {
    id: "9",
    title: "BHV-dekking per locatie",
    description: "Analyse van BHV-capaciteit per locatie",
    updated: "Laatst bijgewerkt: 10 juli 2023",
    type: "bhv",
    icon: <Users className="text-orange-500" size={24} />
  },
  {
    id: "10",
    title: "Compliance Scorecard",
    description: "Mate van naleving van veiligheidsvoorschriften",
    updated: "Laatst bijgewerkt: 18 juli 2023",
    type: "compliance",
    icon: <Award className="text-yellow-500" size={24} />
  },
  {
    id: "11",
    title: "Opleidingsplanning",
    description: "Geplande trainingen en deelname",
    updated: "Laatst bijgewerkt: 15 juli 2023",
    type: "training",
    icon: <Calendar className="text-violet-500" size={24} />
  }
];
