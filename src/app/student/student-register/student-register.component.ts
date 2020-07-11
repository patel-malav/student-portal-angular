import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StudentDataService, Student } from '../student-data.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.less'],
})
export class StudentRegisterComponent implements OnInit {
  studentForm: FormGroup;

  value: Student;

  error = false;
  succsess = false;
  loading = false;

  // tslint:disable-next-line: typedef
  get f() {
    return this.studentForm.controls;
  }

  constructor(
    fb: FormBuilder,
    route: ActivatedRoute,
    private data: StudentDataService
  ) {
    this.studentForm = fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(128),
        ],
      ],
      rollNo: [
        null,
        [Validators.required, Validators.min(1), Validators.max(5000)],
      ],
      age: [
        null,
        [Validators.required, Validators.min(13), Validators.max(100)],
      ],
      gender: ['male', [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(256),
        ],
      ],
      date: [null, [Validators.required]],
    });

    route.params
      .pipe(
        take(1),
        switchMap((params) => {
          if (params.id) {
            return data.getStudent(params.id).pipe(take(1));
          } else {
            return of(null);
          }
        })
      )
      .subscribe((value) => {
        if (value) {
          this.value = value;
          const formData = { ...value };
          formData.gender = formData.isMale ? 'male' : 'female';
          delete formData.isMale;
          delete formData.id;
          console.log(formData);
          this.studentForm.setValue(formData);
        }
      });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading = true;
    if (!this.value) {
      this.data.postStudent(this.studentForm.value).subscribe(
        (_) => {
          this.loading = false;
          this.succsess = true;
        },
        (err) => {
          console.log(err);
          this.error = true;
        }
      );
    } else {
      this.data.updateStudent(this.value.id, this.studentForm.value).subscribe(
        (_) => {
          this.loading = false;
          this.succsess = true;
        },
        (err) => {
          console.log(err);
          this.error = true;
        }
      );
    }
  }
}
