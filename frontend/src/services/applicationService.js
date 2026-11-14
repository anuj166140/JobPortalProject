

export const saveApplication = (job) => {

  let applications =
    JSON.parse(
      localStorage.getItem("applications")
    ) || [];

  applications.push({
    id: Date.now(),
    job: job.title,
    company: job.company,
    status: "Pending"
  });

  localStorage.setItem(
    "applications",
    JSON.stringify(applications)
  );

};



export const getApplications = () => {

  return JSON.parse(
    localStorage.getItem("applications")
  ) || [];

};