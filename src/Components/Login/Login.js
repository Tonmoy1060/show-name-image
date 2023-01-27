import React, { useEffect, useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../assets//google.png";
import auth from "../../firebase.init";
import Loading from "../Loading";

const Login = () => {
  const [allError, setAllError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);


//   error showing
  useEffect(() => {
    setAllError(error?.message || gError?.message);
  }, [error || gError]);

  //   login control button function
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(email, password);
    event.target.reset();
  };

  //   require auth path
  const from = location.state?.from?.pathname || "/";
  if (user || gUser) {
    navigate(from, { replace: true });
  }

  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="lg:max-w-xs max-w-sm mx-auto pt-10 pb-10 mt-14 mb-14 p-2">
      <div className="card max-w-full bg-base-100 shadow-xl ">
        <div className="card-body ">
          <h2 className="text-center text-xl text-info font-bold pb-1 font-serif">
            login
          </h2>
          {/* input groups start */}
          <form onSubmit={handleLogin} action="">
            <div className="form-control w-full max-w-xs">
              <label className="label"></label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <label className="label"></label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label"></label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label"></label>
            </div>

            <button className="btn btn-info text-white w-2/4">LogIn</button>
          </form>
          {/* input group end */}

          <label className="pt-1 font-serif ">
            <p className="pt-2 pb-1 ">
              <small className="text-red-500">{allError}</small>
            </p>
            <p className="pt-2 pb-1 ">
              <small>
                New to FOCUS ?{" "}
                <Link className="text-green-500" to="/register">
                  {" "}
                  Register now
                </Link>
              </small>
            </p>
          </label>
          {/* divider */}
          <div className="divider">OR</div>
          {/* google sign in */}
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-accent text-white my-2"
          >
            <img src={google} alt="" />
            google login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
