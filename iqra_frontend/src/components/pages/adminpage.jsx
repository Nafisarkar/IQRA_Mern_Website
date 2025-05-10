import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAdmin,
  selectUser,
  checkAuthStatus,
} from "../../app/features/user/userSlice";
import { useNavigate } from "react-router";
import PostForm from "../admin/PostForm";
import ManagePostsContent from "../admin/ManagePostsContent";
import UsersContent from "../admin/UsersContent";
import EditPost from "../admin/EditPost";

const Adminpage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("posts");
  const isAdmin = useSelector(selectIsAdmin);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  // First, check authentication status once on component mount
  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(checkAuthStatus());
      setAuthChecked(true);
    };

    checkAuth();
  }, [dispatch]);

  // Then, handle redirects after we've checked auth
  useEffect(() => {
    if (!authChecked) return; // Don't redirect until we've checked auth

    if (user === null) {
      console.log("No user, redirecting to login");
      navigate("/login");
    } else if (isAdmin === false) {
      console.log("Not admin, redirecting to home");
      navigate("/");
    } else {
      console.log("Admin access granted");
    }
  }, [isAdmin, user, navigate, authChecked]);

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Show loading state while checking auth or if no user is found
  if (!authChecked || user === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen max-w-[1000px]">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-[5px] grid h-20 grow place-items-center font-hind shadow-2xl">
            অ্যাডমিন প্যানেল
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="card bg-base-300 rounded-[5px] grid h-20 grow place-items-center font-barlow shadow-2xl">
            {user.username}
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-bordered font-hind">
          <a
            role="tab"
            className={`tab ${activeTab === "posts" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("posts")}
          >
            পোস্ট যোগ করুন
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "manage" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("manage")}
          >
            পোস্ট ম্যানেজ করুন
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "users" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("users")}
          >
            ইউজারস
          </a>
        </div>

        {/* Tab content */}
        <div className="min-h-[400px]">
          {activeTab === "posts" && <PostForm />}
          {activeTab === "manage" && <ManagePostsContent />}
          {activeTab === "users" && <UsersContent />}
        </div>
      </div>
    </div>
  );
};

export default Adminpage;
