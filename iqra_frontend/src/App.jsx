import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./app/features/user/userSlice";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import Homepage from "./components/pages/homepage";
import { BrowserRouter, Routes, Route } from "react-router";
import Loginpage from "./components/pages/loginpage";
import Notfoundpage from "./components/pages/notfoundpage";
import Themecontextprovider from "./components/provider/themecontextprovider";
import Aboutuspage from "./components/pages/aboutuspage";
import Contactuspage from "./components/pages/contactuspage";
import Termsofusepage from "./components/pages/termsofusepage";
import DonationPage from "./components/pages/donationpage";
import Quranpage from "./components/pages/quranpage";
import Hadispage from "./components/pages/hadispage";
import Fatwapage from "./components/pages/fatwapage";
import Adminpage from "./components/pages/adminpage";
import Postpage from "./components/pages/postpage";
import UsersContent from "./components/admin/UsersContent";
import EditPost from "./components/admin/EditPost";

const App = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication status on app initialization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthStatus())
          .unwrap()
          .catch(() => {
            // Silently handle auth check failures
            console.log("App started without authentication");
          });
      } finally {
        // Always set authChecked to true when done
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Optional: Show a loading indicator while checking auth
  // if (!authChecked) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="text-center">
  //         <div className="loading loading-spinner loading-lg"></div>
  //         <p className="mt-4 font-hind">লোডিং...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <BrowserRouter>
      <Themecontextprovider>
        <div className="min-h-screen flex flex-col justify-between max-w-full ">
          <Navbar />
          <div className="container mx-auto lg:w-2/3 ">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/aboutus" element={<Aboutuspage />} />
              <Route path="/termsofuse" element={<Termsofusepage />} />
              <Route path="/contactus" element={<Contactuspage />} />
              <Route path="/quran" element={<Quranpage />} />
              <Route path="/hadith" element={<Hadispage />} />
              <Route path="/fatwa" element={<Fatwapage />} />
              <Route path="/admin" element={<Adminpage />} />
              <Route path="/post/:postId" element={<Postpage />} />
              <Route path="/donation" element={<DonationPage />} />
              <Route path="/admin/users" element={<UsersContent />} />
              <Route path="/admin/edit-post/:postId" element={<EditPost />} />
              <Route path="*" element={<Notfoundpage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Themecontextprovider>
    </BrowserRouter>
  );
};

export default App;
