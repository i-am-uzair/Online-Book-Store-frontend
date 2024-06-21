"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function AdminHomepage() {

    const router = useRouter();

    const [show, setshow] = useState(false)
    const [Income, setIncome] = useState()
    const [Users, setUsers] = useState()
    const [Orders, setOrders] = useState()

    useEffect(() => {
        const checkUser = async()=>{
          const res = await axios.get("http://localhost:3001/AdminAuth",{withCredentials:true})
          if(res.data.Status===true){
            setshow(true)
            const result = await axios.get("http://localhost:3001/dashboardDetails",{withCredentials:true})
            console.log(result)
            setIncome(result.data.income)
            setUsers(result.data.users)
            setOrders(result.data.orders)
          }else{
            // router.push('http://localhost:3000/Admin')
          }
        }
        return () => {
          checkUser()
        }
      }, [])


  return (
   <>
   {

   show?
      <div className="flex">
       <div className="container mx-auto mt-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total users
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                           {Users}
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Profit
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                        ₹ {Income}
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Orders
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            {Orders}
                        </div>
                    </div>
                </div>
            </div>
        </div>:
        <div className="flex overflow-hidden">
            <div className="container mx-auto mt-12 overflow-hidden">
                {/* <div className="grid grid-cols-1 mb-6 lg:grid-cols-2"> */}
                <img src='/image.svg' className='h-5/6 overflow-hidden'></img>
                    {/* <Image className='h-64' src="/image.svg" width={1100} height={1100} ></Image> */}
                {/* </div> */}
            </div>
        </div>
   }
   </>
  )
}
