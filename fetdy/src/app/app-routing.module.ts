import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './post/create/create.component';
import { ListComponent } from './post/list/list.component';
import { LandingPageComponent } from './dashboards/landing-page/landing-page.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'welcome', component: LandingPageComponent },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'home', component: ListComponent },
  { path: 'edit/:postId', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'fitness', loadChildren: './sidenav/sidenav-routing.module#SidenavRoutingModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
