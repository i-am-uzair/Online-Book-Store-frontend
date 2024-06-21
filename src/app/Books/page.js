"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Link from 'next/link';

export default function page() {

  
        const [data, setdata] = useState([])
        
        const getAllproduct = async()=>{
          const res = await axios.get('http://localhost:3001/books')
        //   const res = await data.data.json()
        // console.log(res.data)
          setdata(res.data)
          console.log(res.data)
          // console.log(data.data) 
        }
      
        useEffect(() => {  
         getAllproduct();
        }, [])
  return (
    <>
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
          {
            
            data.map((item,index)=>{
              return <div className="lg:w-1/4 md:w-1/2 p-4 w-full  bg-gray-50 " key={item._id}>
              <Link href={`/Books/${item._id}`} className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-auto block"
                  src={item.url}
                  // src="https://5.imimg.com/data5/SELLER/Default/2022/11/OF/VG/DS/92261648/men-hoodies-jacket.png"
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {item.Bookcategory}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                 {item.BookName}
                </h2>
                <span>

                    {/* <RatingCom></RatingCom> */}
                </span>
              </div>
            </div>
                
            })
            
          }
          </div>
        </div>
      </section>
    </>
  )
}
