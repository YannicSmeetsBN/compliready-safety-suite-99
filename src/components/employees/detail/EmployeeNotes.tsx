
import { FileText, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmployeeNotesProps {
  notes: any[];
  handleAdd: (section: string) => void;
  handleEdit: (section: string, item: string) => void;
  handleDelete: (section: string, item: string) => void;
}

export const EmployeeNotes = ({ 
  notes,
  handleAdd,
  handleEdit,
  handleDelete
}: EmployeeNotesProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <FileText className="mr-2" size={20} />
          Notities
        </CardTitle>
        <Button 
          className="bg-compliblue hover:bg-compliblue/90" 
          size="sm" 
          onClick={() => handleAdd('notitie')}
        >
          <Plus className="mr-2" size={16} />
          Notitie toevoegen
        </Button>
      </CardHeader>
      <CardContent>
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Geen notities gevonden
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="rounded-lg border p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{note.author}</span>
                  <span className="text-sm text-gray-500">{note.date}</span>
                </div>
                <p className="text-gray-700">{note.text}</p>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit('notitie', `van ${note.author}`)}
                  >
                    <Edit size={16} className="mr-2" />
                    Bewerken
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete('notitie', `van ${note.author}`)}
                  >
                    <Trash size={16} className="mr-2" />
                    Verwijderen
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
