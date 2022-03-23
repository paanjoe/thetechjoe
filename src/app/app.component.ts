import { Component } from '@angular/core';
import * as Helper from './helper/enum';
import data from './helper/stack.json';
import experiences from './helper/experiences.json';
import featured from './helper/featured.json';
import { GithubService } from './services/github.service';
import { Github } from './model/github';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Global Var
  public helper: any = Helper.helper;
  public currentYear: number = new Date().getFullYear();
  public stackList = (<any>data).data;
  public expList = (experiences).experiences;
  public expPosition: string = '';
  public expJobScope: any = [];
  public featured = (<any>featured).featured;
  public gh_repos: Github[] = [];

  constructor(
    private githubServices: GithubService
  ) {}


  ngOnInit() {
    this.viewexp(this.expList[0].position, this.expList[0].jobscope);
    this.githubServices.getAll().subscribe((response: Github[]) => {
      response = response.filter((data) => {
        return data.fork === false;
      });
      // this.gh_repos.push(...response.slice(0,4));
      this.gh_repos.push(...response);
      console.log(this.gh_repos)
    })
  }

  viewexp(position: string, jobscope: any) {
    this.expPosition = position;
    this.expJobScope = jobscope;
  }
  
  copyToClipboard(data: any) {
    const htmlElement = document.createElement('textarea');
    htmlElement.value = 'Git clone ' + data;
    document.body.appendChild(htmlElement);
    htmlElement.select();
    document.execCommand('copy');
    document.body.removeChild(htmlElement);
  }
}
