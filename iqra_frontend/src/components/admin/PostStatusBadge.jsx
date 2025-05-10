import React from "react";

const PostStatusBadge = ({ status }) => {
  const getBadgeClass = () => {
    switch (status) {
      case "published":
        return "badge-success";
      case "draft":
        return "badge-warning";
      case "archived":
        return "badge-neutral";
      default:
        return "badge-ghost";
    }
  };

  const getDisplayText = () => {
    switch (status) {
      case "published":
        return "প্রকাশিত";
      case "draft":
        return "খসড়া";
      case "archived":
        return "আর্কাইভড";
      default:
        return "অজানা";
    }
  };

  return <div className={`badge ${getBadgeClass()}`}>{getDisplayText()}</div>;
};

export default PostStatusBadge;
