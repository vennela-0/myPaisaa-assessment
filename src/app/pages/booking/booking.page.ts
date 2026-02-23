import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Booking {
  bookingId: string;
  travelDate: string;
  mobile: string;
  seats: string[];
  boarded: boolean;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingPage implements OnInit {

  mobile: string = '';
  travelDate: string = '';
  seats: string[] = [];
  selectedSeats: string[] = [];
  minDate: string = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.generateSeats();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  generateSeats() {
    const rows = 15;
    const cols = ['A', 'B', 'C', 'D'];
    this.seats = [];

    for (let i = 1; i <= rows; i++) {
      cols.forEach(col => {
        this.seats.push(col + i);
      });
    }
  }

  onDateChange() {
    this.selectedSeats = [];
  }

  isMobileValid(): boolean {
    return /^[0-9]{10}$/.test(this.mobile);
  }

  canSubmitBooking(): boolean {
    return (
      !!this.travelDate &&
      this.isMobileValid() &&
      this.selectedSeats.length > 0
    );
  }

  isSeatBooked(seat: string): boolean {
    if (!this.travelDate) return false;

    const bookings: Booking[] =
      JSON.parse(localStorage.getItem('bookings') || '[]');

    const selectedDate = this.travelDate.split('T')[0];

    return bookings.some(b =>
      b.travelDate.split('T')[0] === selectedDate &&
      b.seats.includes(seat)
    );
  }

  async toggleSeat(seat: string) {

    if (!this.travelDate) {
      const alert = await this.alertCtrl.create({
        header: 'Select Date',
        message: 'Please select travel date first.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.isMobileValid()) {
      const alert = await this.alertCtrl.create({
        header: 'Enter Mobile',
        message: 'Enter valid 10 digit mobile number first.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.isSeatBooked(seat)) {
      const alert = await this.alertCtrl.create({
        header: 'Seat Booked',
        message: `Seat ${seat} already booked.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats =
        this.selectedSeats.filter(s => s !== seat);
      return;
    }

    if (this.selectedSeats.length >= 6) {
      const alert = await this.alertCtrl.create({
        header: 'Limit Reached',
        message: 'Maximum 6 seats allowed.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.selectedSeats.push(seat);
  }

  async submitBooking() {
    if (!this.canSubmitBooking()) return;

    const bookingId = 'BKG' + Math.floor(Math.random() * 100000);

    const booking: Booking = {
      bookingId,
      travelDate: this.travelDate,
      mobile: this.mobile,
      seats: [...this.selectedSeats],
      boarded: false
    };

    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    localStorage.setItem('lastBookedDate', this.travelDate);
    localStorage.setItem('lastBooking', JSON.stringify(booking));

    const alert = await this.alertCtrl.create({
      header: 'Booking Confirmed!',
      message: `Date: ${this.travelDate ? this.travelDate.split('T')[0] : ''}\n` +
        `Mobile: ${this.mobile}\n` +
        `Seats: ${this.selectedSeats.join(', ')}`,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.selectedSeats = [];
          this.router.navigate(['/booking-list']);
        }
      }]
    });

    await alert.present();
  }

  goToList() {
    this.router.navigate(['/booking-list']);
  }
}