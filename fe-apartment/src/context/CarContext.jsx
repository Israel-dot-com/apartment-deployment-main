import React, { createContext, useContext, useState, useCallback } from 'react';

const CarContext = createContext();

// Mock data for cars (moved from CarCat component)
const mockCars = {
  'Suv': [
    {
      id: 1,
      type: '2014 Toyota Corolla',
      location: 'Gwarinpa, Abuja',
      posted: 'Posted 1 month ago',
      amount: 45000,
      rating: 4.8,
      isNew: false
    },
    {
      id: 2,
      type: '2016 Toyota Prado',
      location: 'Maitama, Abuja',
      posted: 'Posted 3 weeks ago',
      amount: 65000,
      rating: 4.6,
      isNew: true
    },
    {
      id: 3,
      type: '2017 Toyota Land Cruiser',
      location: 'Wuse 2, Abuja',
      posted: 'Posted 2 weeks ago',
      amount: 35000,
      rating: 4.5,
      isNew: false
    }
  ],
  'Sedan': [
    {
      id: 4,
      type: '2009 Honda Accord',
      location: 'Garki, Abuja',
      posted: 'Posted 1 week ago',
      amount: 25000,
      rating: 4.3,
      isNew: false
    },
    {
      id: 5,
      type: '2010 Honda Pilot',
      location: 'Asokoro, Abuja',
      posted: 'Posted 2 months ago',
      amount: 40000,
      rating: 4.7,
      isNew: false
    },
    {
      id: 6,
      type: '2009 Toyota Camry',
      location: 'Kubwa, Abuja',
      posted: 'Posted 1 month ago',
      amount: 20000,
      rating: 4.2,
      isNew: true
    }
  ],
  'Van': [
    {
      id: 7,
      type: '2018 Toyota Hiace',
      location: 'Gwarinpa, Abuja',
      posted: 'Posted 2 months ago',
      amount: 85000,
      rating: 4.9,
      isNew: false
    },
    {
      id: 8,
      type: '2019 Ford Transit',
      location: 'Maitama, Abuja',
      posted: 'Posted 1 month ago',
      amount: 120000,
      rating: 4.8,
      isNew: true
    },
    {
      id: 9,
      type: '2018 Toyota Camry',
      location: 'Jahi, Abuja',
      posted: 'Posted 3 weeks ago',
      amount: 70000,
      rating: 4.6,
      isNew: false
    }
  ],
};

const exploreCarsData = [
  {
    id: 16,
    type: '2009 Toyota Camry',
    location: 'Gwarinpa, Abuja',
    posted: 'Posted 2 months ago',
    amount: 55000,
    rating: 6.0,
    isNew: false
  },
  {
    id: 17,
    type: '2009 Toyota Camry',
    location: 'Maitama, Abuja',
    posted: 'Posted 1 month ago',
    amount: 75000,
    rating: 5.8,
    isNew: true
  },
  {
    id: 18,
    type: '2009 Toyota Camry',
    location: 'Asokoro, Abuja',
    posted: 'Posted 3 weeks ago',
    amount: 90000,
    rating: 5.9,
    isNew: false
  },
  {
    id: 19,
    type: '2009 Toyota Camry',
    location: 'Wuse 2, Abuja',
    posted: 'Posted 1 week ago',
    amount: 45000,
    rating: 5.7,
    isNew: false
  },
  {
    id: 20,
    type: '2009 Toyota Camry',
    location: 'Jahi, Abuja',
    posted: 'Posted 2 weeks ago',
    amount: 110000,
    rating: 6.0,
    isNew: true
  },
  {
    id: 21,
    type: '2009 Toyota Camry',
    location: 'Garki, Abuja',
    posted: 'Posted 1 month ago',
    amount: 52000,
    rating: 4.8,
    isNew: false
  },
  {
    id: 22,
    type: '2009 Toyota Camry',
    location: 'Kubwa, Abuja',
    posted: 'Posted 3 weeks ago',
    amount: 38000,
    rating: 4.5,
    isNew: false
  },
  {
    id: 23,
    type: '2009 Toyota Camry',
    location: 'Central Area, Abuja',
    posted: 'Posted 1 week ago',
    amount: 35000,
    rating: 4.6,
    isNew: true
  },
  {
    id: 24,
    type: '2009 Toyota Camry',
    location: 'Lugbe, Abuja',
    posted: 'Posted 2 weeks ago',
    amount: 65000,
    rating: 4.7,
    isNew: false
  },
  {
    id: 25,
    type: '2009 Toyota Camry',
    location: 'Wuse, Abuja',
    posted: 'Posted 1 month ago',
    amount: 28000,
    rating: 4.3,
    isNew: false
  },
  {
    id: 26,
    type: '2009 Toyota Camry',
    location: 'Maitama, Abuja',
    posted: 'Posted 2 months ago',
    amount: 85000,
    rating: 4.9,
    isNew: true
  },
  {
    id: 27,
    type: '2009 Toyota Camry',
    location: 'Asokoro, Abuja',
    posted: 'Posted 1 week ago',
    amount: 150000,
    rating: 5.0,
    isNew: false
  }
];

export const CarProvider = ({ children }) => {
  const [likedCars, setLikedCars] = useState(new Set());

  const toggleLike = useCallback((carId) => {
    setLikedCars(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(carId)) {
        newLiked.delete(carId);
      } else {
        newLiked.add(carId);
      }
      return newLiked;
    });
  }, []);

  const isCarLiked = useCallback((carId) => {
    return likedCars.has(carId);
  }, [likedCars]);

  const value = {
    allCars: mockCars,
    exploreCars: exploreCarsData,
    likedCars,
    toggleLike,
    isCarLiked
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
};