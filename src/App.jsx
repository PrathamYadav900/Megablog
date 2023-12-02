import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import {Footer,Header} from './components/index'
import { Outlet } from 'react-router-dom';
import './App.css'

function App() {
 const [loading,setLoading]= useState(true)
const dispatch = useDispatch()

useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
      console.log("Hmm you were logged in ")
    }else{
      dispatch(logout())
      console.log("Ha-ha you were logged out")
    }
  }).finally(()=>setLoading(false)) 
},[])

  return !loading?(
    
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
         TODO: <Outlet/> 
        </main>
        <Footer/>     
      </div>
    </div>
  ): null
}

export default App
