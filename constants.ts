import { Club, Match, Booking, UserProfile, Slot } from './types';

export const CLUBS: Club[] = [
  {
    id: '1',
    name: 'Padel Pro Arena',
    area: 'Downtown',
    rating: 4.8,
    pricePerHour: 40,
    imageUrl: 'https://picsum.photos/id/10/800/600',
    type: 'Indoor',
    courts: 8,
  },
  {
    id: '2',
    name: 'Sunny Courts Club',
    area: 'Beachside',
    rating: 4.5,
    pricePerHour: 35,
    imageUrl: 'https://picsum.photos/id/14/800/600',
    type: 'Outdoor',
    courts: 6,
  },
  {
    id: '3',
    name: 'Elite Padel Center',
    area: 'Uptown',
    rating: 4.9,
    pricePerHour: 55,
    imageUrl: 'https://picsum.photos/id/17/800/600',
    type: 'Private',
    courts: 4,
  },
  {
    id: '4',
    name: 'City Smashers',
    area: 'Midtown',
    rating: 4.2,
    pricePerHour: 30,
    imageUrl: 'https://picsum.photos/id/28/800/600',
    type: 'Indoor',
    courts: 12,
  },
];

export const MATCHES: Match[] = [
  {
    id: 'm1',
    clubName: 'Padel Pro Arena',
    date: 'Today',
    time: '18:00',
    level: 'Intermediate (3.5)',
    joined: 3,
    totalSpots: 4,
    isJoined: false,
  },
  {
    id: 'm2',
    clubName: 'Sunny Courts Club',
    date: 'Tomorrow',
    time: '10:00',
    level: 'Advanced (5.0)',
    joined: 2,
    totalSpots: 4,
    isJoined: false,
  },
  {
    id: 'm3',
    clubName: 'City Smashers',
    date: 'Wed, Oct 24',
    time: '19:30',
    level: 'Beginner (2.0)',
    joined: 1,
    totalSpots: 4,
    isJoined: true,
  },
];

export const BOOKINGS: Booking[] = [
  {
    id: 'b1',
    clubId: '1',
    clubName: 'Padel Pro Arena',
    date: 'Oct 20, 2023',
    time: '18:00 - 19:30',
    court: 'Court 3',
    status: 'Confirmed',
    price: 60,
  },
  {
    id: 'b2',
    clubId: '2',
    clubName: 'Sunny Courts Club',
    date: 'Oct 15, 2023',
    time: '09:00 - 10:30',
    court: 'Center Court',
    status: 'Confirmed',
    price: 52.5,
  },
];

export const USER: UserProfile = {
  name: 'Abdulaziz Aisari',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  rating: 4.2,
  matchesPlayed: 48,
  matchesWon: 28,
  winRate: 58,
};

// Generate slots helper
export const generateSlots = (basePrice: number): Slot[] => {
  const times = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00'];
  return times.map((time, index) => ({
    id: `slot-${index}`,
    time,
    court: `Court ${Math.floor(Math.random() * 5) + 1}`,
    available: Math.random() > 0.4,
    price: basePrice,
  }));
};