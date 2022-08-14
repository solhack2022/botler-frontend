import useSWR from "swr";
import { Job } from "./types";

function fetchjobs() {
  const jobs: Job[] = require("./MockJobs.json");

  return jobs;
}

export function useJobs() {
  const { data } = useSWR("/jobs", fetchjobs);

  return { data };
}
