import React, { useState, useCallback } from 'react';
import { Heart, ChevronLeft, ChevronRight, Share2, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCar } from '../context/CarContext';

const carDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCarById, toggleLike, isCarLiked } = useCar();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get car data from context
  const car = getCarById(id);
  const isLiked = isCarLiked(parseInt(id));

  // Handle case where car is not found
  if (!car) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">car Not Found</h1>
          <p className="text-gray-600 mb-6">The car you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  }, [car.images.length, isAnimating]);

  const prevImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  }, [car.images.length, isAnimating]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: car.type,
        text: `Check out this ${car.type} in ${car.location}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = () => {
    toggleLike(car.id);
  };

  const handleTouchStart = (e) => {
    if (car.images.length <= 1) return;
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || car.images.length <= 1) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || car.images.length <= 1) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
    setDragOffset(0);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to listings</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="relative">
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
            {/* New Tag */}
            {car.isNew && (
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-md z-20">
                New
              </div>
            )}

            <div 
              className="relative w-full h-full cursor-grab select-none"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(-${currentImageIndex * 100}% + ${isDragging ? dragOffset : 0}px))`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                {car.images.map((image, idx) => (
                  <img 
                    key={idx}
                    src={image} 
                    alt={`${car.type} - Image ${idx + 1}`}
                    className="flex-shrink-0 w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {car.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={isAnimating}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-md transition-all duration-200 disabled:opacity-50 z-10"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  disabled={isAnimating}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-md transition-all duration-200 disabled:opacity-50 z-10"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentImageIndex(index);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                  disabled={isAnimating}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Row */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {car.images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentImageIndex(index);
                    setTimeout(() => setIsAnimating(false), 300);
                  }
                }}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* car Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{car.type}</h1>
            <p className="text-gray-600 flex items-center mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {car.location}
            </p>
            <p className="text-gray-500 text-sm">{car.posted}</p>
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ₦{car.amount.toLocaleString()}
              </span>
              <span className="text-gray-500 ml-1">Per Night</span>
            </div>
            <div className="flex items-center bg-tertiary px-3 py-2 rounded-full">
              <span className="text-primary mr-1">★</span>
              <span className="font-semibold text-primary">{car.rating}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all ${
                isLiked 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              <Heart 
                className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
              />
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-300 hover:border-primary hover:text-primary transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-3">About this place</h3>
            <p className="text-gray-600 leading-relaxed">
              {car.description || 'Beautiful car with modern amenities and excellent location.'}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {(car.amenities || ['WiFi', 'Air Conditioning', 'Parking', 'Security']).map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button className="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default carDetail;