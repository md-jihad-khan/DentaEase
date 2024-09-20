import { Link } from "react-router-dom";
import img1 from "../../assets/Banner1.png";
import img2 from "../../assets/Banner2.png";
import CountUp from "react-countup";
import { IoLocation } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

const Banner = () => {
  const [inView, setInView] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    const img = imageRef.current;
    if (img) observer.observe(img);
    return () => img && observer.unobserve(img);
  }, []);

  return (
    <section className="md:-mt-16 ">
      <div className="flex items-center justify-center flex-col-reverse md:flex-row w-10/12 mx-auto">
        <div className="md:w-1/2 mb-20 md:mt-20  md:p-10 p-4  space-y-5">
          <h3 className="font-bold text-3xl md:text-5xl lg:text-6xl">
            <span className="text-sky-500">Consult </span>
            Your Dental Health Issue
          </h3>

          <p className="md:text-sm  text-xs text-gray-500">
            Achieve a healthy, beautiful smile with our comprehensive dental
            care services. From routine cleanings and exams to advanced
            restorative treatments, we are committed to maintaining your oral
            health. Our experienced team provides personalized care in a
            comfortable, state-of-the-art environment, ensuring your teeth and
            gums remain in top condition.
          </p>
          <div className="flex  gap-8">
            <Link
              to={"/appointment"}
              className="btn rounded-3xl bg-sky-500 text-white "
            >
              Book a Appointment
            </Link>

            <h5 className="flex items-center gap-2">
              <IoLocation className="text-3xl text-sky-500" />{" "}
              <p className="font-light">Ponchoboti, Narayanganj</p>
            </h5>
          </div>
        </div>
        <div className="md:w-1/2 mt-5 md:mt-9 relative items-end gap-5 inline-flex ">
          <img
            ref={imageRef}
            className={`w-1/3 rounded-3xl ${inView ? "initial-animation" : ""}`}
            src={img2}
            alt="Image 2"
          />
          <img
            ref={imageRef}
            className={`w-2/3 rounded-3xl ${inView ? "initial-animation" : ""}`}
            src={img1}
            alt="Image 1"
          />
          <div
            className="absolute top-2 md:top-2 lg:top-4 w-1/2 text-center sm:p-2 md:p-0 lg:p-2 border
           border-sky-500  bg-sky-50 rounded-3xl "
          >
            <CountUp
              duration={2.75}
              start={0}
              className="text-lg sm:text-4xl xl:text-5xl font-bold text-sky-500  min-w-24"
              end={10}
              enableScrollSpy
              suffix="+"
            />
            <p className="text-sm sm:text-lg">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
