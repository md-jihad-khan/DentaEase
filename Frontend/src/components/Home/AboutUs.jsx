import { Link } from "react-router-dom";
import doctor from "../../assets/about.png";
import doctor2 from "../../assets/doctor2.png";
import CountUp from "react-countup";
import { FaArrowRight } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="my-10 mt-20 md:w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* img */}
        <div className="md:w-1/2 relative p-5">
          <img src={doctor} className="rounded-2xl " alt="" />
          <img
            src={doctor2}
            className="rounded-2xl absolute w-1/3 bottom-2 right-2 border-8 border-sky-50  "
            alt=""
          />
        </div>
        {/* content */}
        <div className="md:w-1/2 ml-3 md:ml-10 space-y-4 lg:space-y-5 xl:space-y-10">
          <h4 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-sky-500 mt-5 md:mt-0">
            About <span className="text-black">Us</span>
          </h4>
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
            Commitment to your smile's health and beauty
          </h3>
          <p className="font-normal">
            The goal of our clinic is to provide friendly, caring dentistry and
            the highest level of general, cosmetic, and specialist dental
            treatments. With dental practices throughout the world.
          </p>

          <div className="flex flex-col gap-3 md:flex-row border-t md:h-32 border-b justify-between ">
            <div className="flex gap-5 items-center">
              <CountUp
                duration={2.75}
                className="text-4xl xl:text-5xl font-bold text-sky-500 "
                enableScrollSpy
                start={0}
                end={98}
                suffix="%"
              />
              <p>invisalign treatment complete</p>
            </div>
            <div className="flex gap-5 items-center">
              <CountUp
                duration={2.75}
                start={0}
                className="text-4xl xl:text-5xl font-bold text-sky-500  min-w-24"
                end={100}
                enableScrollSpy
                suffix="%"
              />
              <p>patient satisfaction rate</p>
            </div>
          </div>

          <Link className="btn rounded-3xl bg-sky-500 text-white flex gap-3 ">
            More About Us <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
