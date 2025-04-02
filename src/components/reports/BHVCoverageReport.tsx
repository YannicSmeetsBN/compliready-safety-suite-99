
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Download, Filter } from "lucide-react";

// Mock data for BHV coverage report
const bhvCoverageData = [
  { locationId: "1", locationName: "Hoofdkantoor Amsterdam", employees: 120, bhvRequired: 3, bhvAvailable: 5, status: "sufficient" },
  { locationId: "2", locationName: "Productielocatie Rotterdam", employees: 80, bhvRequired: 2, bhvAvailable: 2, status: "sufficient" },
  { locationId: "3", locationName: "Magazijn Utrecht", employees: 35, bhvRequired: 1, bhvAvailable: 0, status: "insufficient" },
  { locationId: "4", locationName: "R&D Centrum Eindhoven", employees: 45, bhvRequired: 1, bhvAvailable: 2, status: "sufficient" },
  { locationId: "5", locationName: "Distributiecentrum Zwolle", employees: 60, bhvRequired: 2, bhvAvailable: 1, status: "insufficient" }
];

export const BHVCoverageReport = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">BHV-dekking per locatie</h3>
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
              <th className="text-center p-3">Medewerkers</th>
              <th className="text-center p-3">BHV'ers benodigd</th>
              <th className="text-center p-3">BHV'ers beschikbaar</th>
              <th className="text-center p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bhvCoverageData.map((location) => (
              <tr key={location.locationId} className="border-b">
                <td className="p-3">{location.locationName}</td>
                <td className="text-center p-3">{location.employees}</td>
                <td className="text-center p-3">{location.bhvRequired}</td>
                <td className="text-center p-3">{location.bhvAvailable}</td>
                <td className="text-center p-3">
                  {location.status === "sufficient" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Voldoende
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Onvoldoende
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex items-start">
          <AlertTriangle className="text-yellow-600 mr-3 mt-0.5" size={18} />
          <div>
            <h4 className="font-medium text-yellow-800">Let op</h4>
            <p className="text-sm text-yellow-700">
              Volgens de Arbowet moet iedere werkgever beschikken over voldoende BHV'ers om adequate 
              hulpverlening te kunnen bieden. De norm is minimaal 1 BHV'er per 50 medewerkers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
