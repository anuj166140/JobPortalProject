package com.jobportal.backend.service;

import org.springframework.stereotype.Service;

import com.jobportal.backend.entity.Job;
import com.jobportal.backend.repository.JobRepository;
import com.jobportal.backend.repository.ApplicationRepository;
import com.jobportal.backend.repository.BookmarkRepository;
import com.jobportal.backend.repository.RatingRepository;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final BookmarkRepository bookmarkRepository;
    private final RatingRepository ratingRepository;

    public JobService(
            JobRepository jobRepository,
            ApplicationRepository applicationRepository,
            BookmarkRepository bookmarkRepository,
            RatingRepository ratingRepository) {

        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.ratingRepository = ratingRepository;

    }

    // SAVE JOB

    public Job saveJob(Job job){

        return jobRepository.save(job);

    }

    // GET ALL JOBS

    public List<Job> getAllJobs(){

        return jobRepository.findAll();

    }

    // DELETE JOB (SAFE VERSION)

    public void deleteJob(Long id){

        System.out.println("Deleting job ID: " + id);

        // Delete related applications, bookmarks, and ratings

        applicationRepository.deleteByJob_Id(id);
        bookmarkRepository.deleteByJob_Id(id);
        ratingRepository.deleteByJob_Id(id);

        // Delete job

        jobRepository.deleteById(id);

        System.out.println("Job deleted successfully");

    }

    // UPDATE JOB

    public Job updateJob(Long id, Job job){

        Job existingJob =
                jobRepository
                .findById(id)
                .orElseThrow();

        existingJob.setTitle(job.getTitle());
        existingJob.setCompany(job.getCompany());
        existingJob.setLocation(job.getLocation());
        existingJob.setSalary(job.getSalary());
        existingJob.setDescription(job.getDescription());

        return jobRepository.save(existingJob);

    }

    // GET JOB BY ID

    public Job getJobById(Long id){

        return jobRepository
                .findById(id)
                .orElseThrow();

    }

}