import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bookmark, MapPin, Banknote, Eye, Trash2 } from "lucide-react";

function MyBookmarks() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUser = () => {
    try { return JSON.parse(localStorage.getItem("user")); }
    catch (e) { return null; }
  };

  const fetchBookmarks = useCallback(() => {
    const user = getUser();
    if (!user || !user.id) {
      navigate("/login");
      return;
    }
    setLoading(true);
    API.get(`/bookmarks/user/${user.id}`)
      .then(res => setBookmarks(res.data || []))
      .catch(err => console.error("Error fetching bookmarks:", err))
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    const user = getUser();
    if (!user) { navigate("/login"); return; }
    fetchBookmarks();
  }, [fetchBookmarks, navigate]);

  const handleRemoveBookmark = (jobId) => {
    const user = getUser();
    if (!user) return;
    API.post("/bookmarks/toggle", { userId: user.id, jobId })
      .then(() => fetchBookmarks())
      .catch(err => console.error("Remove bookmark failed:", err));
  };

  return (
    <div className="page-layout">
      <Navbar />
      <main className="page-content-grow">
        <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "0 20px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <Bookmark size={28} color="#2563eb" fill="#2563eb" />
            <div>
              <h2 style={{ margin: 0, fontSize: "26px", fontWeight: "800", color: "#0f172a" }}>
                My Saved Jobs
              </h2>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                {bookmarks.length} job{bookmarks.length !== 1 ? "s" : ""} saved from the database
              </p>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#2563eb", fontWeight: "600", fontSize: "18px" }}>
              Loading your saved jobs...
            </div>
          ) : bookmarks.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "60px 40px",
              background: "#ffffff", borderRadius: "16px",
              border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
            }}>
              <Bookmark size={48} color="#cbd5e1" style={{ marginBottom: "16px" }} />
              <h3 style={{ color: "#0f172a", marginBottom: "8px" }}>No bookmarks yet</h3>
              <p style={{ color: "#64748b", marginBottom: "24px" }}>
                Browse jobs and click "Save Job to Bookmarks" to save them here.
              </p>
              <Link to="/jobs" style={{
                display: "inline-block", padding: "12px 24px",
                background: "#2563eb", color: "#fff",
                borderRadius: "10px", textDecoration: "none",
                fontWeight: "700", fontSize: "15px"
              }}>
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="job-grid-container">
              {bookmarks.map(bm => {
                const job = bm.job;
                if (!job) return null;
                const initial = job.company ? job.company.charAt(0).toUpperCase() : "J";
                return (
                  <div key={bm.id} className="job-card job-card-modern">
                    {/* Card Header */}
                    <div className="job-card-header">
                      <div className="job-card-title-group">
                        <h3 className="job-card-title">{job.title}</h3>
                        <span className="job-card-company">{job.company}</span>
                      </div>
                      <div className="job-company-avatar">{initial}</div>
                    </div>

                    {/* Meta Pills */}
                    <div className="job-card-meta">
                      {job.location && (
                        <span className="job-meta-pill">
                          <MapPin size={13} /> {job.location}
                        </span>
                      )}
                      {job.salary && (
                        <span className="job-meta-pill job-salary-pill">
                          <Banknote size={13} /> ₹{job.salary}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <div className="job-card-body">
                      <h4 className="job-desc-title">Job Description:</h4>
                      <p className="job-card-description">
                        {job.description || "No description provided."}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="job-card-footer">
                      <Link to={`/job/${job.id}`} className="job-view-btn">
                        <Eye size={15} style={{ marginRight: "5px" }} /> View Details
                      </Link>
                      <button
                        className="job-apply-btn"
                        onClick={() => handleRemoveBookmark(job.id)}
                        style={{ background: "#ef4444", flex: "none", padding: "10px 14px" }}
                      >
                        <Trash2 size={15} style={{ marginRight: "5px" }} /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyBookmarks;
