import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../app/features/posts/postSlice";
import PostDeleteButton from "./PostDeleteButton";
import PostStatusBadge from "./PostStatusBadge";
import PostCategoryBadge from "./PostCategoryBadge";
import Toast from "../ui/toast";
import { Link } from "react-router";

const ManagePostsContent = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.postR);
  const [searchQuery, setSearchQuery] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Filter posts based on search query
  const filteredPosts =
    posts?.filter(
      (post) =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Toast message handler
  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Auto-hide toast after delay
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Handle post deletion feedback
  const handleDeleteResult = (success, message) => {
    if (success) {
      showToastMessage("পোস্ট সফলভাবে মুছে ফেলা হয়েছে", "success");
      // Refresh post list
      dispatch(fetchPosts());
    } else {
      showToastMessage(`ত্রুটি: ${message}`, "error");
    }
  };

  return (
    <div className="bg-base-300 p-6 rounded-[5px] shadow-lg font-hind">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-hind m-4">পোস্ট ম্যানেজমেন্ট</h2>
        <div className="form-control max-w-xs">
          <div className="input-group">
            <input
              type="text"
              placeholder="অনুসন্ধান করুন"
              className="input input-bordered"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          status={toastType}
          duration={3000}
          position="bottom-end"
          show={showToast}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="overflow-x-auto mt-4">
        {status === "loading" ? (
          <div className="flex justify-center my-8">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <table className="table w-full font-hind">
            <thead>
              <tr>
                <th className="">শিরোনাম</th>
                <th>ক্যাটেগরি</th>
                <th>স্ট্যাটাস</th>
                <th>ভিউ</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post._id || post.id}>
                  <td className="font-medium">{post.title || "No Title"}</td>
                  <td>
                    <PostCategoryBadge category={post.category} />
                  </td>
                  <td>
                    <PostStatusBadge status={post.status} />
                  </td>
                  <td>{post.views || 0}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/post/${post._id}`}
                        className="btn btn-xs btn-info"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/edit-post/${post._id}`}
                        className="btn btn-xs btn-warning"
                      >
                        Edit
                      </Link>
                      <PostDeleteButton
                        postId={post._id}
                        onDeleteResult={handleDeleteResult}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? "কোন ফলাফল পাওয়া যায়নি" : "কোন পোস্ট নেই"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePostsContent;
