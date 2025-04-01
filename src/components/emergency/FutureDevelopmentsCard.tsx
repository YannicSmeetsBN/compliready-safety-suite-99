
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FutureDevelopmentsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Toekomstige ontwikkelingen</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          In de toekomst zal het BHV-oproepsysteem worden uitgebreid met:
        </p>
        <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-1">
          <li>Mobiele app voor directe notificaties op smartphones</li>
          <li>GPS-locatiebepaling van BHV'ers</li>
          <li>Automatische koppeling met alarmsystemen</li>
          <li>Realtime communicatie tussen BHV'ers tijdens calamiteiten</li>
        </ul>
      </CardContent>
    </Card>
  );
};
