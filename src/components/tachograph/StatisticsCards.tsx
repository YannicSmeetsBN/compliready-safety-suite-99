
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Bell, AlertTriangle } from "lucide-react";
import { TachographCard } from "./types";

interface StatisticsCardsProps {
  tachographCards: TachographCard[];
}

export const StatisticsCards = ({ tachographCards }: StatisticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="flex items-center p-4">
          <div className="p-2 rounded-full bg-green-100 mr-3">
            <Clock className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Actieve Tachograafkaarten</p>
            <p className="text-xl font-bold">{tachographCards.filter(c => c.status === "actief").length}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center p-4">
          <div className="p-2 rounded-full bg-amber-100 mr-3">
            <Bell className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Binnenkort verlopen</p>
            <p className="text-xl font-bold">{tachographCards.filter(c => c.status === "binnenkort-verlopen").length}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center p-4">
          <div className="p-2 rounded-full bg-red-100 mr-3">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Verlopen kaarten</p>
            <p className="text-xl font-bold">{tachographCards.filter(c => c.status === "verlopen").length}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
