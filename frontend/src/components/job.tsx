import { Task } from "@/types/types";
import { Calendar, FileImage } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { CarouselItem } from "./ui/carousel";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import DueTime from "./tasks/due-time";

export default function Job({
  title,
  description,
  created_at,
  image,
  due_date,
}: Task) {
  return (
    <CarouselItem className="pl-1 min-[420px]:basis-1/2 md:basis-1/3 lg:basis-1/5 hover:cursor-pointer">
      <div className="p-0 md:p-1">
        <Card className="flex flex-col justify-between h-[345px]">
          {image ? (
            <div className="w-full h-[200px] overflow-hidden">
              <Image
                src={image}
                alt="Imagem da tarefa"
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
                className="object-cover w-full h-full rounded-t-md"
              />
            </div>
          ) : (
            <div className="h-[200px] w-full bg-gray-200 flex items-center justify-center rounded-t-md">
              <FileImage size={32} />
            </div>
          )}
          <CardContent className="p-3 flex flex-col h-[150px] justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold line-clamp-1">{title}</h1>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {description}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-full bg-slate-200 h-[1px] my-2" />
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <Calendar color="#5F33E2" size={14} />
                  <p className="text-[12px] text-[#5F33E2] font-medium">
                    {format(new Date(created_at), "dd/MM/yyyy")}
                  </p>
                </div>
                {due_date && (
                  <div className="flex gap-1 items-center">
                    <DueTime due_date={due_date} />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
