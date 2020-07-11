import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentRegisterComponent } from './student-register/student-register.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
  {
    path: 'regsiter',
    component: StudentRegisterComponent,
  },
  {
    path: 'update/:id',
    component: StudentRegisterComponent,
  },
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
