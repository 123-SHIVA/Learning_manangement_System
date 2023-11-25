import { AiFillCloseCircle } from 'react-icons/ai';

import {FiMenu} from "react-icons/fi"
import {Link, useNavigate } from "react-router-dom"
import Footer from "../Components/Footer"
import {useDispatch,useSelector} from "react-redux"




function HomeLayout({children}){


    const dispatch =useDispatch();
    const navigate=useNavigate();

    //for checking if user is logged in 
    const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn);

    //for displaying the options acc to role
    const role=useSelector((state)=>state?.auth?.role)

function changeWidth(){
    const drawerSide=document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width="auto";
}

function hideDrawer(){
    const element =document.getElementsByClassName('drawer-toggle');
    element[0].checked=false;

    const drawerSide=document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width=0;
}

const handleClick=(e)=>{
    e.preventDefault();

    //const res=await disPatch(logout());

    // if(res?.payload?.success)

    navigate('/')

}

    return (
        <div className="min-h-{90vh}">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input type="checkbox" className="drawer-toggle " id='my-drawer' />
                <div className="drawer-content">
                    <label htmlFor='my-drawer' className='cursor-pointer relative'>
                        <FiMenu
                        onClick={changeWidth}
                        size={"32px"}
                        className="font-bold text-white m-4"
                        />
                    </label>
                </div>
                <div className='drawer-side w-0'>
                    <label htmlFor='my-drawer' className='drawer-overlay'>
                      
                    </label>
                    <ul className='menu p-4 w-46 h-[100%] sm:w-80 bg-base-300 text-base-content relative'>
                        <li className='w-fit absolute right-2 z-50'>
                            <button onClick={hideDrawer}>
                            <AiFillCloseCircle/>

                            </button>

                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {isLoggedIn && role ==="ADMIN" &&(
                            <li>
                                <Link to="/admin/dashboard">Admin DashBoard</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact us</Link>
                        </li>
                        <li>
                            <Link to="/about">About us</Link>
                        </li>

                        {
                            !isLoggedIn && (
                                <li className='absolute bottom-4 w-[90%]'>
                                <div className='w-full flex itmes-center justify-center'>
                                    <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full bg-blue-300'>

                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full bg-red-400'>

                                        <Link to="/login">Signup</Link>
                                    </button>

                                </div>
                        </li>
                            )
                        }
                    

                        {
                            isLoggedIn && (
                                <li className='absolute bottom-4 w-[90%]'>
                                <div className='w-full flex itmes-center justify-center'>
                                    <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full bg-blue-300'>

                                        <Link to="/user/profile">Profile</Link>
                                    </button>
                                    <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full bg-red-400'>

                                        <Link onClick={handleClick}>Logout</Link>
                                    </button>

                                </div>
                        </li>
                            )
                        }
                    

                    

                    </ul>
                </div>
            </div>

            {children}
            <Footer/>
        </div>
    
    )
}




export default HomeLayout;