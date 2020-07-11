import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

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
  private students: Student[] = [];
  students$ = new ReplaySubject<Student[]>();
  constructor(private http: HttpClient) {}

  getStudents(): void {
    this.http
      .get<Student[]>(environment.api, { observe: 'body' })
      .subscribe((data) => {
        this.students = data;
        this.students.sort((a, b) => a.rollNo - b.rollNo);
        this.students$.next(this.students);
      });
  }

  getStudent(id: string): Observable<Student> {
    return this.students$.pipe(
      map((students) => students.find((student) => student.id === id))
    );
  }

  postStudent(student: Student): Observable<string> {
    return this.http.post<string>(environment.api, student).pipe(
      tap((id) => {
        const newStudent = { ...student, id };
        this.students.push(newStudent);
        this.students$.next(this.students);
      })
    );
  }

  updateStudent(id: string, fields: any): Observable<any> {
    const idx = this.students.findIndex((student) => student.id === id);
    const isMale = fields?.gender === 'male' ? true : false;
    const updatedstudent = { ...this.students[idx], ...fields, isMale };
    return this.http.put<any>(`${environment.api}/${id}`, updatedstudent).pipe(
      tap((_) => {
        console.log(_);
        this.students.splice(idx, 1, updatedstudent);
        this.students$.next(this.students);
      })
    );
  }

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
