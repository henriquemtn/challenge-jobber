import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Task } from "@/types/types";
import Image from "next/image";
import { FileImage } from "lucide-react";

export default function ViewTask({
  title,
  description,
  created_at,
  image,
  due_date,
}: Task) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Make changes to your task here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
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
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </>
  );
}
