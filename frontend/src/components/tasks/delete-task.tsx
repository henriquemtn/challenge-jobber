"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteTask {
    id: number
}

export default function DeleteTask({id}: DeleteTask) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/');
  };

  const handleDeleteTask = async () => {
    try {
        const response = await axios.delete(
          `http://localhost:8000/api/tasks/${id}/`,
        );
        console.log("Task deleted successfully", response.data);
        toast.success("Tarefa deletada com sucesso!");
        handleNavigate()

      } catch (error) {
        toast.error("Houve um erro ao tentar deletar essa tarefa.");
        console.log(error)
      }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm p-2 cursor-pointer hover:bg-slate-200 w-full text-left">Deletar task</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que quer excluir?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
            tarefa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTask} className="bg-red-500 hover:bg-red-600">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
