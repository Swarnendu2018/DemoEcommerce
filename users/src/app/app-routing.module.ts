import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigupLoginComponent } from './components/sigup-login/sigup-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path:'', redirectTo:'/login', pathMatch:'full'
  },
  { path:'login', component:SigupLoginComponent },
  { 
    path:'dashboard', 
    component:DashboardComponent,
    canActivate: [authGuard]
  },
  { path:'**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
