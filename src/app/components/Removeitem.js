"use client"
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Card,
    Input,
    Typography,
  } from "@material-tailwind/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
   

export default function Removeitem() {
  const router = useRouter()
    const [BookName, setBookName] = useState()
    const [BookISBN, setBookISBN] = useState()
    const [show, setshow] = useState(false)


    const HandleDelete = async ()=>{
     const data = {BookName,BookISBN}
      const result = await axios.delete(`http://localhost:3001/deleteBook`,{data:data})
      toast.success(result.data.message);
    
    }

    useEffect(() => {
      const checkUser = async()=>{
        const res = await axios.get("http://localhost:3001/AdminAuth",{withCredentials:true})
        if(res.data.Status===true){
          setshow(true)
        }else{
          router.push('http://localhost:3000/Admin/Login')
        }
      }
      return () => {
        checkUser()
      }
    }, [])

    return (
    <>
    {
      show===true?

      <div className='lg:flex sm:block'>
        {/* left section */}

        {/* for the toast message */}
        <ToastContainer />
        <div className='mr-10'> 
        <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Remove your Book
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to remove a book.
      </Typography>
      <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Book Name
          </Typography>
          <Input
            size="lg"
            placeholder="Product name ex:- hooides"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>setBookName(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
           Book ISBN.
          </Typography>
          <Input
            required
            size="lg"
            placeholder="Enter your ISBN number"
            type='text'
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>setBookISBN(e.target.value)}
          />
        </div>
      </div>
    </Card>
    <input type="button" value="delete product" className='bg-black text-white rounded-md w-1/2 hover:shadow-lg p-2 hover:cursor-pointer' onClick={()=>HandleDelete()} />    
    </div>
    </div>
    
      :""
    }
    </>
    )
}
