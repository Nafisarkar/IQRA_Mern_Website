import React, { useContext, useRef } from "react";
import { NavLink } from "react-router"; // Fixed import path
import { ThemeContext } from "../provider/themecontextprovider";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../app/features/user/userSlice";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const drawerCheckboxRef = useRef(null);

  // Move the useSelector outside useEffect for proper usage
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Function to close the sidebar
  const closeSidebar = () => {
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = false;
    }
  };

  // Custom NavLink wrapper that closes sidebar when clicked
  const SidebarNavLink = ({ to, children, className }) => {
    return (
      <NavLink to={to} className={className} onClick={closeSidebar}>
        {children}
      </NavLink>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center bg-base-300 w-full shadow-xl">
      <div className="drawer drawer-mobile relative font-poppins w-full max-w-[1000px]">
        <input
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerCheckboxRef}
        />
        <div className="drawer-content flex flex-col">
          {/* Nav */}
          <div className="navbar bg-base-300 w-full px-4 md:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
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
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 font-hind font-bold text-2xl">
              <NavLink to={"/"}>কুরআন সুন্নাহ</NavLink>
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                <li>
                  {isAuthenticated ? (
                    <SidebarNavLink to="/login" className="font-hind">
                      লগআউট
                    </SidebarNavLink>
                  ) : (
                    <SidebarNavLink to="/login" className="font-hind">
                      লগইন
                    </SidebarNavLink>
                  )}
                </li>
                <li className="font-hind">
                  <NavLink to="/quran">কুরআন</NavLink>
                </li>
                <li className="font-hind">
                  <NavLink to="/hadith">হাদিস</NavLink>
                </li>
                <li className="font-hind">
                  <NavLink to="/fatwa">ইসলামী ফতোয়া</NavLink>
                </li>
                <li className="font-hind">
                  <NavLink to="/donation">অনুদান</NavLink>
                </li>
                <li className="font-hind">
                  <NavLink to="/contactus">যোগাযোগ</NavLink>
                </li>
                <li>
                  <label className="swap swap-rotate">
                    {/* Theme toggle */}
                    <input
                      type="checkbox"
                      className="theme-controller"
                      value={theme}
                      checked={theme === "dark"}
                      onChange={toggleTheme}
                    />
                    {/* Sun icon */}
                    <svg
                      className="swap-on h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                    {/* Moon icon */}
                    <svg
                      className="swap-off h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side fixed z-20">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-200 min-h-screen w-80 px-4 pt-14 text-left">
            {/* Sidebar content here */}
            <li>
              <SidebarNavLink to="/" className="font-hind">
                হোম
              </SidebarNavLink>
            </li>
            <li>
              {isAuthenticated ? (
                <SidebarNavLink to="/login" className="font-hind">
                  লগআউট
                </SidebarNavLink>
              ) : (
                <SidebarNavLink to="/login" className="font-hind">
                  লগইন
                </SidebarNavLink>
              )}
            </li>
            <li className="font-hind">
              <SidebarNavLink to="/quran">কুরআন</SidebarNavLink>
            </li>
            <li className="font-hind">
              <SidebarNavLink to="/hadith">হাদিস</SidebarNavLink>
            </li>
            <li className="font-hind">
              <SidebarNavLink to="/fatwa">ইসলামী ফতোয়া</SidebarNavLink>
            </li>
            <li className="font-hind">
              <SidebarNavLink to="/donation">অনুদান</SidebarNavLink>
            </li>
            <li className="font-hind">
              <SidebarNavLink to="/contactus">যোগাযোগ</SidebarNavLink>
            </li>
            <li className="font-hind">
              <a
                className="justify-start"
                onClick={() => {
                  toggleTheme();
                  closeSidebar();
                }}
              >
                {theme === "dark" ? "লাইট মোড" : "ডার্ক মোড"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
