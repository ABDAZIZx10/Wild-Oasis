export type Cabin = {
  id: number;
  created_at?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type CabinFormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File | string | FileList;
};

export type NewCabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File | string;
};

export type Guest = {
  id: number;
  created_at?: string;
  fullName: string;
  email: string;
  nationality?: string;
  nationalID?: string;
  countryFlag?: string;
};

export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  status: BookingStatus;
  totalPrice: number;
  cabinPrice?: number;
  extrasPrice?: number;
  hasBreakfast?: boolean;
  observations?: string;
  isPaid?: boolean;
  cabinId?: number;
  guestId?: number;
  cabins?: Pick<Cabin, "name"> | Cabin;
  guests?: Pick<Guest, "fullName" | "email"> | Guest;
};

export type Settings = {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export type BookingFilter = {
  field: string;
  value: string;
  method?: "eq" | "gte" | "lte" | "neq";
};

export type BookingSort = {
  field: string;
  direction: "asc" | "desc";
};

export type GetBookingsArgs = {
  filter?: BookingFilter | null;
  sortBy?: BookingSort;
  page?: number;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = {
  fullName: string;
  email: string;
  password: string;
};

export type UpdateUserPayload = {
  password?: string;
  fullName?: string;
  avatar?: File | null;
};
