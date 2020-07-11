import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  navOpen = true;
  constructor() {}

  ngOnInit(): void {}

  toggle(): void {
    this.navOpen = !this.navOpen;
  }
}
