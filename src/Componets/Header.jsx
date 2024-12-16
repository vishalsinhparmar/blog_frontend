import { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { myContext } from "./Contextcomponets/CreateContext";

function Header() {
  
  const { user, setUser,setuserToken } = useContext(myContext);
  const navigate = useNavigate();



  const Logout = () =>{
      localStorage.removeItem("token")
      setUser(null)
      setuserToken(null)
       navigate('/SignIn');
 
  }

  return (
    <nav className="bg-gray-800 shadow-lg">
      <ul className="w-full p-4 flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center gap-8">
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
            <Link to="/blogs" className="text-white text-lg hover:text-gray-400">
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
    </nav>
  );
}

export default Header;
