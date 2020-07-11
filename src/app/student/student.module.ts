import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentRegisterComponent,
    StudentComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StudentRoutingModule,
  ],
})
export class StudentModule {}
