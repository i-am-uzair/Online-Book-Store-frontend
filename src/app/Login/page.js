"use client"
// import { Container } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function page() {
  const router = useRouter()
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [toggle, settoggle] = useState(true)

  const HandleSubmit = async()=>{
    if(toggle===true){
      // for login
      const data = {email,password}
      axios.defaults.withCredentials = true
      const res = await axios.post("http://localhost:3001/login",data,{withCredentials:true})
      // console.log(res)
      if(res.data.Status === true){
        toast.success(res.data.message);
        window.location.replace("http://localhost:3000");
      }else{
        toast.error(res.data.message);
      }
    }else{

      // for forget password
      const data = {email}
      const res = await axios.post("http://localhost:3001/ForgetPassword",data)
      // console.log(res)
      if(res.data.status === true){
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    }
   
  }


  useEffect(() => {
    const checkUser = async()=>{
      const res = await axios.get("http://localhost:3001/AuthUser",{withCredentials:true})
      if(res.data.Status===true){
        router.push('http://localhost:3000')
      }else{
        // router.push('http://localhost:3000/Login')
      }
    }
    return () => {
      checkUser()
    }
  }, [])
  
  
  return (
    <>

<h1 className='text-center mt-10 text-xl font-bold '>Login the Account</h1>
<ToastContainer/>
{

  toggle===true?
  <div className="max-w-sm mx-auto pt-10 pb-3">
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <button type="submit" onClick={HandleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
  <button onClick={()=>settoggle(false)} className='hover:text-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:text-blue-700'>Forget Password</button>
</div>
  :
  <div className="max-w-sm mx-auto pt-10 pb-3">
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <button type="submit" onClick={HandleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Forget</button>
  <button onClick={()=>settoggle(true)} className='hover:text-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:text-blue-700'>Login</button>
</div>
}
  </>
)
}
