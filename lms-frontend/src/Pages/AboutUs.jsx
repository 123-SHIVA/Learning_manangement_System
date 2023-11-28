import HomeLayout from "../Layout/Homelayout";
import aboutimage from "../assets/images/AboutImg.png";
import Apj from "../assets/images/APJAbdulKalam.png";
import billgates from "../assets/images/billgates.png";
import einstien from "../assets/images/einstien.png";
import Stevejobs from "../assets/images/Stevejobs.png";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and qualify education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. we are providing the platform for the aspiring teachers and
              students to share their skills ,creativity to each other
            </p>
          </section>

          <div className="w-1/2 h-1/2">
            <img
              className="w-2/3"
              id="test1"
              src={aboutimage}
              alt="aboutimage"
            />
          </div>
        </div>
      </div>

      <div className="w-full  my-16 flex flex-col justify-center items-center">
        <div className="carousel w-1/2  flex items-center  ">
          <div
            id="slide1"
            className="carousel-item relative w-full flex flex-col justify-center items-center "
          >
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img src={Apj} className="w-60 h-60  rounded-full  " />
              <p className="text-xl text-gray-200 m-1 text-center">
                {
                  "Let us sacrifice our today so that our children can have a better tomorrow"
                }
              </p>
              <h3 className="text-2xl font-semibold">Apj abdul kalam</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div
            id="slide2"
            className="carousel-item relative w-full flex flex-col justify-center items-center "
          >
            <img src={billgates} className="w-48 h-48 rounded-full " />
            <p className="text-xl text-gray-200 m-2 text-center">
              It's fine to celebrate success, but it is more important to heed
              the lessons of failure.
            </p>
            <h3 className="text-2xl font-semibold">billgates</h3>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide3"
            className="carousel-item relative w-full flex flex-col justify-center items-center "
          >
            <img src={einstien} className="w-48 h-48  rounded-full " />
            <p className="text-xl text-gray-200 m-2 text-center">
              Learn from yesterday, live for today, hope for tomorrow. ...
            </p>
            <h3 className="text-2xl font-semibold">Albert Einstien</h3>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide4"
            className="carousel-item relative w-full flex flex-col justify-center items-center "
          >
            <img src={Stevejobs} className="w-48 h-48 rounded-full  " />
            <p className="text-xl text-gray-200 m-2 text-center">
              Your time is limited, so don't waste it living someone else's
              life. ...
            </p>
            <h3 className="text-2xl font-semibold">Stevjobs</h3>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
