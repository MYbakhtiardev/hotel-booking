export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  bookingDate: Date;
}