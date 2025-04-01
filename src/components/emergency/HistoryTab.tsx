
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, MapPin } from "lucide-react";
import { CallHistoryItem } from "./types";

interface HistoryTabProps {
  callHistory: CallHistoryItem[];
}

export const HistoryTab = ({ callHistory }: HistoryTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Oproep historie</h2>
        <Button variant="outline">
          <FileText className="mr-2" size={16} />
          Exporteren
        </Button>
      </div>
      
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg">Historische BHV-oproepen</CardTitle>
          <CardDescription>
            Overzicht van alle BHV-oproepen in het verleden
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Datum</span>
                </th>
                <th className="text-left py-3 px-6">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Tijd</span>
                  </div>
                </th>
                <th className="text-left py-3 px-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Locatie</span>
                  </div>
                </th>
                <th className="text-left py-3 px-6">Type</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-right py-3 px-6">Acties</th>
              </tr>
            </thead>
            <tbody>
              {callHistory.map((call) => (
                <tr key={call.id} className="border-b">
                  <td className="py-3 px-6">{call.date}</td>
                  <td className="py-3 px-6">{call.time}</td>
                  <td className="py-3 px-6">{call.location}</td>
                  <td className="py-3 px-6">
                    {call.type === "EHBO" ? (
                      <span className="badge-info">EHBO</span>
                    ) : call.type === "Brand" ? (
                      <span className="badge-danger">Brand</span>
                    ) : (
                      <span className="badge-warning">{call.type}</span>
                    )}
                  </td>
                  <td className="py-3 px-6">
                    <span className="badge-success">{call.status}</span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
