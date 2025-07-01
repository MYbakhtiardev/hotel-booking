import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, startWith, combineLatest, BehaviorSubject } from 'rxjs';

import { Room } from '../../models/room';
import { Booking } from '../../models/booking';
import { Roomservice } from '../../services/roomservice';
import { Bookingservice } from '../../services/bookingservice';
import { Notification } from '../../services/notification';

import { RoomCard } from '../../components/room-card/room-card';
import { BookingModal } from '../../components/booking-modal/booking-modal';
import { RoomFilter, FilterCriteria } from '../../components/room-filter/room-filter';


@Component({
  selector: 'app-room-list',
  imports: [ CommonModule, RoomCard, BookingModal, RoomFilter ],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css'
})
export class RoomList implements OnInit {
  rooms$!: Observable<Room[]>;
  filteredRooms$!: Observable<Room[]>;
  
  private filtersSubject = new BehaviorSubject<FilterCriteria>({
    searchTerm: '',
    roomType: '',
    priceRange: '',
    availabilityOnly: false
  });

  isLoading = true;
  showBookingModal = false;
  selectedRoom: Room | null = null;

  constructor(
    private roomService: Roomservice,
    private bookingService: Bookingservice,
    private notificationService: Notification
  ) {}

  ngOnInit(): void {
    this.loadRooms();
    this.setupFiltering();
  }

  private loadRooms(): void {
    this.isLoading = true;
    this.rooms$ = this.roomService.getRooms();
    
    // Simulate loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }

  private setupFiltering(): void {
    this.filteredRooms$ = combineLatest([
      this.rooms$,
      this.filtersSubject.asObservable()
    ]).pipe(
      map(([rooms, filters]) => this.applyFilters(rooms, filters))
    );
  }

  private applyFilters(rooms: Room[], filters: FilterCriteria): Room[] {
    let filtered = [...rooms];

    // Search term filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(searchTerm) ||
        room.type.toLowerCase().includes(searchTerm) ||
        room.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Room type filter
    if (filters.roomType) {
      filtered = filtered.filter(room => room.type === filters.roomType);
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(room => {
        switch (filters.priceRange) {
          case '0-100':
            return room.price >= 0 && room.price <= 100;
          case '101-200':
            return room.price >= 101 && room.price <= 200;
          case '201-300':
            return room.price >= 201 && room.price <= 300;
          case '300+':
            return room.price > 300;
          default:
            return true;
        }
      });
    }

    // Availability filter
    if (filters.availabilityOnly) {
      filtered = filtered.filter(room => room.isAvailable);
    }

    return filtered;
  }

  onFiltersChanged(filters: FilterCriteria): void {
    this.filtersSubject.next(filters);
  }

  openBookingModal(room: Room): void {
    this.selectedRoom = room;
    this.showBookingModal = true;
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    this.selectedRoom = null;
  }

  onBookingConfirmed(bookingData: Omit<Booking, 'id' | 'bookingDate'>): void {
    this.bookingService.createBooking(bookingData).subscribe({
      next: (booking) => {
        // Update room availability
        this.roomService.updateRoomAvailability(booking.roomId, false).subscribe(() => {
          this.loadRooms(); // Refresh rooms
        });

        this.notificationService.showSuccess(
          `Room ${this.selectedRoom?.name} booked successfully for ${bookingData.guestName}!`
        );
        
        this.closeBookingModal();
      },
      error: (error) => {
        this.notificationService.showError(
          'Failed to book the room. Please try again.'
        );
        console.error('Booking error:', error);
      }
    });
  }

  trackByRoomId(index: number, room: Room): string {
    return room.id;
  }

}
