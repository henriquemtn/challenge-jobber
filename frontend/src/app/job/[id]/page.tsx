"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/types/types";
import axios from "axios";
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
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-[160px] h-[260px] rounded-md" />
          <Skeleton className="w-[160px] h-[14px] rounded-md" />
          <Skeleton className="w-[160px] h-[12px] rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="space-y-4">
        <div key={task.id} className="border p-4 rounded-md shadow-md">
          <h2 className="font-bold text-lg">Título: {task.title}</h2>
          <p className="text-sm text-gray-600 mt-2">
            Descrição: {task.description}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Data de Criação:{" "}
            {task.created_at
              ? new Date(task.created_at).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Data de Vencimento:{" "}
            {task.due_date
              ? new Date(task.due_date).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
