import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInputCustomEvent,InputInputEventDetail } from '@ionic/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingPage {
goToList() {
throw new Error('Method not implemented.');
}
mobile: any;
onMobileInput($event: IonInputCustomEvent<InputInputEventDetail>) {
throw new Error('Method not implemented.');
}
allowOnlyDigits($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
isMobileValid() {
throw new Error('Method not implemented.');
}
travelDate: any;
onDateChange() {
throw new Error('Method not implemented.');
}
selectedSeats: any;
seats: any;
isSeatBooked(_t68: any) {
throw new Error('Method not implemented.');
}
toggleSeat(_t68: any) {
throw new Error('Method not implemented.');
}
canSubmitBooking() {
throw new Error('Method not implemented.');
}
submitBooking() {
throw new Error('Method not implemented.');
}
}
