"use client";

import { useState, useEffect } from "react";
import { getJobs } from "@/lib/db/jobs";
import { JobInfo } from "@/types";
import { JobCard } from "@/components/cards/JobCard";
import { PageTitle } from "@/components/common/Titles";
import { FilterTabs } from "@/components/common/FilterTabs";
import { EmptyState } from "@/components/common/EmptyState";

const JOB_TYPES = ["전체", "채용", "인턴십", "특강", "설명회", "공모전"];

export default function JobsPage() {
  const [activeType, setActiveType] = useState("전체");
  const [jobs, setJobs] = useState<JobInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredJobs = jobs.filter(
    (job) => activeType === "전체" || job.type === activeType
  );
    (job) => activeType === "전체" || job.type === activeType
  );

  return (
    <div className="space-y-6">
      <PageTitle>취업 정보</PageTitle>
      
      <FilterTabs 
        tabs={JOB_TYPES} 
        activeTab={activeType} 
        onChange={setActiveType} 
      />

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState message="해당 유형의 취업/행사 정보가 없습니다." />
      )}
    </div>
  );
}
