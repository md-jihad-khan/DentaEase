import img1 from "../../assets/faq1.png";
import img2 from "../../assets/faq2.png";
import img3 from "../../assets/faq3.png";
import { LuPhoneCall } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const Faq = () => {
  return (
    <section className="my-10 mt-20 md:w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* content */}
        <div className="md:w-1/2 ml-3 md:ml-10 space-y-4 lg:space-y-5 xl:space-y-10">
          <h4 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-sky-500 mt-5 md:mt-0">
            How it <span className="text-black">work</span>
          </h4>
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
            Understanding the patient journey
          </h3>

          <div className="join join-vertical w-full  ">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                Do You accept the insurance ?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, we accept most major dental insurance plans. Please
                  contact us to verify your coverage.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                What services do you offer ?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, we accept most major dental insurance plans. Please
                  contact us to verify your coverage.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                How ofter should i visit dentist ?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, we accept most major dental insurance plans. Please
                  contact us to verify your coverage.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="bg-white  rounded-xl p-4 inline-flex items-center gap-4"
            animate={{
              x: [0, 15, 0], // Moves to 20px right and then back to 0px
            }}
            transition={{
              duration: 1.5, // Adjust the speed of the animation
              ease: "easeInOut",
              repeat: Infinity, // Infinite loop
            }}
          >
            <LuPhoneCall className="text-5xl text-sky-500 " />
            <div className="space-y-2 text-lg">
              <p className="">We always take care of your smile</p>
              <span className="font-semibold text-2xl">24/7 Emergency</span>
              <h5>23489023-328374</h5>
            </div>
          </motion.div>
        </div>
        {/* img */}
        <div className="md:w-1/2 relative gap-5 grid grid-cols-2 p-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 bg-white flex gap-3 items-center p-2 lg:p-4 rounded-xl ">
            <FaUserDoctor className="text-white bg-sky-500  w-10 h-10 p-2 rounded-full" />
            <div>
              <CountUp
                duration={2.75}
                start={0}
                className="text-2xl xl:text-4xl font-bold text-sky-500  min-w-24"
                end={15}
                enableScrollSpy
                suffix="+"
              />
              <p className="font-semibold"> Expert Doctor</p>
            </div>
          </div>
          <img src={img1} alt="" className="rounded-lg" />
          <img src={img2} alt="" className="rounded-lg" />
          <img src={img3} alt="" className="col-span-2 rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Faq;
