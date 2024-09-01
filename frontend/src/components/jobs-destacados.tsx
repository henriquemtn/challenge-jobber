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

export default function JobsDestacados() {
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
    <div className="max-w-[1292px] mx-auto px-3 mt-4">
      <h1 className="md:text-[20px] font-bold mb-3">Jobs Destacados 📌</h1>
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
