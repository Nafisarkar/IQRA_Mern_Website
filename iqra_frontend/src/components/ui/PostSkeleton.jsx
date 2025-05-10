import React from "react";

const PostSkeleton = ({ count = 2 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="rounded-lg shadow-lg p-6 bg-base-300 animate-pulse h-100  flex flex-col justify-between"
        >
          {/* Title */}
          <div className="h-6 bg-base-100/50 rounded w-3/4 mb-4"></div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            <div className="h-5 w-12 bg-base-100/50 rounded"></div>
            <div className="h-5 w-16 bg-base-100/50 rounded"></div>
          </div>

          {/* Arabic text */}
          <div className="h-7 bg-base-100/50 rounded w-full mb-4 self-end"></div>

          {/* English section */}
          <div className="h-4 bg-base-100/50 rounded w-1/4 mb-2"></div>
          <div className="h-5 bg-base-100/50 rounded w-11/12 mb-4"></div>

          {/* Bangla section */}
          <div className="h-4 bg-base-100/50 rounded w-1/4 mb-2"></div>
          <div className="h-5 bg-base-100/50 rounded w-10/12 mb-4"></div>

          {/* Footer: views + date */}
          <div className="flex justify-between items-center mt-auto">
            <div className="h-4 w-16 bg-base-100/50 rounded"></div>
            <div className="h-4 w-20 bg-base-100/50 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostSkeleton;
