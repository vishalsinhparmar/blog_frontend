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
      {/* Toggle Button for Small Screens */}
      <div className="absolute top-0 right-0 p-4 md:hidden">
        {toggle ? (
          <IoCloseOutline
            onClick={handleToggle}
            className="text-2xl text-white cursor-pointer "
          />
        ) : (
          <FiGrid
            onClick={handleToggle}
            className="text-2xl text-white cursor-pointer bg-black"
          />
        )}
      </div>

      {/* Navigation Menu */}
      <div
        className={`${
          toggle ? "block" : "hidden"
        } md:flex md:items-center md:justify-between w-full`}
      >
        <ul
          className={`${
            toggle ? "flex flex-col items-center" : "flex"
          } w-full p-4 md:flex md:flex-row md:items-center md:justify-between`}
        >
          {/* Navigation Links */}
          <div
            className={`${
              toggle ? "flex flex-col gap-4" : "flex gap-8"
            } items-center`}
          >
            <li>
              <Link to="/" className="text-white text-lg hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-lg ${
                    isActive ? "text-yellow-400" : "text-white"
                  } hover:text-gray-400`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <Link
                to="/blogs"
                className="text-white text-lg hover:text-gray-400"
              >
                Blogs
              </Link>
            </li>
          </div>

          {/* User Authentication Links */}
          <div className="flex items-center gap-5">
            {!user ? (
              <>
                <li>
                  <Link
                    to="/SignUp"
                    className="text-yellow-400 text-lg border-2 border-yellow-400 rounded-full px-4 py-1 hover:bg-yellow-400 hover:text-black"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/SignIn"
                    className="text-white text-lg border-2 border-white rounded-full px-4 py-1 hover:bg-white hover:text-black"
                  >
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-white text-lg">{user.username}</p>
                <img
                  className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
                  src={user.image}
                  alt="User Avatar"
                  onClick={() => navigate("/user")}
                />
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-700"
                  onClick={Logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
