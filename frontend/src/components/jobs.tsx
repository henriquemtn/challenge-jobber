'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FilePenIcon, TrashIcon } from "lucide-react";
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  created_at: string;
  description: string;
  image: string | null;
  due_date: string | null;
  owner: number;
}

export default function Jobs() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks/');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Jobs</CardTitle>
        <CardDescription>Manage your job postings.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="hidden md:table-cell">Due</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>
                  <img
                    src={task.image || '/placeholder.svg'}
                    alt="Task Image"
                    width={64}
                    height={64}
                    className="aspect-square rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell className="hidden md:table-cell">{task.description}</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(task.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="hidden md:table-cell">{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
