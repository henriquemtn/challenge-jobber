import Header from "@/components/header";
import JobsDestacados from "@/components/jobs-destacados";
import JobsTable from "@/components/table/jobs-table";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <JobsDestacados />
      <JobsTable />
    </>
  );
}
