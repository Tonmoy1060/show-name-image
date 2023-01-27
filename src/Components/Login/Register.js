import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../assets/google.png";
import auth from "../../firebase.init";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from "../Loading";


const Register = () => {
   const [allError, setAllError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [updateProfile, eUpdating, updateError] = useUpdateProfile(auth);
  

  const  registerButton = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;


    await createUserWithEmailAndPassword(email, password);
    await updateProfile({displayName: name})
    event.target.reset();
  };

  useEffect(() => {
   setAllError(error?.message || gError?.message || updateError?.message);
 }, [error || gError || updateError]);

  if(loading || gLoading || eUpdating) {
    return <Loading></Loading>
  }

  const from = location.state?.from?.pathname || "/";
  if(user || gUser){
    navigate(from, { replace: true });
  }

  return (
    <div className="lg:max-w-xs max-w-sm mx-auto pt-14 pb-10 mt-14 mb-14 p-2">
      <div className="card max-w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-serif text-info font-bold ">
            Register
          </h2>
          <form onSubmit={registerButton} action="">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {/* <span className="label-text">Your Email</span> */}
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {/* <span className="label-text">Your Email</span> */}
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {/* <span className="label-text">Password</span> */}
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>

            <button className="btn btn-info text-white w-2/4">Register</button>
            <label className="pt-3">
              {/* <span className="label-text-alt">Alt label</span> */}
              <p className="pt-2 pb-1 ">
              <small className="text-red-500">{allError}</small>
            </p>
              <p className="pt-3">
                <small>
                  Already Registered?{" "}
                  <Link className="text-green-500" to="/login">
                    {" "}
                    Please login
                  </Link>
                </small>
              </p>
            </label>
          </form>
          <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-accent text-white">
            <img src={google} alt="" />
            google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;