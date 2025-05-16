import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  selectCurrentPost,
  selectPostsStatus,
} from "../../app/features/posts/postSlice";

const Postpage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectCurrentPost);
  const status = useSelector(selectPostsStatus);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }
    // Increment view count
    fetch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/updatecount/${postId}`,
      {
        method: "POST",
        credentials: "include",
      }
    ).catch((err) => console.log("View count error:", err));
  }, [postId, dispatch]);

  if (status === "loading") {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto p-4">
        <div className="alert alert-error shadow-lg">
          <span>❌ Failed to load post details</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto p-4">
        <div className="alert alert-warning shadow-lg">
          <span>⚠️ Post not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-base-300 rounded-[5px] shadow-xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-hind break-words">
          {post.title}
        </h1>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="badge badge-outline font-barlow text-sm px-3 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {post.arabic && (
          <div className="mb-8">
            <p
              className="text-2xl md:text-3xl text-right font-kufi leading-loose break-words"
              dir="rtl"
            >
              {post.arabic}
            </p>
          </div>
        )}

        {post.english && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              English
            </h3>
            <p className="italic font-mono text-lg leading-relaxed whitespace-pre-line break-words">
              {post.english}
            </p>
          </div>
        )}

        {post.bangla && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-2 font-hind uppercase tracking-wide">
              Bangla
            </h3>
            <p className="font-hind text-lg leading-relaxed whitespace-pre-line break-words">
              {post.bangla}
            </p>
          </div>
        )}

        {post.description && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Description
            </h3>
            <div className="prose max-w-none prose-sm md:prose-base break-words">
              {post.description}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 text-sm text-gray-500 font-poppins gap-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <span>{post.views || 0} views</span>
          </div>
          <div>
            Published:{" "}
            <span className="font-semibold">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postpage;
