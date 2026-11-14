package com.jobportal.backend.repository;

import com.jobportal.backend.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByUser_IdAndJob_Id(Long userId, Long jobId);
    boolean existsByUser_IdAndJob_Id(Long userId, Long jobId);
    List<Bookmark> findByUser_Id(Long userId);

    @Transactional
    void deleteByUser_IdAndJob_Id(Long userId, Long jobId);

    @Transactional
    void deleteByJob_Id(Long jobId);
}
