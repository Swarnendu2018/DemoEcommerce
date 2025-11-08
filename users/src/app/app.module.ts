import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigupLoginComponent } from './components/sigup-login/sigup-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OfferSlidesComponent } from './components/common/offer-slides/offer-slides.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/common/product-card/product-card.component';
import { ReactiveFormsModule } from '@angular/forms';

// Adding Interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/http-interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SigupLoginComponent,
    DashboardComponent,
    NavbarComponent,
    PageNotFoundComponent,
    OfferSlidesComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
