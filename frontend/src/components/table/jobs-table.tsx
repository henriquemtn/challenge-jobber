"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DefaultImage from "@/assets/not-found.png";
import { Camera, FilterIcon, ListChecks, MoreHorizontal } from "lucide-react";
import AddTask from "../tasks/add-task";
import DueTime from "../tasks/due-time";
import { Task } from "@/types/types";
import UpdateTask from "../tasks/edit-task";
import DeleteTask from "../tasks/delete-task";

export default function JobsTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get<Task[]>(
          "http://localhost:8000/api/tasks/"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const nameMatch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const statusMatch =
        statusFilter === "all" || task.status === statusFilter;
      const priorityMatch =
        priorityFilter === "all" || task.priority === priorityFilter;
      return nameMatch && statusMatch && priorityMatch;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  return (
    <div className="xl:max-w-[1260px] xl:mx-auto mx-4 mt-4 mb-10 px-4 md:p-4 border rounded-md">
      <div className="flex gap-2 items-center text-xl font-bold my-4">
        <ListChecks size={16} />
        Jobs
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex w-full items-center gap-4">
          <Input
            type="search"
            placeholder="Pesquisar Jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Todo">
                  Pendente
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Em andamento">
                  Em andamento
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Finalizado">
                  Finalizado
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Prioridade</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={priorityFilter}
                onValueChange={setPriorityFilter}
              >
                <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">Baixa</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Normal">
                  Média
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high">Alta</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="items-center gap-4 hidden md:flex">
          <AddTask />
        </div>
      </div>
      {/* Fim do Header */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="items-center justify-center hidden sm:flex mr-5">
              <Camera size={16} />
            </TableHead>
            <TableHead>Título</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Prazo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <img
                  src={
                    typeof task.image === "string"
                      ? task.image
                      : DefaultImage.src
                  }
                  alt={task.title}
                  width={40}
                  height={40}
                  className="rounded-md"
                  style={{ aspectRatio: "40/40", objectFit: "cover" }}
                />
              </TableCell>
              <TableCell className="font-medium break-words line-clamp-2 overflow-hidden p-0 m-4">
                {task.title}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant={
                    task.status === "Todo"
                      ? "pendente"
                      : task.status === "Em andamento"
                      ? "andamento"
                      : task.status === "Finalizado"
                      ? "finalizado"
                      : "default"
                  }
                >
                  {task.status === "Todo" ? "Pendente" : task.status}
                </Badge>
              </TableCell>
              <TableCell className="w-24">
                <DueTime due_date={task.due_date} />
              </TableCell>
              <TableCell className="px-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <UpdateTask taskId={task.id} />
                    <DeleteTask id={task.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
