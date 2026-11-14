import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Banknote,
  Briefcase,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Bookmark,
  Info,
  Sparkles,
  Star,
  MessageSquare
} from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  // Bookmark states
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // Rating states
  const [ratingSummary, setRatingSummary] = useState({
    averageRating: 0,
    totalRatings: 0,
    ratings: []
  });
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [ratingSubmitting, setRatingSubmitting] = useState(false);

  // Get current logged-in user safely
  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  };

  // Fetch rating summary
  const fetchRatingSummary = useCallback(() => {
    API.get(`/ratings/job/${id}`)
      .then(res => {
        if (res.data) {
          setRatingSummary({
            averageRating: res.data.averageRating || 0,
            totalRatings: res.data.totalRatings || 0,
            ratings: res.data.ratings || []
          });
        }
      })
      .catch(err => {
        console.error("Error fetching rating summary:", err);
      });
  }, [id]);

  // Load Job and initial states
  useEffect(() => {
    setLoading(true);
    const user = getCurrentUser();

    // 1. Fetch Job
    API.get(`/jobs/${id}`)
      .then(res => {
        setJob(res.data);
      })
      .catch(err => {
        console.error("Error fetching job details:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    // 2. Fetch Rating Summary
    fetchRatingSummary();

    // 3. Check Bookmark & User's existing Rating if logged in
    if (user && user.id) {
      API.get(`/bookmarks/check?userId=${user.id}&jobId=${id}`)
        .then(res => {
          setIsBookmarked(!!res.data.bookmarked);
        })
        .catch(err => {
          console.error("Error checking bookmark:", err);
        });

      API.get(`/ratings/check?userId=${user.id}&jobId=${id}`)
        .then(res => {
          if (res.data && res.data.rated) {
            setUserRating(res.data.rating || 0);
            if (res.data.feedback) {
              setFeedback(res.data.feedback);
            }
          }
        })
        .catch(err => {
          console.error("Error checking user rating:", err);
        });
    }
  }, [id, fetchRatingSummary]);

  // Handle Apply Job
  const handleApply = () => {
    const user = getCurrentUser();

    if (!user || !user.id) {
      alert("Please login first to apply for this job.");
      navigate("/login");
      return;
    }

    setApplying(true);

    const application = {
      user: { id: user.id },
      job: { id: job.id },
      applicantName: user.name || user.email || "Applicant",
      email: user.email,
      jobTitle: job.title,
      company: job.company,
      status: "PENDING"
    };

    API.post("/applications/apply", application)
      .then(() => {
        setApplied(true);
        alert("🎉 Application Submitted Successfully!");
        navigate("/applications");
      })
      .catch(err => {
        console.error("Failed to apply:", err);
        alert("Failed to submit application. Please try again.");
      })
      .finally(() => {
        setApplying(false);
      });
  };

  // Handle Toggle Bookmark (Saved in Database)
  const handleToggleBookmark = () => {
    const user = getCurrentUser();

    if (!user || !user.id) {
      alert("Please login first to bookmark jobs.");
      navigate("/login");
      return;
    }

    setBookmarkLoading(true);
    API.post("/bookmarks/toggle", {
      userId: user.id,
      jobId: job.id
    })
      .then(res => {
        const bookmarked = !!res.data.bookmarked;
        setIsBookmarked(bookmarked);
        alert(bookmarked ? "✅ Job saved to your database bookmarks!" : "Bookmark removed from database.");
      })
      .catch(err => {
        console.error("Bookmark toggle failed:", err);
        alert("Failed to update bookmark.");
      })
      .finally(() => {
        setBookmarkLoading(false);
      });
  };

  // Handle Submit Rating (Saved in Database)
  const handleSubmitRating = (e) => {
    e.preventDefault();
    const user = getCurrentUser();

    if (!user || !user.id) {
      alert("Please login first to rate this job.");
      navigate("/login");
      return;
    }

    if (userRating < 1 || userRating > 5) {
      alert("Please select a star rating from 1 to 5.");
      return;
    }

    setRatingSubmitting(true);
    API.post("/ratings", {
      userId: user.id,
      jobId: job.id,
      rating: userRating,
      feedback: feedback.trim()
    })
      .then(res => {
        alert("⭐ Thank you! Your rating has been saved to the database.");
        fetchRatingSummary();
      })
      .catch(err => {
        console.error("Rating submission error:", err);
        alert("Failed to save rating to database.");
      })
      .finally(() => {
        setRatingSubmitting(false);
      });
  };

  // Handle Share Job
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${job.title} at ${job.company}`,
          text: `Check out this job opportunity on Naukri Point!`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="page-layout">
        <Navbar />
        <div className="page-content-grow" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontWeight: "600", color: "#2563eb", marginBottom: "10px" }}>Loading job details...</div>
            <p style={{ color: "#64748b" }}>Please wait while we fetch the latest information.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="page-layout">
        <Navbar />
        <div className="page-content-grow" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "16px", border: "1px solid #e2e8f0", maxWidth: "500px" }}>
            <h2 style={{ color: "#0f172a", marginBottom: "12px" }}>Job Not Found</h2>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>The position you are looking for may have expired or been removed.</p>
            <Link to="/jobs" className="job-details-back-btn" style={{ margin: "0 auto", display: "inline-flex" }}>
              <ArrowLeft size={16} /> Browse Available Jobs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const companyInitial = job.company ? job.company.charAt(0).toUpperCase() : "N";

  return (
    <div className="page-layout">
      <Navbar />

      <main className="page-content-grow">
        <div className="job-details-wrapper">
          {/* Back Navigation */}
          <Link to="/jobs" className="job-details-back-btn">
            <ArrowLeft size={18} />
            <span>Back to All Jobs</span>
          </Link>

          {/* Header Banner Card */}
          <section className="job-details-header-card">
            <div className="job-details-header-top">
              <div className="job-details-avatar">
                {companyInitial}
              </div>

              <div className="job-details-title-info">
                <div className="job-details-badges-row">
                  <span className="job-badge-verified">
                    <ShieldCheck size={14} /> Verified Employer
                  </span>
                  <span className="job-badge-type">
                    <Sparkles size={14} /> Actively Hiring
                  </span>

                  {/* Rating Badge in Header */}
                  {ratingSummary.totalRatings > 0 && (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "#fef9c3",
                      color: "#854d0e",
                      fontWeight: "700",
                      fontSize: "13px",
                      padding: "4px 10px",
                      borderRadius: "6px"
                    }}>
                      <Star size={14} fill="#eab308" color="#eab308" />
                      {ratingSummary.averageRating} ({ratingSummary.totalRatings} {ratingSummary.totalRatings === 1 ? "review" : "reviews"})
                    </span>
                  )}
                </div>

                <h1 className="job-details-title">{job.title}</h1>

                <div className="job-details-company-name">
                  <Building2 size={18} />
                  <span>{job.company}</span>
                </div>
              </div>
            </div>

            {/* Quick Highlights Bar */}
            <div className="job-details-highlights-grid">
              <div className="job-highlight-item">
                <div className="job-highlight-icon">
                  <Banknote size={22} />
                </div>
                <div>
                  <div className="job-highlight-label">Offered Salary</div>
                  <div className="job-highlight-value">
                    {job.salary ? `₹${job.salary}` : "Competitive Pay"}
                  </div>
                </div>
              </div>

              <div className="job-highlight-item">
                <div className="job-highlight-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="job-highlight-label">Location</div>
                  <div className="job-highlight-value">{job.location || "Flexible"}</div>
                </div>
              </div>

              <div className="job-highlight-item">
                <div className="job-highlight-icon">
                  <Briefcase size={22} />
                </div>
                <div>
                  <div className="job-highlight-label">Employment Type</div>
                  <div className="job-highlight-value">Full-Time</div>
                </div>
              </div>

              <div className="job-highlight-item">
                <div className="job-highlight-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="job-highlight-label">Experience</div>
                  <div className="job-highlight-value">Relevant Experience</div>
                </div>
              </div>
            </div>
          </section>

          {/* Two-Column Body Layout */}
          <div className="job-details-columns">
            {/* Left Main Column */}
            <div className="job-details-main-content">
              {/* Detailed Description */}
              <section className="job-section-card">
                <div className="job-section-header">
                  <Briefcase size={22} className="job-section-header-icon" />
                  <h3>Role Overview & Description</h3>
                </div>
                <p className="job-description-text">
                  {job.description || "Join our team to contribute towards innovative projects and scale impactful products. You will collaborate directly with cross-functional leaders to design and deliver reliable outcomes."}
                </p>
              </section>

              {/* Responsibilities */}
              <section className="job-section-card">
                <div className="job-section-header">
                  <CheckCircle2 size={22} className="job-section-header-icon" />
                  <h3>Key Responsibilities</h3>
                </div>
                <ul className="job-points-list">
                  <li className="job-point-item">
                    <CheckCircle2 size={18} className="job-point-icon" />
                    <span>Collaborate with product, design, and engineering stakeholders to execute high-impact deliverables.</span>
                  </li>
                  <li className="job-point-item">
                    <CheckCircle2 size={18} className="job-point-icon" />
                    <span>Maintain strong quality standards, clean design patterns, and documentation for all tasks.</span>
                  </li>
                  <li className="job-point-item">
                    <CheckCircle2 size={18} className="job-point-icon" />
                    <span>Identify opportunities for continuous improvement, automation, and operational efficiency.</span>
                  </li>
                  <li className="job-point-item">
                    <CheckCircle2 size={18} className="job-point-icon" />
                    <span>Participate actively in regular reviews, team meetings, and strategic roadmap planning.</span>
                  </li>
                </ul>
              </section>

              {/* Requirements & Qualifications */}
              <section className="job-section-card">
                <div className="job-section-header">
                  <ShieldCheck size={22} className="job-section-header-icon" />
                  <h3>Requirements & Qualifications</h3>
                </div>
                <ul className="job-points-list">
                  <li className="job-point-item">
                    <CheckCircle2 size={18} className="job-point-icon" />
                    <span>Demonstrated knowledge and experience matching the {job.title} job profile.</span>
                  </li>
                  <li className="job-point-item">
                    <CheckCircle2 size={18} className="job-point-icon" />
                    <span>Strong communication, problem-solving, and analytical capabilities.</span>
                  </li>
                  <li className="job-point-item">
                    <CheckCircle2 size={18} className="job-point-icon" />
                    <span>Ability to work effectively both independently and within agile collaborative teams.</span>
                  </li>
                  <li className="job-point-item">
                    <CheckCircle2 size={18} className="job-point-icon" />
                    <span>Commitment to delivering reliable, customer-centric results in a fast-paced environment.</span>
                  </li>
                </ul>
              </section>

              {/* STAR RATING & REVIEWS SECTION */}
              <section className="rating-section-card">
                <div className="rating-header-summary">
                  <div className="rating-score-badge">
                    <Star size={28} fill="#eab308" color="#eab308" />
                    <span>{ratingSummary.averageRating.toFixed(1)}</span>
                  </div>

                  <div className="rating-count-info">
                    <span className="rating-count-title">
                      {ratingSummary.totalRatings > 0
                        ? `Candidate & Employee Rating`
                        : `No Ratings Yet`}
                    </span>
                    <span className="rating-count-sub">
                      Based on {ratingSummary.totalRatings} verified {ratingSummary.totalRatings === 1 ? "review" : "reviews"} in database
                    </span>
                  </div>
                </div>

                {/* Interactive Rating Form */}
                <form onSubmit={handleSubmitRating} className="interactive-rating-box">
                  <div className="interactive-rating-prompt">
                    {userRating > 0 ? "Update your rating:" : "Rate this job & company:"}
                  </div>

                  <div className="stars-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="star-btn"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setUserRating(star)}
                      >
                        <Star
                          size={28}
                          color={star <= (hoverRating || userRating) ? "#eab308" : "#cbd5e1"}
                          fill={star <= (hoverRating || userRating) ? "#eab308" : "none"}
                        />
                      </button>
                    ))}
                    <span style={{ marginLeft: "10px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>
                      {userRating > 0 ? `${userRating} of 5 Stars` : "Select stars"}
                    </span>
                  </div>

                  <textarea
                    className="rating-feedback-input"
                    placeholder="Write a brief review or feedback about this position or company (optional)..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="submit-rating-btn"
                    disabled={ratingSubmitting}
                  >
                    <MessageSquare size={16} />
                    <span>{ratingSubmitting ? "Submitting..." : "Submit Rating"}</span>
                  </button>
                </form>

                {/* Display Reviews List */}
                {ratingSummary.ratings && ratingSummary.ratings.length > 0 && (
                  <div className="reviews-list">
                    <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "10px 0 0 0" }}>
                      Community Feedback ({ratingSummary.ratings.length})
                    </h4>
                    {ratingSummary.ratings.map((r) => (
                      <div key={r.id} className="review-item">
                        <div className="review-header">
                          <span className="review-author">{r.user?.name || "Verified User"}</span>
                          <div className="review-stars">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={14}
                                color={s <= r.rating ? "#eab308" : "#cbd5e1"}
                                fill={s <= r.rating ? "#eab308" : "none"}
                              />
                            ))}
                          </div>
                        </div>
                        {r.feedback && <p className="review-text">{r.feedback}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Right Action Sidebar */}
            <aside className="job-details-sidebar">
              <div className="job-sidebar-card">
                <h2 className="job-sidebar-title">Apply for this Position</h2>
                <p className="job-sidebar-subtitle">
                  Submit your profile directly to <strong>{job.company}</strong>'s hiring team.
                </p>

                <button
                  className="job-confirm-apply-btn"
                  onClick={handleApply}
                  disabled={applying || applied}
                >
                  <CheckCircle2 size={18} />
                  <span>{applied ? "Applied Successfully" : applying ? "Submitting..." : "Apply Now"}</span>
                </button>

                {/* DATABASE BOOKMARK BUTTON */}
                <button
                  className="job-secondary-btn"
                  onClick={handleToggleBookmark}
                  disabled={bookmarkLoading}
                  style={isBookmarked ? {
                    background: "#eff6ff",
                    borderColor: "#3b82f6",
                    color: "#1d4ed8"
                  } : {}}
                >
                  <Bookmark
                    size={18}
                    fill={isBookmarked ? "#2563eb" : "none"}
                    color={isBookmarked ? "#2563eb" : "currentColor"}
                  />
                  <span>
                    {bookmarkLoading
                      ? "Saving..."
                      : isBookmarked
                      ? "Bookmarked in Database"
                      : "Save Job to Bookmarks"}
                  </span>
                </button>

                <button className="job-secondary-btn" onClick={handleShare}>
                  <Share2 size={16} />
                  <span>Share Opportunity</span>
                </button>

                <div className="job-security-notice">
                  <Info size={18} className="job-security-notice-icon" />
                  <span>
                    <strong>Trust & Safety:</strong> Naukri Point ensures direct company verified listings. Never pay fees for application or interviews.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default JobDetails;
