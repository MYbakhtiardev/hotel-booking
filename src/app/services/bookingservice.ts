import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class Bookingservice {
    private bookings: Booking[] = [];

  constructor() {
    this.loadBookingsFromStorage();
  }

  createBooking(booking: Omit<Booking, 'id' | 'bookingDate'>): Observable<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: this.generateId(),
      bookingDate: new Date()
    };
    
    this.bookings.push(newBooking);
    this.saveBookingsToStorage();
    
    return of(newBooking).pipe(delay(500));
  }

  getBookings(): Observable<Booking[]> {
    return of(this.bookings).pipe(delay(200));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private saveBookingsToStorage(): void {
    localStorage.setItem('hotel-bookings', JSON.stringify(this.bookings));
  }

  private loadBookingsFromStorage(): void {
    const stored = localStorage.getItem('hotel-bookings');
    if (stored) {
      this.bookings = JSON.parse(stored);
    }
  }

}
