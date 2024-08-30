import Header from "@/components/header";
import Jobs from "@/components/jobs";
import JobsTable from "@/components/jobs-table";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <Jobs />
      <JobsTable />
    </>
  );
}
