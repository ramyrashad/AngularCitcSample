import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {


  constructor(private router: Router
    , @Inject(DOCUMENT) private document: Document) {
      debugger;
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }
}

