"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const MAX_FILE_SIZE = 1024 * 1024 * 16;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Definindo o schema de validação com Zod
const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  due_date: z.date().optional(),
  image: z.any().optional(),
});

export default function AddTask() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const formData = new FormData();

    // Adiciona os campos ao formData
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append(
      "due_date",
      values.due_date ? format(values.due_date, "yyyy-MM-dd") : ""
    );

    // Adiciona o campo owner
    formData.append("owner", "1");

    // Se o campo de imagem contiver um arquivo, adicione-o ao formData
    if (values.image instanceof File) {
      if (values.image.size > MAX_FILE_SIZE) {
        alert("Max image size is 16MB.");
        return;
      }
      if (!ACCEPTED_IMAGE_MIME_TYPES.includes(values.image.type)) {
        alert("Only .jpg, .jpeg, .png, and .webp formats are supported.");
        return;
      }
      formData.append("image", values.image);
    }

    try {
      // Envia o formulário para a API
      const response = await axios.post(
        "http://localhost:8000/api/tasks/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Task added successfully", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1" variant="default">
          <PlusCircle width={16} height={16}/>
          Adicionar um Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar um novo Job</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título" {...field} />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={ACCEPTED_IMAGE_MIME_TYPES.join(",")}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.onChange(file); // Atualiza o valor do campo com o arquivo selecionado
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de entrega</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Escolha a data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enviar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
