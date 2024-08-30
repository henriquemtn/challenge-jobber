import Header from "@/components/header";
import Jobs from "@/components/jobs";
import JobsTable from "@/components/jobs-table";
import AddTask from "@/components/tasks/add-task";
import React from "react";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col max-w-[1292px] mx-auto py-6 px-4">
        <h2 className="text-[22px] font-bold">Olá, Henrique</h2>
        <p className="text-[14px] mb-2">
          Você tem <span className="text-[#5F33E2] font-bold">05</span> Jobs
          hoje
        </p>
      </div>
      <Jobs />
      <JobsTable />
    </div>
  );
}
