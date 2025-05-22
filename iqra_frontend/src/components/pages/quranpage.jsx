import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  filterByCategory,
  selectPostsByCategory,
  selectPostsStatus,
  selectLastFetched,
} from "../../app/features/posts/postSlice";
import PostSkeleton from "../ui/PostSkeleton";
import QPostCard from "../ui/QPostCard";

const CATEGORY = "quran";
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const Quranpage = () => {
  const dispatch = useDispatch();
  const categoryPosts = useSelector((state) =>
    selectPostsByCategory(state, CATEGORY)
  );
  const status = useSelector(selectPostsStatus);
  const lastFetched = useSelector(selectLastFetched);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc', 'desc' (default to descending/reversed)

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
      // Always show at least 300ms loading
      setTimeout(() => setLoading(false), 300);
    };

    loadData();
  }, [dispatch, status, lastFetched]);

  const filteredAndSortedPosts = useMemo(() => {
    if (!categoryPosts) return [];

    let filtered = categoryPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "desc") {
      // Create a new reversed array
      return [...filtered].reverse();
    }
    // For 'asc', return the filtered array as is (original fetched/filtered order)
    return filtered;
  }, [categoryPosts, searchTerm, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1000px]">
      <div className="mb-6 flex flex-row sm:flex-row  items-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full rounded-r-none sm:flex-grow " // Take available space, remove right rounding on sm+
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered  rounded-l-none w-auto "
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {loading && <PostSkeleton />}

        {!loading &&
          filteredAndSortedPosts &&
          filteredAndSortedPosts.length > 0 &&
          filteredAndSortedPosts.map((post) => (
            <QPostCard key={post._id || post.id} post={post} />
          ))}

        {!loading &&
          (!filteredAndSortedPosts || filteredAndSortedPosts.length === 0) && (
            <div className="col-span-full text-center py-10">
              No posts available matching your criteria.
            </div>
          )}
      </div>
    </div>
  );
};

export default Quranpage;
