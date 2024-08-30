import Header from "@/components/header";
import Jobs from "@/components/jobs";
import JobsTable from "@/components/jobs-table";
import AddTask from "@/components/tasks/add-task";
import React from "react";

export default function Home() {
  return (
    <div>
      <Header />
      <Jobs />
      <JobsTable />
    </div>
  );
}
