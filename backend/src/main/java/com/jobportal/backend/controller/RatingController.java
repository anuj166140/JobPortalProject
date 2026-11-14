package com.jobportal.backend.controller;

import com.jobportal.backend.entity.Rating;
import com.jobportal.backend.service.RatingService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "http://localhost:3000")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public Map<String, Object> rateJob(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long jobId = Long.valueOf(payload.get("jobId").toString());
        Integer rating = Integer.valueOf(payload.get("rating").toString());
        String feedback = payload.get("feedback") != null ? payload.get("feedback").toString() : null;

        Rating savedRating = ratingService.addOrUpdateRating(userId, jobId, rating, feedback);
        Map<String, Object> summary = ratingService.getJobRatingSummary(jobId);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Rating submitted successfully");
        res.put("userRating", savedRating.getRating());
        res.put("averageRating", summary.get("averageRating"));
        res.put("totalRatings", summary.get("totalRatings"));
        return res;
    }

    @GetMapping("/job/{jobId}")
    public Map<String, Object> getJobRating(@PathVariable Long jobId) {
        return ratingService.getJobRatingSummary(jobId);
    }

    @GetMapping("/check")
    public Map<String, Object> checkUserRating(@RequestParam Long userId, @RequestParam Long jobId) {
        Optional<Rating> userRating = ratingService.getUserRatingForJob(userId, jobId);
        Map<String, Object> res = new HashMap<>();
        if (userRating.isPresent()) {
            res.put("rated", true);
            res.put("rating", userRating.get().getRating());
            res.put("feedback", userRating.get().getFeedback());
        } else {
            res.put("rated", false);
            res.put("rating", 0);
        }
        return res;
    }
}
