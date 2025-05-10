import React, { useState } from "react";

const PostDeleteButton = ({ postId, onDeleteResult }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePost = async () => {
    if (!postId || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/postdeletebyid/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete post");
      }

      // Call the callback with success
      onDeleteResult(true);
    } catch (error) {
      console.error("Delete error:", error);
      // Call the callback with error
      onDeleteResult(false, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`btn btn-xs btn-error ${isLoading ? "loading" : ""}`}
      onClick={handleDeletePost}
      disabled={isLoading}
    >
      Delete
    </button>
  );
};

export default PostDeleteButton;
