import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  filterByCategory,
  selectPostsByCategory,
  selectPostsStatus,
  selectLastFetched,
} from "../../app/features/posts/postSlice";
// import PostSkeleton from "../ui/PostSkeleton"; // PostSkeleton import removed
import QPostCard from "../ui/QPostCard"; // Changed to QPostCard

const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const hadithBookDetails = [
  { displayName: "সহীহ বুখারী", categorySlug: "bukhari" },
  { displayName: "সহীহ মুসলিম", categorySlug: "muslim" },
  { displayName: "তিরমিযী শরীফ", categorySlug: "tirmidhi" },
  { displayName: "আবূ দাঊদ শরীফ", categorySlug: "dawood" }, // Assuming slug 'abudawud'
  { displayName: "সুনানে ইবনে মাজাহ", categorySlug: "majah" }, // Assuming slug 'ibnmajah'
  { displayName: "নাসাঈ শরীফ", categorySlug: "nasa'i" }, // Assuming slug 'nasai'
];

const tabColors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-info",
  "text-success",
  "text-warning",
  // Add more colors if needed, they will cycle
];

const Hadithbookpage = () => {
  const dispatch = useDispatch();
  const [activeTabSlug, setActiveTabSlug] = useState(
    hadithBookDetails[0].categorySlug
  );
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const postsForCategory = useSelector((state) =>
    selectPostsByCategory(state, activeTabSlug)
  );
  const postsStatus = useSelector(selectPostsStatus);
  const lastFetched = useSelector(selectLastFetched);

  useEffect(() => {
    const now = Date.now();
    const lastFetchTime = lastFetched ? new Date(lastFetched).getTime() : 0;
    const isCacheExpired = now - lastFetchTime > CACHE_EXPIRY;

    const loadData = async () => {
      setPageLoading(true);
      if (postsStatus === "idle" || isCacheExpired) {
        await dispatch(fetchPosts()); // Fetches all posts initially
      }
      // This will filter from the already fetched posts or after fetchPosts completes
      dispatch(filterByCategory(activeTabSlug));
      setTimeout(() => setPageLoading(false), 300); // Simulate loading
    };

    loadData();
  }, [dispatch, postsStatus, lastFetched, activeTabSlug]); // activeTabSlug re-runs filterByCategory

  const handleTabClick = (categorySlug) => {
    setActiveTabSlug(categorySlug);
    setSearchTerm(""); // Reset search on tab change
  };

  const filteredAndSortedPosts = useMemo(() => {
    if (!postsForCategory) return [];

    let filtered = postsForCategory.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.bangla &&
          post.bangla.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortOrder === "desc") {
      return [...filtered].reverse(); // Assuming default is some kind of ascending
    }
    return filtered; // Ascending or original fetched order
  }, [postsForCategory, searchTerm, sortOrder]);

  return (
    <div className="mx-auto py-8 max-w-[1000px] self-start">
      {/* Filter Bar: Search and Sort */}
      <div className="mb-6 flex flex-row sm:flex-row  items-center mx-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full rounded-r-none sm:flex-grow font-poppins" // Take available space, remove right rounding on sm+
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered rounded-l-none w-auto font-poppins"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Tabs */}
      <div role="tablist" className="tabs tabs-border flex-wrap px-4 mb-0">
        {hadithBookDetails.map((book, index) => (
          <a
            key={book.categorySlug}
            role="tab"
            className={`tab ${
              activeTabSlug === book.categorySlug ? "tab-active" : ""
            } ${tabColors[index % tabColors.length]}`} // Apply color class
            onClick={() => handleTabClick(book.categorySlug)}
          >
            {book.displayName}
          </a>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6 mx-4 bg-base-100  border-base-300 shadow-2xl  px-4">
        {pageLoading || postsStatus === "loading" ? (
          // <PostSkeleton count={3} />
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredAndSortedPosts && filteredAndSortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredAndSortedPosts.map((post) => (
              <QPostCard key={post._id || post.id} post={post} /> // Changed to QPostCard
            ))}
          </div>
        ) : (
          <div className="text-center py-10 font-poppins">
            Not available...
          </div> 
        )}
      </div>
    </div>
  );
};

export default Hadithbookpage;
