import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDataService } from '../student-data.service';
import { switchMapTo, switchMap } from 'rxjs/operators';

/**
 * @todo This component can be further expanded
 */

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.less'],
})
export class StudentDashboardComponent implements OnInit {
  constructor(private route: ActivatedRoute, public data: StudentDataService) {}

  student = this.route.params.pipe(
    switchMap(({ id }: { id: string }) => this.data.getStudent(id))
  );
  ngOnInit(): void {}
}
