
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { MemberCard } from "./MemberCard";
import { BhvMember } from "./types";

interface MembersTabProps {
  bhvMembers: BhvMember[];
}

export const MembersTab = ({ bhvMembers }: MembersTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">BHV-team leden</h2>
        <Button className="bg-compliblue hover:bg-compliblue/90">
          <User className="mr-2" size={16} />
          BHV'er toevoegen
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bhvMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
