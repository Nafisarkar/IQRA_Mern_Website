import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logincard from "../ui/logincard";
import LogoutCard from "../ui/logoutcard";
import { checkAuthStatus } from "../../app/features/user/userSlice";

const Loginpage = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.userR);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    // Check auth status when component mounts
    dispatch(checkAuthStatus());

    // Set page as ready after a short delay to prevent flashing
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Show appropriate component based on auth state
  const renderContent = () => {
    // If still checking auth or page is loading, don't render anything yet
    if (!pageReady || status === "loading") {
      return <div className="loading loading-spinner loading-lg"></div>;
    }

    // Show LogoutCard if user is logged in, otherwise show Logincard
    return user ? <LogoutCard /> : <Logincard />;
  };
   
  return (
    <div className="flex flex-col items-center justify-center  py-8">
      <div className="flex flex-col items-center w-full max-w-md px-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Loginpage;
