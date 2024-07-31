"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})
    useEffect(() => {
        getData()
        if (!session) {
            router.push('/login')
        }
        else{
            getData()
        }
    }, [router, session])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let a = await updateProfile(e, session.user.name)
        // alert("Profile Updated.")
        toast('Profile Updated !', {
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
            <div className='container mx-auto px-5'>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>
                <form className='max-w-2xl mx-auto' action={handleSubmit}>
                    {/* input for name */}
                    <div className="my-2">
                        <label htmlFor="name" className='block mb-2 text-sm font-medium text-white'>Name</label>
                        <input type="text" value={form.name ? form.name : ""} onChange={handleChange} name='name' id='name' className='block w-full p-1 border rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-white'>Email</label>
                        <input type="text" value={form.email ? form.email : ""} onChange={handleChange} name='email' id='email' className='block w-full p-1 border rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input for username */}
                    <div className="my-2">
                        <label htmlFor="username" className='block mb-2 text-sm font-medium text-white'>Username</label>
                        <input type="text" value={form.username ? form.username : ""} onChange={handleChange} name='username' id='username' className='block w-full p-1 border rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input for profile picture of input type text */}
                    <div className="my-2">
                        <label htmlFor="profilepic" className='block mb-2 text-sm font-medium text-white'>Profile Picture</label>
                        <input type="text" value={form.profilepic ? form.profilepic : ""} onChange={handleChange} name='profilepic' id='profilepic' className='block w-full p-1 border rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input for cover pic */}
                    <div className="my-2">
                        <label htmlFor="coverpic" className='block mb-2 text-sm font-medium text-white'>Cover picture</label>
                        <input type="text" value={form.coverpic ? form.coverpic : ""} onChange={handleChange} name='coverpic' id='coverpic' className='block w-full p-1 border rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input razorpay id */}
                    <div className="my-2">
                        <label htmlFor="razorpayid" className='block mb-2 text-sm font-medium text-white'>Razorpay ID</label>
                        <input type="text" value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} name='razorpayid' id='razorpayid' className='block w-full p-1 border rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* input razorpay secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className='block mb-2 text-sm font-medium text-white'>Razorpay Secret</label>
                        <input type="text" value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} name='razorpaysecret' id='razorpaysecret' className='block w-full p-1 border rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    {/* Submit Button */}
                    <div className="my-6">
                        <button type='submit' className='block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard
