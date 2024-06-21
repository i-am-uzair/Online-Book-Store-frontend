"use client"
import React, { useEffect, useState } from 'react'
import UserOwnedBokk from './UserOwnedBook'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function UserDetails(setshow){
  const router = useRouter()
  
  const [Details, setDetails] = useState()
  const [Valid, setValid] = useState()
  // const [changePassword, setchangePassword] = useState(false)
  useEffect(() => {
    const checkUser=async()=>{
      const res = await axios.get("http://localhost:3001/AuthUser",{withCredentials:true})
      // console.log(res)
      if(res.data.Status === true){
        console.log(res.data.doc)
        setValid(true)
        setDetails(res.data.doc)
      }else{
        router.push("http://localhost:3000/Login")
      }
    }
    return () => {
      checkUser()
    }
  }, [])
  
  return (
   <>
   {

   Valid===true?
  <div className='flex justify-center mt-4'>
   <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
       your details
      </Typography>
      <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            disabled={true}
            value={Details.Name}
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            disabled={true}
            value={Details.Email}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            verified
          </Typography>
          <Input
           disabled={true}
            value={`${Details.verified} ✅ `}
            type="text"
            size="lg"
            placeholder=""
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          
        </div>
      </div>
    </Card>
</div>:""
   }
   </>
  )
}

