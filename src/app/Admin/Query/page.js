"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function () {
  const [QueryMessage, setQueryMessage] = useState([])

    useEffect(() => {
        const checkUser = async()=>{
          const res = await axios.get("http://localhost:3001/AdminAuth",{withCredentials:true})
          if(res.data.Status===true){
            const res = await axios.get("http://localhost:3001/UserQueryMessage",{withCredentials:true})
            console.log(res.data.doc)
            setQueryMessage(res.data.doc)
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
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-3">
  <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
    <div className="mt-6 flow-root">
      <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">

        {
            QueryMessage && QueryMessage.map((item)=>{
            
        return<div className="space-y-4 py-6 md:py-8" key={item._id}>
          <div className="grid gap-4">

            <a href="#" className="text-xl font-semibold text-gray-900 hover:underline dark:text-white">{item.Email}</a>
          </div>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item.Message}</p>
        </div>
            })
        }
    </div>
  </div>
</div>
</section>
    </>
  )
}
