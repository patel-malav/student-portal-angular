import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentRegisterComponent } from './student-register/student-register.component';

const routes: Routes = [
  // Default Loaded Route redirect
  {
    path: '',
    component: StudentComponent,
  },
  // Add a Student
  {
    path: 'regsiter',
    component: StudentRegisterComponent,
  },
  // Update Form Data
  {
    path: 'update/:id',
    component: StudentRegisterComponent,
  },
  // Student Dashboard Route By id can be added
  {
    path: ':id',
    component: StudentDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
