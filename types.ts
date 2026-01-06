export interface Club {
  id: string;
  name: string;
  area: string;
  rating: number;
  pricePerHour: number;
  imageUrl: string;
  type: 'Indoor' | 'Outdoor' | 'Private';
  courts: number;
}

export interface Slot {
  id: string;
  time: string;
  court: string;
  available: boolean;
  price: number;
}

export interface Booking {
  id: string;
  clubId: string;
  clubName: string;
  date: string;
  time: string;
  court: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: number;
}

export interface Match {
  id: string;
  clubName: string;
  date: string;
  time: string;
  level: string; // e.g., "Intermediate (3.5-4.0)"
  joined: number;
  totalSpots: number;
  isJoined: boolean;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  rating: number;
  matchesPlayed: number;
  matchesWon: number;
  winRate: number;
}
