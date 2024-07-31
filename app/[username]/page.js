import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import User from '@/models/User'
import { notFound } from 'next/navigation'
import connectDB from '@/db/connectDb'

const Username = async ({ params }) => {

  // If the username is not present in the , show a 404 page.
  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me a Chai`,
  }
}