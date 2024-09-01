"use client";

import Header from "@/components/header";
import DueTime from "@/components/tasks/due-time";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Task } from "@/types/types";
import axios from "axios";
import { FileImage } from "lucide-react";
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
      <div className="max-w-[1292px] mx-auto mt-4 px-4">
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
          {task.image ? (
            <div className="w-[250px] h-[250px] overflow-hidden">
              <Image
                src={task.image}
                alt="Imagem da tarefa"
                width={250}
                height={250}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          ) : (
            <div className="h-[200px] w-full bg-gray-200 flex items-center justify-center rounded-t-md">
              <FileImage size={32} />
            </div>
          )}
          <div key={task.id} className="px-4 flex flex-col justify-between">
            <h2 className="font-bold text-lg">Título: {task.title}</h2>
            <p className="text-sm text-gray-600 mt-2 min-h-[80px]">
              Descrição: {task.description}
            </p>
            <div>
              <p className="text-sm text-gray-500 mt-1">
                Data de Criação:{" "}
                {task.created_at
                  ? new Date(task.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
              <div className="flex gap-2">
                <p className="text-sm text-gray-500 mt-1">
                  Data de Vencimento:{" "}
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : "N/A"}
                </p>
                <DueTime due_date={task.due_date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
