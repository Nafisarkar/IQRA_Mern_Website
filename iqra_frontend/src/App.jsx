import React from "react";
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

const App = () => {
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
