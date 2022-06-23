import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditPageComponent } from './../components/edit-page/edit-page.component';
import { DashboardPageComponent } from './../components/dashboard-page/dashboard-page.component';
import { AdminLayoutComponent } from '../components/admin-layout/admin-layout.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { CreatePageComponent } from '../components/create-page/create-page.component';
import { SharedModule } from './shared.module';
import { AuthGuard } from '../services/auth.guard';
import { AlertComponent } from '../components/alert/alert.component';
import { AlertService } from '../services/alert.service';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
        {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
        {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
        {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
      ]}
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService]
})

export class AdminModule{

}
