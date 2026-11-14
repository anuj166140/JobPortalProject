package com.jobportal.backend.service;

import org.springframework.stereotype.Service;

import com.jobportal.backend.entity.Application;
import com.jobportal.backend.entity.User;
import com.jobportal.backend.entity.Job;

import com.jobportal.backend.repository.ApplicationRepository;
import com.jobportal.backend.repository.UserRepository;
import com.jobportal.backend.repository.JobRepository;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobRepository jobRepository) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;

    }


    public Application saveApplication(
        Application application){

    Long userId =
        application.getUser().getId();

    Long jobId =
        application.getJob().getId();


    User user =
        userRepository
        .findById(userId)
        .orElseThrow();



    Job job =
        jobRepository
        .findById(jobId)
        .orElseThrow();


    application.setUser(user);
    application.setJob(job);



    application.setApplicantName(
            user.getName()
    );

    application.setEmail(
            user.getEmail()
    );

    application.setJobTitle(
            job.getTitle()
    );

    application.setCompany(
            job.getCompany()
    );

   

    if(application.getStatus()==null){

        application.setStatus("PENDING");

    }

    return applicationRepository
            .save(application);

}
// UPDATE STATUS

public Application updateStatus(
        Long id,
        String status){

    Application app =
        applicationRepository
        .findById(id)
        .orElseThrow();

    app.setStatus(status);

    return applicationRepository.save(app);

}


    public List<Application> getAllApplications(){

        return applicationRepository.findAll();

    }

}