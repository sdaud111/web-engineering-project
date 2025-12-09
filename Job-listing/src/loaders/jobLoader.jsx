export const jobLoader = async ({ params }) => {
  console.log("Requested Job ID:", params.id);
  const res = await fetch(`http://localhost:5000/api/jobs/${params.id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch job");
  const job = await res.json();
  console.log("Job fetched:", job);
  return job;
};
