export enum Category {
  YACHTS = 'Yachts',
  PHOTOGRAPHY = 'Photography',
  VENUES = 'Venues',
  DJS = 'DJs',
  CHEFS = 'Chefs',
}

export interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
  isTopPro: boolean;
}

export interface Review {
  rating: number;
  count: number;
}

export interface Listing {
  id: string;
  title: string;
  category: Category;
  location: string;
  imageUrl: string;
  price: number;
  priceUnit: 'hour' | 'event' | 'day';
  provider: Provider;
  review: Review;
  isInstantBookable: boolean;
  maxGuests?: number;
}

export interface SearchQuery {
  location: string;
  service: string;
  guests: string;
}

export interface BannerSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface FilterValues {
  minPrice: number | string;
  maxPrice: number | string;
  minRating: number;
  isTopPro: boolean;
  isInstantBookable: boolean;
}