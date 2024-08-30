"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "@/types/types";
import Job from "./job";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

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
    <div className="max-w-[1292px] mx-auto px-4 mt-6">
      <h1 className="font-bold mb-2">Jobs Destacados 📌</h1>
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
