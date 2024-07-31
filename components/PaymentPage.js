"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession();
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Payment has been made !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)
    }, [])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async (params) => {
        let u = await fetchuser(username)
        setCurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        // Get the order Id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative'>
                <img className='object-cover h-[325px] w-full' src={currentUser.coverpic} alt="" />
                <div className='absolute flex justify-center -bottom-20 w-full rounded-full overflow-hidden size-36'>
                    <img className='rounded-full object-cover border-2 border-white size-36' width={128} height={128} src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center mt-24 gap-2">
                <div className='font-bold text-xl'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} get a chai !
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments | ₹ {payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>
            </div>

            <div className="bg-white h-1 opacity-10 my-5"></div>

            <div className="payment flex gap-5 w-[80%] mx-auto my-10 flex-col md:flex-row">
                <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg md:p-10 px-3 py-7">
                    {/* Show list of all the supporters as a leaderboard */}
                    <h2 className='text-2xl font-bold my-5'>Supporters</h2>
                    <ul className='mx-2 text-lg'>
                        {payments.length == 0 && <li>No payments yet.</li>}
                        {payments.map((p, i) => {
                            return <li key={i} className='my-4 flex gap-3 items-center'>
                                <img src="avatar1.gif" width={40} alt="user avatar" className='rounded-full outline outline-black bg-[#ebe6ef]' />
                                <span>{p.name} donated <span className='font-bold'>₹ {p.amount}</span> with a message "{p.message}"</span>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg md:p-10 px-3 py-7">
                    <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                    <div className="flex flex-col gap-3">
                        {/* Input for name and message */}
                        <input type="text" name='name' onChange={handleChange} value={paymentform.name} className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                        <input type="text" name='message' onChange={handleChange} value={paymentform.message} className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                        <input type="text" name='amount' onChange={handleChange} value={paymentform.amount} className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                        <button type="button" onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-purple-400 disabled:to-blue-400 disabled:cursor-default w-full" disabled={paymentform.name?.length < 1 || paymentform.message?.length < 1 || paymentform.amount < 1}>Pay</button>
                    </div>
                    {/* Or choose from these amounts */}
                    <div className='flex flex-col md:flex-row gap-2 mt-5'>
                        <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                        <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                        <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage