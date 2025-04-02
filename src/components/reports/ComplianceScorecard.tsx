
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Filter } from "lucide-react";

// Mock data for Compliance Scorecard
const complianceScoreData = [
  { 
    locationId: "1", 
    locationName: "Hoofdkantoor Amsterdam", 
    certificateScore: 92, 
    pbmScore: 88, 
    trainingScore: 95, 
    elearningScore: 90, 
    totalScore: 91 
  },
  { 
    locationId: "2", 
    locationName: "Productielocatie Rotterdam", 
    certificateScore: 78, 
    pbmScore: 95, 
    trainingScore: 82, 
    elearningScore: 75, 
    totalScore: 83 
  },
  { 
    locationId: "3", 
    locationName: "Magazijn Utrecht", 
    certificateScore: 65, 
    pbmScore: 72, 
    trainingScore: 60, 
    elearningScore: 58, 
    totalScore: 64 
  },
  { 
    locationId: "4", 
    locationName: "R&D Centrum Eindhoven", 
    certificateScore: 97, 
    pbmScore: 93, 
    trainingScore: 98, 
    elearningScore: 95, 
    totalScore: 96 
  },
  { 
    locationId: "5", 
    locationName: "Distributiecentrum Zwolle", 
    certificateScore: 75, 
    pbmScore: 80, 
    trainingScore: 78, 
    elearningScore: 72, 
    totalScore: 76 
  }
];

interface ScoreIndicatorProps {
  score: number;
  showValue?: boolean;
}

const ScoreIndicator = ({ score, showValue = false }: ScoreIndicatorProps) => {
  let bgColor = "";
  
  if (score >= 90) bgColor = "bg-green-500";
  else if (score >= 80) bgColor = "bg-green-300";
  else if (score >= 70) bgColor = "bg-yellow-400";
  else if (score >= 60) bgColor = "bg-red-400";
  else bgColor = "bg-red-600";
  
  return (
    <div className="flex items-center justify-center">
      <span className={`w-3 h-3 ${bgColor} rounded-full mr-2`}></span>
      {showValue && <span>{score}%</span>}
    </div>
  );
};

export const ComplianceScorecard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Compliance Scorecard</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporteren
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-3">Locatie</th>
              <th className="text-center p-3">Certificaten</th>
              <th className="text-center p-3">PBM's</th>
              <th className="text-center p-3">Trainingen</th>
              <th className="text-center p-3">E-learning</th>
              <th className="text-center p-3">Totaalscore</th>
            </tr>
          </thead>
          <tbody>
            {complianceScoreData.map((location) => (
              <tr key={location.locationId} className="border-b">
                <td className="p-3">{location.locationName}</td>
                <td className="text-center p-3">
                  <ScoreIndicator score={location.certificateScore} />
                </td>
                <td className="text-center p-3">
                  <ScoreIndicator score={location.pbmScore} />
                </td>
                <td className="text-center p-3">
                  <ScoreIndicator score={location.trainingScore} />
                </td>
                <td className="text-center p-3">
                  <ScoreIndicator score={location.elearningScore} />
                </td>
                <td className="text-center p-3">
                  <div className="font-semibold">
                    <ScoreIndicator score={location.totalScore} showValue />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Legenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>90-100%: Uitstekend</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-300 rounded-full mr-2"></span>
                <span>80-89%: Goed</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                <span>70-79%: Voldoende</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                <span>60-69%: Matig</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                <span>0-59%: Onvoldoende</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Toelichting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              De compliance score geeft aan in hoeverre de organisatie voldoet aan gestelde eisen en 
              regelgeving. De score is gebaseerd op verschillende componenten:
            </p>
            <ul className="text-xs text-gray-600 list-disc pl-5 mt-2 space-y-1">
              <li>Certificaten: % medewerkers met geldige en up-to-date certificaten</li>
              <li>PBM's: % correct uitgegeven en gekeurde persoonlijke beschermingsmiddelen</li>
              <li>Trainingen: % medewerkers die vereiste trainingen hebben gevolgd</li>
              <li>E-learning: % voltooide verplichte e-learning modules</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
