import { Link } from "react-router-dom";
import HomeLayout from "../Layout/Homelayout";
import homepageimage from "../assets/images/homepageimage.png"

function HomePage(){
     return(
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh] ">
               

                <div className="text-5xl font-semibold ">
                    <h1 className="text-5xl font-semibold">

                    Find out best
                    <span className="text-yellow-500 font-bold">
                        online Courses
                    </span>
                    </h1>
                    <p className="text-lg w-1/2 text-gray-200 my-1">
                        We have large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>

                    <div className="space-x-6">
                        <Link to="/courses">
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer 
                            hover:bg-yellow-600 transition-all ease-in-out">
                                Explore courses
                            </button>
                        </Link>
                        <Link to="/contact">
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer 
                            hover:bg-yellow-600 transition-all ease-in-out">
                                Contact us
                            </button>
                        </Link>
                    </div>

                    
                </div>

                <div className="w-1/2 flex items-center justify-center">

                    <img src={homepageimage} alt="Homepage image" />

                </div>

            </div>
        </HomeLayout>
     )
}

export default HomePage;