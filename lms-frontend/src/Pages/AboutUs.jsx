import HomeLayout from "../Layout/Homelayout";
import aboutimage from '../assets/images/aboutimage.avif'
import Apj from '../assets/images/apj.png'
import billgates from '../assets/images/billgates.png'
import einstien from '../assets/images/einstien.png'
import nelsonmandela from '../assets/images/nelsonmandela.png'


function AboutUs(){
    return(
        <HomeLayout>

     
        
        <div className="pl-20 pt-20 flex flex-col text-white">
            <div className="flex items-center gap-5 mx-10">
                <section className="w-1/2 space-y-10">
                    <h1 className="text-5xl text-yellow-500 font-semibold">
                        Affordable and qualify education
                    </h1>
                    <p className="text-xl text-gray-200">
                        Our goal is to provide the affordable and quality education to  the world. 
                        we are providing the platform for the aspiring teachers and students 
                        to share their skills ,creativity to each other
                    </p>

                </section>

                <div className="w-1/2">
                    <img className="h-[50%]" id="test1" src={aboutimage} alt="aboutimage" />
                </div>
            </div>

        </div>

        <div className="carousel w-1/2 my-16 m-auto">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={Apj} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src={billgates} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src={einstien} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src={nelsonmandela} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
        </HomeLayout>
        
    )
}

export default AboutUs;