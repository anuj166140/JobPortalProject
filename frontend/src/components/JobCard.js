import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job, applyJob }) {
  if (!job) return null;

  return (
    <div className="job-card job-card-modern">
      <div className="job-card-header">
        <div className="job-card-title-group">
          <h3 className="job-card-title">{job.title}</h3>
          <span className="job-card-company">{job.company}</span>
        </div>
        <div className="job-company-avatar">
          {job.company ? job.company.charAt(0).toUpperCase() : "J"}
        </div>
      </div>

      <div className="job-card-meta">
        {job.location && (
          <span className="job-meta-pill">
            <span role="img" aria-label="location">📍</span> {job.location}
          </span>
        )}
        {job.salary && (
          <span className="job-meta-pill job-salary-pill">
            <span role="img" aria-label="salary">💰</span> ₹{job.salary}
          </span>
        )}
      </div>

      <div className="job-card-body">
        <h4 className="job-desc-title">Job Description:</h4>
        <p className="job-card-description">
          {job.description || "No description provided for this job."}
        </p>
      </div>

      <div className="job-card-footer">
        <Link to={`/job/${job.id}`} className="job-view-btn">
          View Details
        </Link>
        <button
          className="job-apply-btn"
          onClick={() => applyJob(job.id)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;