import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UnauthorizedInterceptor } from 'src/interceptors/unauthorized.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const SERVICES = [
  provideHttpClient(
    withInterceptors([
      UnauthorizedInterceptor,
    ]),
  ),
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [...SERVICES, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
