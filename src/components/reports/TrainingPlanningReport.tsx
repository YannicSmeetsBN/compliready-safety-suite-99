
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, CheckCircle2, Download, Users } from "lucide-react";

// Mock data for Training Planning
const trainingPlanningData = [
  {
    id: "1",
    title: "BHV Basis Training",
    date: "25 augustus 2023",
    location: "Hoofdkantoor Amsterdam",
    registeredSpots: 8,
    totalSpots: 12,
    registeredEmployees: [
      "Anna de Vries", 
      "Peter Jansen", 
      "Sandra Bakker", 
      "Mohammed Al-Farsi", 
      "Julia Smit", 
      "Thomas Berg", 
      "Emma van Dijk", 
      "David Janssen"
    ]
  },
  {
    id: "2",
    title: "VCA Hercertificering",
    date: "10 september 2023",
    location: "Productielocatie Rotterdam",
    registeredSpots: 5,
    totalSpots: 10,
    registeredEmployees: [
      "Marco Visser", 
      "Lieke van Vliet", 
      "Jan de Boer", 
      "Fatima El-Amrani", 
      "Bram Hendriks"
    ]
  },
  {
    id: "3",
    title: "Veilig Werken op Hoogte",
    date: "15 september 2023",
    location: "Magazijn Utrecht",
    registeredSpots: 3,
    totalSpots: 6,
    registeredEmployees: [
      "Daan Vermeulen", 
      "Naomi de Groot", 
      "Sven Mulder"
    ]
  }
];

export const TrainingPlanningReport = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Opleidingsplanning rapport</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Selecteer periode
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporteren
          </Button>
        </div>
      </div>
      
      {trainingPlanningData.map((training) => (
        <Card key={training.id}>
          <CardHeader className="pb-3 border-b">
            <div className="flex justify-between items-center">
              <CardTitle>{training.title}</CardTitle>
              <div className="text-sm font-medium text-gray-500 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" /> {training.date}
              </div>
            </div>
            <CardDescription className="flex items-center gap-4 mt-1">
              <span>Locatie: {training.location}</span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {training.registeredSpots}/{training.totalSpots} plekken gevuld
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Ingeschreven medewerkers:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {training.registeredEmployees.map((employee, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                    {employee}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t">
            <div className="flex justify-between w-full">
              <span className="text-sm text-gray-500">
                Nog {training.totalSpots - training.registeredSpots} beschikbare plekken
              </span>
              <Button size="sm" variant="outline">
                Medewerkers toevoegen
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
