import { Component } from '@angular/core';
import * as Helper from './helper/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public helper: any = Helper.helper;
  public currentYear: number = new Date().getFullYear();
}
