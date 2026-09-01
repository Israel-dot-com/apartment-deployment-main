import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import clean from "../assets/clean.svg";
import check from "../assets/calendar-check.svg";
import fresh from "../assets/freshener.svg";
import service from "../assets/service.svg";
import nigeria from "../assets/nigeria1.svg";
import rate from "../assets/rateStar.svg";
import star from "../assets/Star3.svg";



const ReviewsModal = ({ isOpen, onClose, propertyRating }) => {
  const [filterType, setFilterType] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Sample reviews data - you can replace this with your actual reviews
  const allReviews = [
    {
      id: 1,
      name: "Hannah",
      location: "Abuja, Nigeria",
      rating: "7.56",
      date: "February, 2025",
      comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore iste sequi temporibus commodi reiciendis error ab enim similique cupiditate, expedita nulla odio quaerat voluptatibus explicabo soluta eos saepe voluptate illo repudiandae blanditiis fugit alias suscipit sapiente. Delectus quia perspiciatis nostrum at nesciunt iste ab! Quos at sit, earum iste nulla voluptates fuga temporibus cupiditate alias eligendi rerum eius, reiciendis possimus facilis aliquid minus ducimus."
    },
    {
      id: 2,
      name: "James",
      location: "Lagos, Nigeria",
      rating: "8.21",
      date: "January, 2025",
      comment: "Exceptional service and amazing experience. The cleanliness was top-notch and the staff were very professional. I was impressed by the attention to detail and the seamless check-in process. The serenity of the place made my stay truly memorable. Would definitely recommend to anyone looking for quality accommodation."
    },
    {
      id: 3,
      name: "Sarah",
      location: "Port Harcourt, Nigeria",
      rating: "9.12",
      date: "December, 2024",
      comment: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described in the listing. The host was incredibly responsive and helpful throughout my stay. The property was spotless and well-maintained. I particularly enjoyed the peaceful environment which allowed me to relax completely."
    },
    {
      id: 4,
      name: "Michael",
      location: "Kano, Nigeria",
      rating: "6.85",
      date: "December, 2024",
      comment: "Good overall experience. The location was convenient and the check-in process was smooth. The apartment was clean and had all the necessary amenities. Would consider staying here again for future trips."
    },
    {
      id: 5,
      name: "Grace",
      location: "Lagos, Nigeria",
      rating: "7.92",
      date: "November, 2024",
      comment: "Very comfortable stay with excellent facilities. The host was accommodating and the property matched the description perfectly. The neighborhood was quiet and safe, which made the experience even better."
    },
    {
      id: 6,
      name: "Peter",
      location: "Oyo, Nigeria",
      rating: "8.45",
      date: "November, 2024",
      comment: "Fantastic place to stay! The apartment was beautifully decorated and very clean. All amenities worked perfectly and the host was very responsive to any questions. Highly recommend this property."
    },
    {
      id: 7,
      name: "Fatima",
      location: "Kaduna, Nigeria",
      rating: "9.01",
      date: "October, 2024",
      comment: "Amazing stay! Everything was perfect from check-in to check-out. The property exceeded my expectations in every way. The attention to detail was impressive and the location was ideal for my needs."
    },
    {
      id: 8,
      name: "David",
      location: "Ibadan, Nigeria",
      rating: "7.33",
      date: "October, 2024",
      comment: "Pleasant experience overall. The apartment was well-maintained and had everything I needed. The host was helpful and the location was convenient for exploring the city."
    },
    {
      id: 9,
      name: "Aisha",
      location: "Enugu, Nigeria",
      rating: "8.67",
      date: "September, 2024",
      comment: "Wonderful stay! The property was exactly as described and the host was very welcoming. The cleanliness standards were exceptional and I felt very comfortable throughout my stay."
    },
    {
      id: 10,
      name: "Emmanuel",
      location: "Calabar, Nigeria",
      rating: "9.23",
      date: "September, 2024",
      comment: "Absolutely loved this place! The apartment was beautifully furnished and spotlessly clean. The host went above and beyond to ensure I had everything I needed. Will definitely be back!"
    }
  ];

  // Filter reviews based on selected filter
  const getFilteredReviews = () => {
    let filtered = [...allReviews];
    
    if (filterType === 'recent') {
      // Sort by date (most recent first)
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return filtered;
  };

  // Function to get background color for profile initials
  const getProfileColor = (name) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const filteredReviews = getFilteredReviews();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <h2 className='text-lg md:text-xl font-bold'>Guest Reviews About This Apartment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* What Makes It Stand Out */}
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-lg md:text-xl font-bold mb-4">What Makes It Stand Out</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-0 md:flex md:items-center">
            <div className="md:border-r md:px-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <img src={clean} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                <p className="text-xs md:text-sm">Cleanliness</p>
              </div>
              <h3 className="font-bold mt-2 text-base md:text-lg">5.0</h3>
            </div>

            <div className="md:border-r md:px-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <img src={check} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                <p className="text-xs md:text-sm">Check-In</p>
              </div>
              <h3 className="font-bold mt-2 text-base md:text-lg">4.8</h3>
            </div>

            <div className="md:border-r md:px-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <img src={fresh} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                <p className="text-xs md:text-sm">Serenity</p>
              </div>
              <h3 className="font-bold mt-2 text-base md:text-lg">5.0</h3>
            </div>

            <div className="md:border-r md:px-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <img src={service} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                <p className="text-xs md:text-sm">Service</p>
              </div>
              <h3 className="font-bold mt-2 text-base md:text-lg">5.0</h3>
            </div>

            <div className="md:border-r md:px-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <img src={star} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                <p className="text-xs md:text-sm">Rating</p>
              </div>
              <h3 className="text-base md:text-lg mt-2 font-bold">{propertyRating}</h3>
            </div>

            <div className="md:px-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <img src={star} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                <p className="text-xs md:text-sm">Reviews</p>
              </div>
              <h3 className="text-base md:text-lg mt-2 font-bold">536</h3>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <div>
            <h3 className='font-semibold text-base md:text-lg'>Guest Reviews</h3>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 border rounded-full hover:bg-gray-50 transition-colors"
            >
              <span className="text-xs font-medium">
                {filterType === 'all' ? 'All Reviews' : 'Most Recent'}
              </span>
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
            </button>

            {showFilterDropdown && (
              <div className="absolute text-xs top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-[150px]">
                <button
                  onClick={() => {
                    setFilterType('all');
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                    filterType === 'all' ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  All Reviews
                </button>
                <button
                  onClick={() => {
                    setFilterType('recent');
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left text-xs px-4 py-2 hover:bg-gray-50 transition-colors ${
                    filterType === 'recent' ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  Most Recent
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[45vh] md:max-h-[50vh]">
          <div className="space-y-4 md:space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border-b pb-4 md:pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Profile Avatar */}
                  <div className={`flex items-center justify-center text-white w-8 h-8 md:w-10 md:h-10 rounded-full ${getProfileColor(review.name)} text-sm md:text-lg font-semibold flex-shrink-0`}>
                    {review.name.charAt(0)}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2 md:gap-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                        <span className="font-bold md:border-r-[1px] md:border-[#000] md:pr-2 text-sm">{review.name}</span>
                        <div className="flex items-center text-xs text-gray-600">
                          <img src={nigeria} alt="" className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="ml-1">{review.location}</span>
                        </div>
                      </div>
        
                      <div className='flex items-center gap-3 md:gap-5'>
                        <p className="text-xs font-semibold">
                          {review.date}
                        </p>
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-sm">{review.rating}</span>
                          <img src={rate} alt="" className="text-[#000]" />
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-xs leading-relaxed mb-3">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;