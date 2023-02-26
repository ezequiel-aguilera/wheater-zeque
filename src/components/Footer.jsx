import React from 'react'
import { FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='flex flex-col items-center justify-center h-[50px] w-[400px] mt-8'>
            <p className='text-white'>Designed by Ezequiel Aguilera</p>
            <div className='flex text-white text-center text-[20px]'>
                <a className='px-5 py-2 hover:text-gray-400 transition'  href="https://www.instagram.com/ezeakd/" target={'_blank'}><FaInstagram /></a>
                <a className='px-5 py-2 hover:text-gray-400 transition'  href="https://github.com/ezequiel-aguilera" target={'_blank'}><FaGithub /></a>
                <a className='px-5 py-2 hover:text-gray-400 transition'  href="https://github.com/ezequiel-aguilera" target={'_blank'}><FaLinkedinIn/></a>
                
            </div>
        </div>
    )
}

export default Footer