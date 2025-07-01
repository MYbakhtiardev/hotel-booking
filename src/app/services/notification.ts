import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class Notification {

  constructor() { }

  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  showSuccess(message: string, duration = 5000): void {
    this.addToast(message, 'success', duration);
  }

  showError(message: string, duration = 5000): void {
    this.addToast(message, 'error', duration);
  }

  showWarning(message: string, duration = 5000): void {
    this.addToast(message, 'warning', duration);
  }

  showInfo(message: string, duration = 5000): void {
    this.addToast(message, 'info', duration);
  }

  private addToast(message: string, type: ToastMessage['type'], duration: number): void {
    const toast: ToastMessage = {
      id: this.generateId(),
      message,
      type,
      duration
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.removeToast(toast.id), duration);
    }
  }

  removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(toast => toast.id !== id));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
