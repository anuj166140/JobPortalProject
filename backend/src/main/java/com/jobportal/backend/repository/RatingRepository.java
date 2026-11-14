package com.jobportal.backend.repository;

import com.jobportal.backend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByUser_IdAndJob_Id(Long userId, Long jobId);
    List<Rating> findByJob_Id(Long jobId);

    @Transactional
    void deleteByJob_Id(Long jobId);
}
