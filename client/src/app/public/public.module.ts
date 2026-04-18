import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // { path: 'sites', component: SitesComponent },
      // { path: 'services', component: ServicesComponent },
      // { path: 'about', component: AboutComponent },
      // { path: 'contact', component: ContactComponent }
    ]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    PublicLayoutComponent
    // SitesComponent,
    // ServicesComponent,
    // AboutComponent,
    // ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PublicModule { }
