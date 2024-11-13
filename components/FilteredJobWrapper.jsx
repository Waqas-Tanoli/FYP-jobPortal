"use client";

import { Suspense } from "react";
import FilteredJobs from "./FilteredJobs";

export default function FilteredJobsWrapper() {
  return (
    <Suspense fallback={<p>Loading jobs...</p>}>
      <FilteredJobs />
    </Suspense>
  );
}
