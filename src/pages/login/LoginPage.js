import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import Notify from "../../helpers/toast";
import { useNavigate } from "react-router-dom";

import logoimg from "../../assets/logo.svg";

import { auth } from "../../helpers/firebase";

function LoginPage() {
  const [emailerror, setError] = useState("");
  const [passworderror, setPassError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const navigate = useNavigate();

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onSuccess: () => {
      Notify("User logged in successfully");
      navigate("/home");
    },
    onError() {
      Notify("An error occured, Try again");
      setLoadingButton(false);
    },
  });

  function onSignIn(email, password) {
    mutation.mutate({ email, password });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.email.value === "") {
      setError("Can't be empty");
    } else if (e.target.password.value === "") {
      setPassError("Can't be empty");
    } else {
      setLoadingButton(true);
      onSignIn(e.target.email.value, e.target.password.value);
    }
  };

  return (
    <div className='h-screen flex flex-col items-center overflow-hidden'>
      <div className='mt-36'>
        <img src={logoimg} alt='logo' />
      </div>
      <form
        onSubmit={handleSubmit}
        className=' mt-14 bg-dark-blue p-10 rounded-xl'>
        <div className='text-center mb-5'>
          <h3 className='text-3xl text-left'>Login</h3>
        </div>
        <div className='border-b-2 border-slate-500 focus-within:border-red relative'>
          <input
            type='text'
            name='email'
            className='w-full mr-20'
            autoComplete='off'
            placeholder='Email address'
            onChange={(e) => {
              e.target.value < 1 ? setError("Email is required") : setError("");
            }}
          />
          {emailerror ? (
            <p className='text-red text-[0.8rem] absolute ml-10 right-2 top-4'>
              {emailerror}
            </p>
          ) : null}
        </div>
        <div className='border-b-2 border-slate-500 focus-within:border-red relative'>
          <input
            type='password'
            name='password'
            autoComplete='off'
            placeholder='Password'
          />
          {passworderror ? (
            <p className='text-red text-[0.8rem]  absolute ml-10 right-2 top-4'>
              {passworderror}
            </p>
          ) : null}
        </div>

        <button
          disabled={loadingButton}
          type='submit'
          className='bg-red w-full my-8 rounded-md py-3 border-0 text-sm hover:bg-white hover:text-slate-800'>
          {loadingButton ? (
            <i className='fa fa-spinner fa-spin'></i>
          ) : (
            "Login to your account"
          )}
        </button>

        <ToastContainer />

        <div className='flex align-middle text-sm justify-center'>
          <p className='mr-2'>Dont have an account?</p>
          <p>
            <a href='/' className=' text-red'>
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
