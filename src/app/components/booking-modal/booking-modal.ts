import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../models/room';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-booking-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-modal.html',
  styleUrl: './booking-modal.css'
})
export class BookingModal implements OnInit{
  @Input() isVisible = false;
  @Input() selectedRoom: Room | null = null;
  @Output() bookingConfirmed = new EventEmitter<Omit<Booking, 'id' | 'bookingDate'>>();
  @Output() cancelled = new EventEmitter<void>();

  bookingForm!: FormGroup;
  isSubmitting = false;
  minDate: string;
  minCheckOutDate: string = '';

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      guestName: ['', [Validators.required, Validators.minLength(2)]],
      checkInDate: ['', [Validators.required]],
      checkOutDate: ['', [Validators.required]]
    });

    // Update min checkout date when checkin changes
    this.bookingForm.get('checkInDate')?.valueChanges.subscribe(checkInDate => {
      if (checkInDate) {
        const checkIn = new Date(checkInDate);
        checkIn.setDate(checkIn.getDate() + 1);
        this.minCheckOutDate = checkIn.toISOString().split('T')[0];
        
        // Validate checkout date
        this.bookingForm.get('checkOutDate')?.updateValueAndValidity();
      }
    });

    // Add custom validator for checkout date
    this.bookingForm.get('checkOutDate')?.setValidators([
      Validators.required,
      (control) => {
        const checkInDate = this.bookingForm?.get('checkInDate')?.value;
        const checkOutDate = control.value;
        
        if (checkInDate && checkOutDate && new Date(checkOutDate) <= new Date(checkInDate)) {
          return { invalidDate: true };
        }
        return null;
      }
    ]);
  }

  get totalNights(): number {
    const checkIn = this.bookingForm.get('checkInDate')?.value;
    const checkOut = this.bookingForm.get('checkOutDate')?.value;
    
    if (checkIn && checkOut) {
      const diffTime = new Date(checkOut).getTime() - new Date(checkIn).getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  }

  get totalPrice(): number {
    return this.totalNights * (this.selectedRoom?.price || 0);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bookingForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.bookingForm.valid && this.selectedRoom) {
      this.isSubmitting = true;
      
      const formValue = this.bookingForm.value;
      const booking: Omit<Booking, 'id' | 'bookingDate'> = {
        roomId: this.selectedRoom.id,
        guestName: formValue.guestName,
        checkInDate: new Date(formValue.checkInDate),
        checkOutDate: new Date(formValue.checkOutDate),
        totalPrice: this.totalPrice
      };

      setTimeout(() => {
        this.bookingConfirmed.emit(booking);
        this.isSubmitting = false;
        this.resetForm();
      }, 1000);
    }
  }

  onCancel(): void {
    this.cancelled.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.bookingForm.reset();
    this.isSubmitting = false;
  }

}
