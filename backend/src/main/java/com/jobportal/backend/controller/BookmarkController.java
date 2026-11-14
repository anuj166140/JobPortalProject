package com.jobportal.backend.controller;

import com.jobportal.backend.entity.Bookmark;
import com.jobportal.backend.service.BookmarkService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookmarks")
@CrossOrigin(origins = "http://localhost:3000")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @PostMapping("/toggle")
    public Map<String, Object> toggleBookmark(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long jobId = Long.valueOf(payload.get("jobId").toString());
        boolean isBookmarked = bookmarkService.toggleBookmark(userId, jobId);

        Map<String, Object> res = new HashMap<>();
        res.put("bookmarked", isBookmarked);
        res.put("message", isBookmarked ? "Job bookmarked successfully" : "Bookmark removed");
        return res;
    }

    @GetMapping("/check")
    public Map<String, Object> checkBookmark(@RequestParam Long userId, @RequestParam Long jobId) {
        boolean isBookmarked = bookmarkService.isBookmarked(userId, jobId);
        Map<String, Object> res = new HashMap<>();
        res.put("bookmarked", isBookmarked);
        return res;
    }

    @GetMapping("/user/{userId}")
    public List<Bookmark> getUserBookmarks(@PathVariable Long userId) {
        return bookmarkService.getUserBookmarks(userId);
    }
}
