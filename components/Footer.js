import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='bg-gray-900 text-white flex justify-center items-center px-5 h-16'>
            <p>Copyright &copy; {currentYear} | Get Me a Chai ! - All Rights Reserved.</p>
        </footer>
    )
}

export default Footer
