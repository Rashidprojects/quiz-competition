import logo from '../assets/final_logo.png'
import brand from '../assets/logo-name.png'
import { Link } from 'react-router-dom';


const Navbar = () => {
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

        <div className="flex items-center">
          <button className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-[100px] h-[35px] text-center flex items-center justify-center">Signin</button>
        </div>

      </div>
    </>
  )
}

export default Navbar