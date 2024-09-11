import { useEffect, useState } from 'react';
import logo from '../assets/final_logo.png'
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { IoSettingsOutline } from "react-icons/io5";



const Navbar = () => {
  const [user,setUser] = useState(null)
  const [settings,setSettings] = useState(false)

  console.log('current settings status is ', settings);
  

  const handleSettings = () => {
    setSettings(!settings)
  }

  const handleSignout = () => {
    auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe();
  },[])
  return (
    <>
      <div className="px-5 flex justify-between">
        <div className="flex ">
          <div className='flex justify-evenly'>
            <img src={logo} alt=""  className='w-[190px]'/>
          </div>
        </div>

        <div className='flex'>
          <ul className="flex list-none gap-4 font-semibold text-2xl items-center">
              <li className="cursor-pointer"><Link to="/">Home</Link></li>
              <li className="cursor-pointer"><Link to="/about">About</Link></li>
              <li className="cursor-pointer"><Link to="/rules">Rules</Link></li>
              <li className="cursor-pointer"><Link to="/result">Result</Link></li>
              <li className="cursor-pointer"><Link to="/contact">Contact</Link></li>
            </ul>
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <div>welcome, {user.email}</div>
          ): (
            <button className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-[100px] h-[35px] text-center flex items-center justify-center">
          <Link to="/auth/login">Signin</Link> </button>
          )}

          <div className='cursor-pointer z-10 text-3xl'
              onClick={handleSettings}
          >
            <IoSettingsOutline />
          </div>
          {settings && (
            <div className={` bg-white absolute w-[300px] h-screen top-0 right-0 py-8 transition-all duration-700 ease-in-out transform ${settings ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0' } `}>
              <div className='flex items-center justify-center'>
                <button className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer font-semibold'
                 onClick={handleSignout}
                >Sign out</button>
              </div>
            </div>
          )}
        </div>

        

      </div>
    </>
  )
}

export default Navbar