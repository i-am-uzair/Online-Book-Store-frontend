"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function page() {
  const router = useRouter()
  // const [totalAmmount, settotalAmmount] = useState()
  const [Ammount, setAmmount] = useState([])
  const [cartItem, setcartItem] = useState([])
  const [count, setcount] = useState(0)
  // for stripe
  const [message, setMessage] = useState("");

  // remove the cart item logic
  const handleRemoveCart = async(id)=>{
    const result= await axios.patch(`http://localhost:3001/removeToCart`,{id:id},{withCredentials:true})
    toast.success(result.data.message);
    setcount(count+1)
  }

  // for stripe
  const checkOutHandle = async()=>{
    try {
      const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY}`,
      }
      // console.log(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY)      
      const res =await axios.post('http://localhost:3001/create-checkout-session',cartItem,{withCredentials:true,headers})
      console.log(res)
      window.location = res.data.url
    } catch (error) {
      console.log(error)
    }
  }
  //  set the carts items when page is load
  useEffect(() => {
    const getProduct=async()=>{
      // console.log(uid)
      const userAuth = await axios.get("http://localhost:3001/AuthUser",{withCredentials:true})
      if(userAuth.data.Status===true){
        const res = await axios.get(`http://localhost:3001/getUserCart`,{withCredentials:true})
        console.log(res)
        setcartItem(res.data.books)
        // router.push('http://localhost:3000')
      }else{
        router.push('http://localhost:3000/Login')
      }
     
   
      // console.log(userbook)
     
    }
    return () => {
      getProduct()
    }
  }, [count])

  // this is the code that calculate the total Ammount of the cart item
  const calculateTotalAmount = (cartItem) => {
    let total = 0;
    cartItem.forEach((item) => {
      console.log(item.Price)
      total += Number(item.Price);
    });
    return total;
  };

  // this is the calling of total ammount logic function
  const totalAmount = calculateTotalAmount(cartItem)

  return (
    <>

    <div className="h-4/6 bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      {
        cartItem && cartItem.map((item)=>{
          return(
        <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={item.url} alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{item.BookName}</h2>
              <p className="mt-1 text-xs text-gray-700">{item.Price}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                {/* <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" placeholder={item.length} min="1" disabled />
                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span> */}
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">{item.Price}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={()=>handleRemoveCart(item._id)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div> )
      })
    }
        {/* <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
              <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
            </div>
            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" min="1" />
                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">259.000 ₭</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* <!-- Sub total --> */}
      {
        
        cartItem && cartItem.length >0 ? <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          {/* <p className="text-gray-700">{Ammount}</p> */}
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          {/* <p className="text-gray-700">{totalAmmount}</p> */}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <p>{totalAmount}</p>
          <div className="">
            <p className="mb-1 text-lg font-bold"></p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={checkOutHandle}>Check out</button>
      </div>
      
      :""
    }
    </div>
  </div>



  
</>
  )
}
