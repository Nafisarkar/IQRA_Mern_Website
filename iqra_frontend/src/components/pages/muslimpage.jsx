import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  filterByCategory,
  selectPostsByCategory,
  selectPostsStatus,
  selectLastFetched,
} from "../../app/features/posts/postSlice";
import PostSkeleton from "../ui/PostSkeleton";
import PostCard from "../ui/PostCard";

const CATEGORY = "muslim";
const CACHE_EXPIRY = 5 * 60 * 1000;
const Muslimpage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => selectPostsByCategory(state, CATEGORY));
  const status = useSelector(selectPostsStatus);
  const lastFetched = useSelector(selectLastFetched);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = Date.now();
    const lastTime = lastFetched ? new Date(lastFetched).getTime() : 0;
    const isCacheExpired = now - lastTime > CACHE_EXPIRY;

    const loadData = async () => {
      if (status === "idle" || isCacheExpired) {
        await dispatch(fetchPosts());
      } else {
        dispatch(filterByCategory(CATEGORY));
      }
      setTimeout(() => setLoading(false), 300); // 300ms loading effect
    };

    loadData();
  }, [dispatch, status, lastFetched]);
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1000px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {loading && <PostSkeleton />}

        {!loading &&
          posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <PostCard key={post._id || post.id} post={post} />
          ))}

        {!loading && (!posts || posts.length === 0) && (
          <div className="col-span-full text-center py-10">
            No posts available
          </div>
        )}
      </div>
    </div>
  );
};

export default Muslimpage;
