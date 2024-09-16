import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    img: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "The best dental experience I've ever had! The staff was incredibly professional, and they made me feel comfortable throughout my entire visit. I highly recommend this clinic to anyone looking for top-notch dental care.",
    rating: 5,
    date: "2024-08-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    review:
      "I had a wonderful experience at this dental office. The hygienist was very thorough, and the dentist provided great advice on how to improve my oral health. I'll definitely be returning.",
    rating: 4.8,
    date: "2024-08-15",
  },
  {
    id: 3,
    name: "Emily Johnson",
    img: "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Amazing service! The clinic is clean, modern, and well-equipped. The dentist was friendly and explained everything in detail, which made me feel at ease. Highly recommend!",
    rating: 5,
    date: "2024-08-10",
  },
  {
    id: 4,
    name: "Michael Brown",
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Good overall experience. The treatment was effective, and the staff was friendly, although the appointment took longer than expected. I would still recommend them for their quality care.",
    rating: 4.5,
    date: "2024-08-05",
  },
  {
    id: 5,
    name: "Sophia Davis",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "This dental clinic is outstanding! They understood my concerns and provided a treatment plan that fit my needs perfectly. I couldn't be happier with the results. Will definitely come back.",
    rating: 5,
    date: "2024-07-28",
  },
  {
    id: 6,
    name: "Daniel Wilson",
    img: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Very satisfied with my visit. The dentist was knowledgeable, and the entire staff was very welcoming. My teeth have never looked better!",
    rating: 4.9,
    date: "2024-07-22",
  },
  {
    id: 7,
    name: "Olivia Martinez",
    img: "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "The dentist was very skilled and offered great tips for maintaining my dental health. The clinic was clean, and the staff was friendly. The final results exceeded my expectations.",
    rating: 5,
    date: "2024-07-15",
  },
  {
    id: 8,
    name: "James Anderson",
    img: "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "The service was decent, but I had some issues with the communication. The dental work turned out fine, but the process could have been smoother.",
    rating: 4.0,
    date: "2024-07-05",
  },
  {
    id: 9,
    name: "Emma Lee",
    img: "https://images.pexels.com/photos/1853103/pexels-photo-1853103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Outstanding dental care! My teeth feel great, and the entire process was painless. I highly recommend this clinic to anyone in need of quality dental services.",
    rating: 5,
    date: "2024-06-30",
  },
  {
    id: 10,
    name: "William Taylor",
    img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Professional and efficient. The dentist delivered exactly what I needed, and the treatment was completed ahead of schedule. Will return for future check-ups.",
    rating: 5,
    date: "2024-06-20",
  },
];

const ReviewCard = ({ name, review, rating, date, img }) => {
  // Function to generate star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div className="p-4 border  shadow-md w-72 rounded-lg flex flex-col items-center border-sky-200">
      <img className="rounded-full w-20 h-20 object-cover" src={img} alt="" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-500">{date}</p>
      <div className="flex items-center">{renderStars(rating)}</div>
      <p className="mt-2 text-gray-700 line-clamp-3">{review}</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <section className="text-center mt-20">
      <h4 className="text-center text-5xl font-bold text-sky-500">
        Service <span className="text-black">Reviews</span>
      </h4>
      <p className=" text-center text-gray-600 font-thin text-sm mt-6 mb-10">
        Prevention is the foundation of a healthy smile. Our preventive dental
        care services focus on stopping problems before they start. <br /> With
        regular check-ups, professional cleanings, and expert advice on oral
        hygiene, we help you keep your teeth and gums healthy, preventing
        cavities, gum disease, and other dental issues
      </p>
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] max-w-[1200px] mx-auto">
        <motion.div
          className="flex my-5 gap-20 pr-20 items-center "
          animate={{
            translateX: "-50%",
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
            duration: 35,
          }}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
