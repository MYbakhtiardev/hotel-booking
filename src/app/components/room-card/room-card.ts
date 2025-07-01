import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/room';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule],
  templateUrl: './room-card.html',
  styleUrl: './room-card.css'
})
export class RoomCard {
  @Input() room!: Room;
  @Output() bookRoom = new EventEmitter<Room>();

  onBookRoom(): void {
    if (this.room.isAvailable) {
      this.bookRoom.emit(this.room);
    }
  }

}
