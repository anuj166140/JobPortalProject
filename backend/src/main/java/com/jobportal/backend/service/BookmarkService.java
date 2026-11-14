package com.jobportal.backend.service;

import com.jobportal.backend.entity.Bookmark;
import com.jobportal.backend.entity.Job;
import com.jobportal.backend.entity.User;
import com.jobportal.backend.repository.BookmarkRepository;
import com.jobportal.backend.repository.JobRepository;
import com.jobportal.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository,
                           UserRepository userRepository,
                           JobRepository jobRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public boolean toggleBookmark(Long userId, Long jobId) {
        Optional<Bookmark> existing = bookmarkRepository.findByUser_IdAndJob_Id(userId, jobId);
        if (existing.isPresent()) {
            bookmarkRepository.delete(existing.get());
            return false;
        } else {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));
            Bookmark bookmark = new Bookmark(user, job);
            bookmarkRepository.save(bookmark);
            return true;
        }
    }

    public boolean isBookmarked(Long userId, Long jobId) {
        return bookmarkRepository.existsByUser_IdAndJob_Id(userId, jobId);
    }

    public List<Bookmark> getUserBookmarks(Long userId) {
        return bookmarkRepository.findByUser_Id(userId);
    }
}
