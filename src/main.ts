import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//add
import 'zone.js';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { CalendarComponent } from './app/components/calendar/calendar.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, CalendarModule],
  bootstrap: [CalendarComponent],
})
export class BootstrapModule {}

platformBrowserDynamic()
  .bootstrapModule(BootstrapModule)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    // if (window['ngRef']) {
    //   window['ngRef'].destroy();
    // }
    // window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
//end


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
