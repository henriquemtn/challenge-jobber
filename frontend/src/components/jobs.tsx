"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "@/types/types";
import Job from "./job";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

export default function Jobs() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
    <div className="max-w-[1260px] mx-auto px-4">
      <h1 className="font-bold mb-2">Tarefas Destacadas 📌</h1>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {tasks.map((task) => (
            <Job key={task.id} {...task} />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
