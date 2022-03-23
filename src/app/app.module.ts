import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GaugeModule } from 'angular-gauge';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpHeadersInterceptor } from './interceptors/http-headers-interceptor';
import { HttpErrorsInterceptor } from './interceptors/http-errors-interceptor';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [AppComponent, SearchBarComponent, HomeComponent, DetailsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GaugeModule.forRoot(),
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
