import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomList } from './pages/room-list/room-list';
import { ToastNotification } from './components/toast-notification/toast-notification';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RoomList, ToastNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'hotel-booking';
}
