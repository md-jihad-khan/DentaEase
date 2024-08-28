import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    img: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Excellent service! The team was professional and delivered exactly what I wanted. Highly recommend for anyone needing quality web development.",
    rating: 5,
    date: "2024-08-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    review:
      "Great experience working with this developer. They were very responsive and made sure everything was perfect. The end result exceeded my expectations.",
    rating: 4.8,
    date: "2024-08-15",
  },
  {
    id: 3,
    name: "Emily Johnson",
    img: "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Fantastic work! The website is not only beautiful but also user-friendly. The team was easy to communicate with and delivered on time.",
    rating: 5,
    date: "2024-08-10",
  },
  {
    id: 4,
    name: "Michael Brown",
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Good job overall. The project was completed to my satisfaction, although there were some minor delays. I would still recommend them for their quality of work.",
    rating: 4.5,
    date: "2024-08-05",
  },
  {
    id: 5,
    name: "Sophia Davis",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Amazing developer! They understood my needs perfectly and delivered a website that was exactly what I envisioned. Will definitely work with them again.",
    rating: 5,
    date: "2024-07-28",
  },
  {
    id: 6,
    name: "Daniel Wilson",
    img: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "I'm very satisfied with the service. The website is fast, responsive, and looks great on all devices. Communication was clear and consistent throughout the project.",
    rating: 4.9,
    date: "2024-07-22",
  },
  {
    id: 7,
    name: "Olivia Martinez",
    img: "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "The developer was very knowledgeable and provided great suggestions to improve the project. The final product was delivered on time and exceeded my expectations.",
    rating: 5,
    date: "2024-07-15",
  },
  {
    id: 8,
    name: "James Anderson",
    img: "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "The service was okay, but I had some issues with the communication. The project turned out fine, but there was a bit of a learning curve to get what I wanted.",
    rating: 4.0,
    date: "2024-07-05",
  },
  {
    id: 9,
    name: "Emma Lee",
    img: "https://images.pexels.com/photos/1853103/pexels-photo-1853103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Outstanding work! The website looks amazing, and the process was smooth from start to finish. I highly recommend them for any web development needs.",
    rating: 5,
    date: "2024-06-30",
  },
  {
    id: 10,
    name: "William Taylor",
    img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review:
      "Professional and efficient. The developer delivered exactly what I needed, and the project was completed ahead of schedule. Will hire again.",
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
    <div className="p-4 border rounded shadow-md w-72 rounded-lg flex flex-col items-center border-sky-200">
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
            duration: 30,
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
