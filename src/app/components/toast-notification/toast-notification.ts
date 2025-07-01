import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Notification, ToastMessage } from '../../services/notification';

@Component({
  selector: 'app-toast-notification',
  imports: [ CommonModule ],
  templateUrl: './toast-notification.html',
  styleUrl: './toast-notification.css'
})
export class ToastNotification implements OnInit, OnDestroy {
  toasts: ToastMessage[] = [];
  private subscription?: Subscription;

  constructor(private notificationService: Notification) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.toasts$.subscribe(
      toasts => this.toasts = toasts
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  removeToast(id: string): void {
    this.notificationService.removeToast(id);
  }

  getToastTitle(type: ToastMessage['type']): string {
    switch (type) {
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'info': return 'Info';
      default: return 'Notification';
    }
  }

  trackByToastId(index: number, toast: ToastMessage): string {
    return toast.id;
  }
}
