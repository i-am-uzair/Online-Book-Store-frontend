"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function page({params}) {
    // console.log(token)
    const token = params.token
    // console.log(token)
    const [Password, setPassword] = useState()
    const [ConfirmPassword, setConfirmPassword] = useState()

    const HandleSubmit = async()=>{
        const data = {Password,ConfirmPassword,token}
        axios.defaults.withCredentials = true
        const res = await axios.post("http://localhost:3001/ResetPassword",data)
        // console.log(res)
        if(res.data.status === true){
          toast.success(res.data.message);
          window.location.replace("http://localhost:3000/Login");
        }else{
          toast.error(res.data.message);
        }
    }
    return (
    <>
    <div className="max-w-sm mx-auto pt-10 pb-3">
    <ToastContainer/>
  <div className="mb-5">
    <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div className="mb-5">
    <label htmlFor="Confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="Confirmpassword" onChange={(e)=>setConfirmPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <button type="submit" onClick={HandleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</button>
</div>
    </>
  )
}
