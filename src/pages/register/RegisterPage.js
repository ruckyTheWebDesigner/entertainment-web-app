import { useState } from "react";
import logoimg from "../../assets/logo.svg";

import { uploadFile, auth } from "../../helpers/firebase";

import { useNavigate } from "react-router-dom";
import Notify from "../../helpers/toast";

import {
  useAuthCreateUserWithEmailAndPassword,
  useAuthUpdateProfile,
} from "@react-query-firebase/auth";
import { Avatar } from "@mui/material";

function RegisterPage() {
  const [file, setFile] = useState(null);
  const [emailerror, setemailError] = useState("");
  const [passworderror, setPassError] = useState("");
  const [confirmpassworderror, setConfirmPassError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const navigate = useNavigate();

  const mutation = useAuthCreateUserWithEmailAndPassword(auth, {
    onError: () => {
      Notify("An error occured, Try again");
      setLoadingButton(false);
    },
  });

  const updateMutate = useAuthUpdateProfile({
    onSuccess: () => {
      navigate("/home");
    },
    onError: () => {
      Notify("An error occured, Try again");
      setLoadingButton(false);
    },
  });

  const onSignUp = async (email, password, file) => {
    if (!file || file === null || file === undefined) {
      await mutation.mutate({ email, password });
      navigate("/home");
    } else {
      await mutation.mutate({ email, password });
      uploadFile(file).then((url) => {
        updateMutate.mutate({
          user: auth.currentUser,
          photoURL: url,
        });
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.email.value === "") {
      setemailError("Can't be empty");
    } else if (e.target.password.value === "") {
      setPassError("Can't be empty");
    } else if (e.target.confirmpassword.value === "") {
      setPassError("");
      setConfirmPassError("Can't be empty");
    } else {
      if (e.target.password.value !== e.target.confirmpassword.value) {
        setConfirmPassError("Password does not match");
      } else {
        setLoadingButton(true);
        onSignUp(e.target.email.value, e.target.password.value, file);
      }
    }
  };

  function handleChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className='h-screen w-auto flex flex-col items-center'>
      <div className='mt-28'>
        <img src={logoimg} alt='logo' />
      </div>
      <form
        onSubmit={handleSubmit}
        className=' mt-12 bg-dark-blue p-8  rounded-xl'>
        <div className='text-center mb-5'>
          <h3 className='text-3xl text-left'>Sign Up</h3>
        </div>
        <div className='border-b-2 border-slate-500 focus-within:border-red relative pb-1'>
          <input
            type='email'
            name='email'
            className='w-full mr-20'
            autoComplete='off'
            placeholder='Email address'
          />
          {emailerror ? (
            <p className='text-red text-xs absolute ml-10 right-2 top-4'>
              {emailerror}
            </p>
          ) : null}
        </div>
        <div className='border-b-2 border-slate-500 focus-within:border-red relative pb-1'>
          <input
            type='password'
            name='password'
            autoComplete='off'
            placeholder='Password'
          />
          {passworderror ? (
            <p className='text-red text-xs absolute ml-10 right-2 top-4'>
              {passworderror}
            </p>
          ) : null}
        </div>
        <div className='border-b-2 border-slate-500 focus-within:border-red relative pb-1'>
          <input
            type='password'
            name='confirmpassword'
            autoComplete='off'
            placeholder='Confirm password'
          />
          {confirmpassworderror ? (
            <p className='text-red text-xs absolute ml-10 right-2 top-4'>
              {confirmpassworderror}
            </p>
          ) : null}
        </div>
        <div className='flex items-center border-b-2 py-4 pl-2 border-slate-500 focus-within:border-red relative '>
          <input
            type='file'
            name='file'
            id='upload'
            onChange={handleChange}
            hidden
          />
          <label
            className='upload_label pl-3 pr-5 border-red rounded-md border py-1 mr-5'
            htmlFor='upload'>
            Choose profile avatar
          </label>
          {file ? (
            <Avatar
              sx={{ width: 30, height: 30 }}
              src={URL.createObjectURL(file)}
            />
          ) : null}
        </div>
        <button
          disabled={loadingButton}
          type='submit'
          className='bg-red w-full my-8 rounded-md py-3  border-0 text-sm hover:bg-white hover:text-slate-800'>
          {loadingButton ? (
            <i className='fa fa-spinner fa-spin'></i>
          ) : (
            "Create an account"
          )}
        </button>
          
        <div className='flex align-middle text-sm justify-center'>
          <p className='mr-2'>Already have an account?</p>
          <p>
            <a href='/login' className=' text-red'>
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
