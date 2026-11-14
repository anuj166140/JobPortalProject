package com.jobportal.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name="applications")

public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // USER

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    // JOB

    @ManyToOne
    @JoinColumn(name="job_id")
    private Job job;

    // EXTRA DATA

    @Column(name="applicant_name")
    private String applicantName;

    @Column(name="email")
    private String email;

    @Column(name="job_title")
    private String jobTitle;

    @Column(name="company")
    private String company;

    // NEW FIELD

    @Column(name="status")
    private String status = "PENDING";

    public Application(){}

    // GETTERS & SETTERS

    public Long getId(){ return id; }
    public void setId(Long id){ this.id=id; }

    public User getUser(){ return user; }
    public void setUser(User user){ this.user=user; }

    public Job getJob(){ return job; }
    public void setJob(Job job){ this.job=job; }

    public String getApplicantName(){ return applicantName; }
    public void setApplicantName(String applicantName){
        this.applicantName=applicantName;
    }

    public String getEmail(){ return email; }
    public void setEmail(String email){
        this.email=email;
    }

    public String getJobTitle(){ return jobTitle; }
    public void setJobTitle(String jobTitle){
        this.jobTitle=jobTitle;
    }

    public String getCompany(){ return company; }
    public void setCompany(String company){
        this.company=company;
    }

    public String getStatus(){ return status; }
    public void setStatus(String status){
        this.status=status;
    }

}