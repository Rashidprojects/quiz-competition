import { useEffect, useState } from 'react';
import logo from '../assets/final_logo.png'
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
  const [user,setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [settings,setSettings] = useState(false)  
  const [userIcon, setUserIcon] = useState(null)
  const [bgColor, setBgColor] = useState('')
  const navigation = useNavigate()
  
  console.log("current bg is : ", bgColor);
  

  const handleSettings = () => {
    setSettings(!settings)
  }

 
  const handleSignout = () => {
    auth.signOut()
    setSettings(false)
  }

  // Function to generate a random hex color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user)

      if(user) {
        // Fetch the username from firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username) //set the username
          // set user first letter as icon 
          setUserIcon(userData.username.charAt(0).toUpperCase());

          // set random background color for each user
          if(!userData.bgColor) {
            const randomColor = getRandomColor()
            setBgColor(randomColor)

            await setDoc(doc(db, 'users', user.uid), { bgColor: randomColor }, { merge:true } )
          }else {
            setBgColor(userData.bgColor)
          }
          
        }
      }
    })
    return () => unsubscribe();
  },[])

  // Only log if userIcon has a value
  useEffect(() => {
    if (userIcon) {
      console.log("User first letter is:", userIcon);
    }
  }, [userIcon]); 
  
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
            <>
              <div>welcome, {username}</div>

              <div className='cursor-pointer z-10 text-1xl font-medium flex items-center justify-center rounded-full w-[35px] h-[35px] text-white'
                style={{ backgroundColor: bgColor }}
                onClick={handleSettings}
               >
               {userIcon}
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