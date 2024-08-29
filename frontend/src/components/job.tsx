import { Task } from "@/types/types";
import { Calendar, CalendarClock, FileImage } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { CarouselItem } from "./ui/carousel";

export default function Job({
  title,
  description,
  created_at,
  image,
  due_date,
  owner,
}: Task) {
  return (
    <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/5 hover:cursor-pointer">
      <div className="p-1">
        <Card className="flex flex-col">
          {image ? (
            <div className="w-full h-[200px] overflow-hidden">
              <Image
                src={image}
                alt="Imagem da tarefa"
                width={350}
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
          <CardContent className="p-4 flex-1">
            <h1 className="font-bold">{title}</h1>
            <p className="text-sm text-gray-600 min-h-[60px] mt-2">
              Descrição: {description}
            </p>

            <div className="w-full bg-slate-200 h-[1px] my-2" />

            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <Calendar size={14} />
                <p className="text-[12px] text-gray-500">
                  {new Date(created_at).toLocaleDateString()}
                </p>
              </div>
              {due_date && (
                <div className="flex gap-1 items-center">
                  <CalendarClock size={14} />
                  <p className="text-xs text-gray-500">
                    {new Date(due_date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
