
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddPPETypeFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type FormValues = {
  name: string;
  description: string;
  inspectionInterval: number;
};

export const AddPPETypeForm: React.FC<AddPPETypeFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      inspectionInterval: 180,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted PPE type data:", data);
    
    toast({
      title: "PBM-type toegevoegd",
      description: `${data.name} is succesvol toegevoegd aan het systeem.`,
    });
    
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naam PBM-type</FormLabel>
              <FormControl>
                <Input placeholder="Bijv. Veiligheidshelm, Werkhandschoenen..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Omschrijving</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Omschrijf het type PBM..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inspectionInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Controle-interval (dagen)</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuleren
          </Button>
          <Button type="submit" className="bg-compliblue hover:bg-compliblue/90">
            PBM-type toevoegen
          </Button>
        </div>
      </form>
    </Form>
  );
};
