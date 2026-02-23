import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/booking/booking.page').then(m => m.BookingPage)
  },
  {
    path: 'booking-list',
    loadComponent: () =>
      import('./pages/booking-list/booking-list.page').then(m => m.BookingListPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}