import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.page.html',
  styleUrls: ['./test2.page.scss'],
})
export class Test2Page implements OnInit {

  constructor(private route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
      const queryParams = this.route.snapshot.queryParams;
      const snapshot = this.route.snapshot.params;
      this.route.queryParams.subscribe(res => {
          debugger;
      });
      this.route.params.subscribe(res => {
          debugger;
      });
      debugger;
  }

}
