import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface Booking {
  bookingId: string;
  travelDate: string;
  mobile: string;
  seats: string[];
  boarded: boolean;
}

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.page.html',
  styleUrls: ['./booking-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingListPage implements OnInit {

  selectedDate: string = '';
  bookings: Booking[] = [];
  loggedInMobile: string = '';

  constructor(private router: Router,
      private location: Location
  ) {}
 
ngOnInit() {
  const data = localStorage.getItem('bookings');
  this.bookings = data ? JSON.parse(data) : [];
  console.log('All Bookings:', this.bookings); 

  const loggedInMobile = localStorage.getItem('loggedInMobile');
  if (loggedInMobile) {
    this.loggedInMobile = loggedInMobile;
    console.log('Logged-in Mobile:', this.loggedInMobile);
  }

  const lastDate = localStorage.getItem('lastBookedDate');
  if (lastDate) this.selectedDate = lastDate;
}

  getFilteredBookings(): Booking[] {
    if (!this.selectedDate) return [];
    return this.bookings.filter(b => b.travelDate === this.selectedDate);
  }

  toggleBoarding(booking: Booking) {
    booking.boarded = !booking.boarded;
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }

  goBack() {
    localStorage.setItem('lastBookedDate', this.selectedDate);

    const lastBooking = this.getFilteredBookings().pop();
    if (lastBooking) {
      localStorage.setItem('lastBooking', JSON.stringify(lastBooking));
    }

  this.location.back();  }
}