import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { myContext } from "./Contextcomponets/CreateContext";
import { FiGrid } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

function Header() {
  const { user, setUser, setuserToken } = useContext(myContext);
  const navigate = useNavigate();
  const [toggle, settoggle] = useState(false);

  const handleToggle = () => settoggle((prev) => !prev);

  const Logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setuserToken(null);
    navigate("/SignIn");
  };

  return (
    <nav className="bg-gray-800 w-full shadow-lg">
      <div className="flex items-center justify-between p-4 md:py-4 md:px-8">
        {/* Logo or Home Link */}
        <div>
          <Link to="/" className="text-white text-xl font-bold">
            blog
          </Link>
        </div>

        {/* Toggle Button for Small Screens */}
        <div className="md:hidden">
          {toggle ? (
            <IoCloseOutline
              onClick={handleToggle}
              className="text-2xl text-white cursor-pointer"
            />
          ) : (
            <FiGrid
              onClick={handleToggle}
              className="text-2xl text-white cursor-pointer"
            />
          )}
        </div>

        {/* Navigation Menu */}
        <div
          className={`${
            toggle ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-gray-800 md:static md:w-auto md:flex md:items-center`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-8 text-center">
            {/* Navigation Links */}
            <li>
              <Link
                to="/"
                className="text-white text-lg hover:text-gray-400 py-2 md:py-0"
                onClick={() => settoggle(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-lg ${
                    isActive ? "text-yellow-400" : "text-white"
                  } hover:text-gray-400 py-2 md:py-0`
                }
                onClick={() => settoggle(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <Link
                to="/blogs"
                className="text-white text-lg hover:text-gray-400 py-2 md:py-0"
                onClick={() => settoggle(false)}
              >
                Blogs
              </Link>
            </li>

            {/* User Authentication Links */}
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center md:gap-5">
              {!user ? (
                <>
                  <li className="">
                    <Link
                      to="/SignUp"
                      className="text-yellow-400 text-lg border-2 border-yellow-400 rounded-full px-4 py-1 hover:bg-yellow-400 hover:text-black"
                      onClick={() => settoggle(false)}
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="my-4 lg:my-0">
                    <Link
                      to="/SignIn"
                      className="text-white text-lg border-2 border-white rounded-full px-4 py-1 hover:bg-white hover:text-black"
                      onClick={() => settoggle(false)}
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <p className="text-white text-lg">{user.username}</p>
                  <img
                    className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
                    src={user.image}
                    alt="User Avatar"
                    onClick={() => {
                      navigate("/user");
                      settoggle(false);
                    }}
                  />
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-700"
                    onClick={() => {
                      Logout();
                      settoggle(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
