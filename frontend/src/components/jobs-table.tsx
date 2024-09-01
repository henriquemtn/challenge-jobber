"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Camera, File, FileImage, ListFilter, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import AddTask from "./tasks/add-task";
import { Task } from "@/types/types";
import axios from "axios";
import { format } from "date-fns";
import DeleteTask from "./tasks/delete-task";
import UpdateTask from "./tasks/edit-task";
import DueTime from "./tasks/due-time";
import { useRouter } from "next/navigation";

export default function JobsTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/job/${id}`);
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks/");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:p-0 md:gap-8 max-w-[1260px] mx-auto mt-4">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row justify-between">
                <div className="flex-col w-3/4">
                  <CardTitle>Jobs</CardTitle>
                  <CardDescription className="pt-4 md:pt-2">
                    Gerencie todos os seus Jobs em um só lugar, aqui você altera
                    e remove jobs criados.
                  </CardDescription>
                </div>
                <AddTask />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="items-center justify-center hidden sm:flex w-[100px]">
                      <Camera size={16} />
                    </TableHead>
                    <TableHead>Titulo</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Descrição
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Lançamento
                    </TableHead>
                    <TableHead className="table-cell">Prazo</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell
                        onClick={() => handleNavigate(task.id)}
                        className="hidden sm:table-cell  cursor-pointer"
                      >
                        {task.image ? (
                          <Image
                            alt="Task image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={task.image}
                            width="64"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                            <FileImage size={22} />
                          </div>
                        )}
                      </TableCell>
                      <TableCell
                        onClick={() => handleNavigate(task.id)}
                        className="font-medium cursor-pointer"
                      >
                        <p className="break-all line-clamp-1">{task.title}</p>
                      </TableCell>
                      <TableCell
                        onClick={() => handleNavigate(task.id)}
                        className="hidden md:table-cell cursor-pointer"
                      >
                        <p className="break-all line-clamp-1">
                          {task.description}
                        </p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {task.created_at
                          ? format(new Date(task.created_at), "dd/MM/yyyy")
                          : ""}
                      </TableCell>
                      <TableCell className="table-cell">
                        <DueTime due_date={task.due_date} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <UpdateTask taskId={task.id} />
                            <DeleteTask id={task.id} />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Mostrando{" "}
                <strong className="text-[#5F33E2]">{tasks.length}</strong> de{" "}
                <strong>{tasks.length}</strong> Jobs
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
