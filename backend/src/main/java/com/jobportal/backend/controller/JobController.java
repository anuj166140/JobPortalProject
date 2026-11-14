package com.jobportal.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.jobportal.backend.entity.Job;
import com.jobportal.backend.service.JobService;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")

@CrossOrigin(origins = "http://localhost:3000")

public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {

        this.jobService = jobService;

    }

    // ADD JOB

    @PostMapping

    public Job addJob(
            @RequestBody Job job){

        return jobService.saveJob(job);

    }

    // GET ALL JOBS

    @GetMapping

    public List<Job> getAllJobs(){

        return jobService.getAllJobs();

    }
    @DeleteMapping("/{id}")

public void deleteJob(
        @PathVariable Long id){

    jobService.deleteJob(id);

}
// UPDATE JOB

@PutMapping("/{id}")

public Job updateJob(
        @PathVariable Long id,
        @RequestBody Job job){

    return jobService.updateJob(id, job);

}
// GET JOB BY ID

@GetMapping("/{id}")

public Job getJobById(
        @PathVariable Long id){

    return jobService.getJobById(id);

}
}
// DELETE JOB

