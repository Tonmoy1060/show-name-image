import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const handleSignOut = (event) => {
    event.preventDefault();
    signOut(auth);
    navigate("login");
  };

  return (
    <div className="lg:px-5 px-1 ">
      <div className="navbar bg-base-200 rounded-b-lg py-4 ">

         {/* responsive part start */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>

              {user ? (
                <li className=" hover:underline hover:text-secondary  decoration-secondary decoration-4 underline-offset-[12.5px] ">
                  <Link onClick={handleSignOut} to="login">
                    Sign Out
                  </Link>
                </li>
              ) : (
                <li className=" hover:underline hover:text-secondary  decoration-secondary decoration-4 underline-offset-[12.5px]">
                  <Link to={"login"}>Login</Link>
                </li>
              )}
            </ul>
          </div>
          <div className=" lg:mx-5 mx-3 flex items-center">

            {/* title start */}
            <div className="justify-center drop-shadow-xl">
              <Link className="normal-case text-2xl font-bold pb-0 mb-0 font-serif  drop-shadow-xl">
                FOCUS
              </Link>{" "}
              <div className="pt-0 mt-0 text-sm flex items-center font-serif">
                <small className="drop-shadow-xl">Academy</small>
              </div>
            </div>
            {/* title end */}

          </div>
        </div>
        {/* responsive end */}


        <div className="navbar-end hidden lg:flex ">
          <ul className="menu menu-horizontal p-0 mr-3">
            <li className="  hover:underline hover:text-secondary decoration-secondary decoration-4 underline-offset-[32.5px] ">
              <Link to={"/"}>Home</Link>
            </li>

            {user ? (
              <li className=" hover:underline hover:text-secondary  decoration-secondary decoration-4 underline-offset-[32.5px]">
                <Link onClick={handleSignOut} to="login">
                  Sign Out
                </Link>
              </li>
            ) : (
              <li className=" hover:underline hover:text-secondary  decoration-secondary decoration-4 underline-offset-[32.5px]">
                <Link to={"login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
