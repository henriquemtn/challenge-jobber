"use client";

import Header from "@/components/header";
import DeleteTask from "@/components/tasks/delete-task";
import UpdateTask from "@/components/tasks/edit-task";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/types";
import axios from "axios";
import { FileImage, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function JobPage({ params }: any) {
  const id = params.id;
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tasks/${id}`
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  if (!task) {
    return (
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col items-center gap-2">Not found</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-[1292px] mx-auto mt-28 px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Jobs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{task.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-4  border-[1px] rounded-md mt-4 p-4">
          <div className="flex flex-col">
            {task.image ? (
              <div className="w-full max-w-md h-[250px] overflow-hidden">
                <Image
                  src={task.image}
                  alt="Imagem da tarefa"
                  width={250}
                  height={250}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            ) : (
              <div className="max-h-[28rem] w-full max-w-md  bg-gray-200 flex items-center justify-center rounded-t-md">
                <FileImage size={32} />
              </div>
            )}
                        <div className="flex flex-row justify-between">
              <UpdateTask taskId={task.id} />
              <DeleteTask id={task.id} />
            </div>
           
          </div>
          <div key={task.id} className="md:px-4 flex flex-col justify-between">
            <div className="flex flex-col">
              <h2 className="font-bold text-lg">Título: {task.title}</h2>
              <p className="text-sm text-gray-600 mt-2 min-h-[80px]">
                Descrição: {task.description}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mt-1">
                Data de Criação:{" "}
                {task.created_at
                  ? new Date(task.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-[#5F33E2] mt-1">
                Data de Vencimento:{" "}
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString()
                  : "Nenhuma"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
