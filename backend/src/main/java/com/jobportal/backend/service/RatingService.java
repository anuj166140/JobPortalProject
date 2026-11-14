package com.jobportal.backend.service;

import com.jobportal.backend.entity.Job;
import com.jobportal.backend.entity.Rating;
import com.jobportal.backend.entity.User;
import com.jobportal.backend.repository.JobRepository;
import com.jobportal.backend.repository.RatingRepository;
import com.jobportal.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public RatingService(RatingRepository ratingRepository,
                         UserRepository userRepository,
                         JobRepository jobRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public Rating addOrUpdateRating(Long userId, Long jobId, Integer ratingValue, String feedback) {
        if (ratingValue == null || ratingValue < 1 || ratingValue > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        Optional<Rating> existing = ratingRepository.findByUser_IdAndJob_Id(userId, jobId);
        if (existing.isPresent()) {
            Rating rating = existing.get();
            rating.setRating(ratingValue);
            rating.setFeedback(feedback);
            // keep company/jobRole in sync in case job details changed
            Job job = jobRepository.findById(jobId).orElse(null);
            if (job != null) {
                rating.setCompany(job.getCompany());
                rating.setJobRole(job.getTitle());
            }
            return ratingRepository.save(rating);
        } else {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));
            Rating rating = new Rating(user, job, ratingValue, feedback);
            return ratingRepository.save(rating);
        }
    }

    public Map<String, Object> getJobRatingSummary(Long jobId) {
        List<Rating> ratings = ratingRepository.findByJob_Id(jobId);
        int total = ratings.size();
        double avg = 0.0;
        if (total > 0) {
            double sum = ratings.stream().mapToInt(Rating::getRating).sum();
            avg = Math.round((sum / total) * 10.0) / 10.0;
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("averageRating", avg);
        summary.put("totalRatings", total);
        summary.put("ratings", ratings);
        return summary;
    }

    public Optional<Rating> getUserRatingForJob(Long userId, Long jobId) {
        return ratingRepository.findByUser_IdAndJob_Id(userId, jobId);
    }
}
