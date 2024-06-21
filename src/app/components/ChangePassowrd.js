"use client"
import React, { useEffect, useState } from 'react'
import UserOwnedBokk from './UserOwnedBook'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function ChangePassowrd() {

    const router = useRouter()

    const [Valid, setValid] = useState()
    const [OldPassowrd, setOldPassowrd] = useState()
    const [NewPassword, setNewPassword] = useState()

    const HandleReset = async()=>{
        const data = {OldPassowrd,NewPassword}
        const res =  await axios.post('http://localhost:3001/ChangePassword',data,{withCredentials:true})
        if(res.data.status===true){
            toast.success(res.data.message)
        }else{
            toast.error(res.data.message)
        }
    }
    useEffect(() => {
        const checkUser=async()=>{
          const res = await axios.get("http://localhost:3001/AuthUser",{withCredentials:true})
          // console.log(res)
          if(res.data.Status === true){
            setValid(true)
          }else{
            router.push('http://localhost:3000/Login')
          }
        }
        return () => {
          checkUser()
        }
      }, [])
    
  return (
    <>
    {
        Valid?
       <div className='flex justify-center mt-4'>
       <ToastContainer />
     <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Change your Password
      </Typography>
    
      <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Old password
          </Typography>
          <Input
            size="lg"
            type="password"
            placeholder=""
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>setOldPassowrd(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Yor New Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder=''
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>setNewPassword(e.target.value)}
          />
        </div>
        <Button className="mt-6" color='blue' fullWidth onClick={()=>HandleReset()}>
          reset password
        </Button>
      </div>
    </Card>
    </div>:""
    }
    </>
  )
}
