import React from 'react'
import {logout} from '../../store/authSlice';
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/config'


const Logoutbtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
   <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 
   round-full'>Logout</button>
  )
}

export default Logoutbtn