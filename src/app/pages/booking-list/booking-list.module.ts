import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.page.html',
  styleUrls: ['./booking-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingListPage {
selectedDate: any;
getFilteredBookings() {
throw new Error('Method not implemented.');
}
toggleBoarding(_t34: any) {
throw new Error('Method not implemented.');
}

}