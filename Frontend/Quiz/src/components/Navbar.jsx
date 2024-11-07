import { useContext, useEffect, useState } from 'react';
import logo from '../assets/final_logo.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';



const Navbar = () => {
  const [userData,setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [settings,setSettings] = useState(false)  
  const [bgColor, setBgColor] = useState('')
  const { state,dispatch } = useContext(UserContext)
  const navigation = useNavigate()
  
  console.log("current bg is : ", bgColor);
  

  useEffect(() => {
    const username = state?.username
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${username}/`);
        setUserData(response.data)

      } catch(err) {
        setError("Error fetching user data");
          console.error("Error fetching user data:", err);
      }
    };

    fetchUserData()
  }, [])

  const handleSettings = () => {
    setSettings(!settings)
  }


 
  const handleSignout = () => {
    dispatch({ type: 'SET_USERNAME', payload: '' })
    setSettings(false)
  }

  
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
          {state.username ? (
            <>
              <div>welcome, {userData?.username}</div>

              <div className='cursor-pointer z-10 text-1xl font-medium flex items-center justify-center rounded-full w-[35px] h-[35px] text-white'
                style={{ backgroundColor: userData?.bg_color || '' }}
                onClick={handleSettings}
               >
               {userData?.icon || ''}
              </div>
            </>
          ): (
            <>
            <button className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-[100px] h-[35px] text-center flex items-center justify-center">
          <Link to="/auth/login">Signin</Link> </button>
          </>
          )}

          
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