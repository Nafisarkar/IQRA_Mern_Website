import React from "react";

const PostCategoryBadge = ({ category }) => {
  const getBadgeClass = () => {
    switch (category) {
      case "hadith":
        return "badge-accent";
      case "quran":
        return "badge-primary";
      case "fatwa":
        return "badge-secondary";
      default:
        return "badge-ghost";
    }
  };

  const getDisplayText = () => {
    switch (category) {
      case "hadith":
        return "হাদিস";
      case "quran":
        return "কুরআন";
      case "fatwa":
        return "ফতোয়া";
      default:
        return category || "অন্যান্য";
    }
  };

  return <div className={`badge ${getBadgeClass()}`}>{getDisplayText()}</div>;
};

export default PostCategoryBadge;
