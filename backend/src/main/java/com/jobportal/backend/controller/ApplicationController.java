package com.jobportal.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.jobportal.backend.entity.Application;
import com.jobportal.backend.service.ApplicationService;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")

public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;

    }



    @PostMapping({"", "/apply"})

    public Application applyJob(
            @RequestBody Application application){

        return applicationService
                .saveApplication(application);

    }

 

    @GetMapping({"", "/all"})

    public List<Application> getAllApplications(){

        return applicationService
                .getAllApplications();

    }

  

    @PutMapping("/{id}/status")

    public Application updateStatus(

            @PathVariable Long id,

            @RequestParam String status){

        return applicationService
                .updateStatus(id,status);

    }

}