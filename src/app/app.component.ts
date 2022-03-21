import { Component } from '@angular/core';
import * as Helper from './helper/enum';
import data from './helper/stack.json';
import experiences from './helper/experiences.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public helper: any = Helper.helper;
  public currentYear: number = new Date().getFullYear();
  public stackList = (<any>data).data;
  public expList = (experiences).experiences;
  public expPosition: string = '';
  public expJobScope: any = [];


  ngOnInit() {
    this.viewexp(this.expList[0].position, this.expList[0].jobscope)
  }

  viewexp(position: string, jobscope: any) {
    this.expPosition = position;
    this.expJobScope = jobscope;
    console.log(this.expJobScope[0].item)
  }
}
