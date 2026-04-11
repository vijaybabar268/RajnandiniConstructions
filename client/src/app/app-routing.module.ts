import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SiteComponent } from './admin/site/site.component';
import { AccountComponent } from './admin/account/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AccountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sites', component: SiteComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
