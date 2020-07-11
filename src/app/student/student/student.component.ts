import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentDataService, Student } from '../student-data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less'],
})
export class StudentComponent implements OnInit {
  success = false;
  error = false;
  constructor(public data: StudentDataService, public router: Router) {}

  ngOnInit(): void {
    // Get all data for table
    this.data.getStudents();
  }

  /*
   * Delete Any Entry
   */
  delete(id: string): void {
    console.log(id);
    this.data.deleteStudent(id).subscribe((_) => {
      this.success = true;
    });
  }
}
