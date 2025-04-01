
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle } from "lucide-react";
import { BhvMember } from "./types";

interface MemberCardProps {
  member: BhvMember;
}

export const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <Card key={member.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{member.name}</CardTitle>
          {member.status === "available" ? (
            <span className="badge-success">Beschikbaar</span>
          ) : (
            <span className="badge-danger">Niet beschikbaar</span>
          )}
        </div>
        <CardDescription>{member.department}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">BHV Certificaat:</span>
            <span className="text-green-600">Geldig tot 01-05-2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">EHBO:</span>
            <span className="text-green-600">Geldig tot 15-08-2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Laatste training:</span>
            <span>10-03-2023</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="mr-2" size={16} />
            Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <CheckCircle className="mr-2" size={16} />
            Status wijzigen
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
