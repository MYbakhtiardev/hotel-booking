import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class Roomservice {

  constructor() { }

    private mockRooms: Room[] = [
    {
      id: '1',
      name: '101',
      type: 'Single',
      price: 99,
      isAvailable: true,
      description: 'Cozy single room with city view',
      amenities: ['WiFi', 'AC', 'TV'],
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
    },
    {
      id: '2',
      name: '102',
      type: 'Double',
      price: 149,
      isAvailable: true,
      description: 'Spacious double room with garden view',
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400'
    },
    {
      id: '3',
      name: '103',
      type: 'Suite',
      price: 299,
      isAvailable: false,
      description: 'Luxury suite with panoramic view',
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi'],
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'
    },
    {
    id: '4',
    name: '201',
    type: 'Single',
    price: 89,
    isAvailable: true,
    description: 'Comfortable single room on second floor',
    amenities: ['WiFi', 'AC', 'TV'],
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400'
  },
  {
    id: '5',
    name: '202',
    type: 'Double',
    price: 169,
    isAvailable: true,
    description: 'Premium double room with balcony',
    amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Balcony'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
  },
  {
    id: '6',
    name: '301',
    type: 'Suite',
    price: 349,
    isAvailable: true,
    description: 'Executive suite with separate living area',
    amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Living Area', 'Work Desk'],
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400'
  }
  ];

  getRooms(): Observable<Room[]> {
    return of(this.mockRooms).pipe(delay(500));
  }

  getRoomById(id: string): Observable<Room | undefined> {
    const room = this.mockRooms.find(r => r.id === id);
    return of(room).pipe(delay(200));
  }

  updateRoomAvailability(roomId: string, isAvailable: boolean): Observable<boolean> {
    const room = this.mockRooms.find(r => r.id === roomId);
    if (room) {
      room.isAvailable = isAvailable;
      return of(true).pipe(delay(300));
    }
    return of(false);
  }
}
