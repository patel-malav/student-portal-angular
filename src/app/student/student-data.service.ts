import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { map, tap, switchMap, switchMapTo } from 'rxjs/operators';

import { environment } from '../../environments/environment';

// API Response Interface
export interface Student {
  id?: string;
  rollNo: number;
  name: string;
  age: number;
  email: string;
  date: null | string;
  isMale: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StudentDataService {
  // Keep track of students
  private students: Student[] = [];
  // Subject to push updated data
  students$ = new ReplaySubject<Student[]>();
  constructor(private http: HttpClient) {}

  // GET Request to get all data
  getStudents(): void {
    this.http
      .get<Student[]>(environment.api, { observe: 'body' })
      .subscribe((data) => {
        this.students = data;
        this.students.sort((a, b) => a.rollNo - b.rollNo);
        this.students$.next(this.students);
      });
  }

  // Get a single student from stored result or else GET Request from API
  getStudent(id: string): Observable<Student> {
    if (this.students.length) {
      return this.students$.pipe(
        map((students) => students.find((student) => student.id === id))
      );
    } else {
      return this.http
        .get<Student[]>(`${environment.api}/${id}`)
        .pipe(map((v) => v[0]));
    }
  }

  // POST Request
  postStudent(student: Student): Observable<string> {
    return this.http.post<string>(environment.api, student).pipe(
      tap((id) => {
        const newStudent = { ...student, id };
        this.students.push(newStudent);
        this.students$.next(this.students);
      })
    );
  }

  // PUT Request for API
  updateStudent(id: string, fields: any): Observable<any> {
    const idx = this.students.findIndex((student) => student.id === id);
    const isMale = fields?.gender === 'male' ? true : false;
    const updatedstudent = { ...this.students[idx], ...fields, isMale };
    return this.http.put<any>(`${environment.api}/${id}`, updatedstudent).pipe(
      tap((_) => {
        this.students.splice(idx, 1, updatedstudent);
        this.students$.next(this.students);
      })
    );
  }

  // DELETE Request
  deleteStudent(id: string): Observable<any> {
    const idx = this.students.findIndex((student) => student.id === id);
    return this.http.delete(`${environment.api}/${id}`).pipe(
      tap((_) => {
        this.students.splice(idx, 1);
        this.students$.next(this.students);
      })
    );
  }
}
