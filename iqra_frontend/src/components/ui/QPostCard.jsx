import React from "react";
import { useNavigate } from "react-router";
import "arabic-fonts/src/css/arabic-fonts.css";

const QPostCard = ({ post }) => {
  if (!post) return null;

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleCardClick();
    }
  };

  // Helper: limit to 2 sentences (based on separator)
  const getTwoSentences = (text, separator = ".") => {
    if (!text) return ""; // Handle cases where text might be undefined or null
    const sentences = text.split(separator);
    return (
      sentences.slice(0, 2).join(separator) +
      (sentences.length > 2 ? separator + " ..." : "")
    );
  };

  return (
    <div
      className="rounded-[5px] shadow-lg p-6 hover:shadow-xl transition-shadow bg-base-300 cursor-pointer h-50  flex flex-col justify-between" // Fixed height and layout
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="mb-2">
        {" "}
        {/* Reduced margin-bottom from mb-4 to mb-2 */}
        <h2
          className="text-xl font-bold font-hind line-clamp-2" // Removed mb-2 from here as parent has mb-2
          style={{ minHeight: "3rem" }} // Fixed height for title
        >
          {/* Assuming post.title contains the Bangla title */}
          {getTwoSentences(post.title)}
        </h2>
        {/* Tags section removed */}
      </div>

      {post.arabic && (
        <div className="mb-2">
          {" "}
          {/* Reduced margin-bottom from mb-4 to mb-2 */}
          <p className="text-xl text-right font-indopak line-clamp-2" dir="rtl">
            {getTwoSentences(post.arabic, "۔")} {/* Arabic period */}
          </p>
        </div>
      )}

      {/* English section removed */}

      {/* Bangla section removed */}

      <div className="flex justify-between items-center mt-4 text-xs text-gray-400 font-poppins">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          {post.views || 0} views
        </div>
        <div>Published: {new Date(post.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default QPostCard;
