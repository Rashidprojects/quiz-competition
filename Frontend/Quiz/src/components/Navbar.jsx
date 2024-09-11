import logo from '../assets/final_logo.png'
import brand from '../assets/logo-name.png'

const Navbar = () => {
  return (
    <>
      <div className="px-5 flex gap-5 justify-between">
        <div className="flex gap-5">
          <div className='flex justify-evenly'>
            <img src={logo} alt=""  className='w-[190px]'/>
          </div>
          <ul className="flex list-none gap-4 font-semibold text-1xl items-center">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Rules</li>
            <li className="cursor-pointer">Result</li>
          </ul>
        </div>

        <div className="flex">
          <button className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-[100px] h-[35px] text-center flex items-center justify-center">Signin</button>
        </div>

      </div>
    </>
  )
}

export default Navbar