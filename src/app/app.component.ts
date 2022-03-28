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
  public name_contact: string = '';
  public email_contact: string = '';
  public subject_contact: string = '';
  public message_contact: string = '';
  public isLoading: boolean = false;
  public contactSuccess: boolean = false;
  public contactFailed: boolean = false;
  public invalidInput: boolean = false;
  public invalidEmail: boolean = false;
  public btnContactLoading: boolean = false;

  constructor(
    private githubServices: GithubService
  ) {}


  ngOnInit() {
    // Loading Page
    this.startloading();
    
    this.viewexp(this.expList[0].position, this.expList[0].jobscope);
    this.githubServices.getAll().subscribe((response: Github[]) => {
      response = response.filter((data) => {
        return data.fork === false;
      });
      // this.gh_repos.push(...response.slice(0,4));
      this.gh_repos.push(...response);
      console.log(this.gh_repos)
    });


  }

  startloading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
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

  contactUs(name: string, email: string, subject: string, message: string) {
    this.btnContactLoading = true;

    if (name != '' && email != '' && subject != '' && message != '') {
      let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let checkEmail = regexp.test(email);

      if (checkEmail === false) {
        this.invalidEmail = true;
        this.btnContactLoading = false
        setTimeout(() => {
          this.invalidEmail = false;
        }, 3000);
      } else {
        this.githubServices.sendEmail(name, email, subject, message).subscribe((response) => {
          this.contactSuccess = true;
          this.btnContactLoading = false
          setTimeout(() => {
            this.contactSuccess = false;
          }, 3000);
        }, (err) => {
          this.contactFailed = true;
          this.btnContactLoading = false
          setTimeout(() => {
            this.contactFailed = false;
          }, 3000);
        });
      }
    } else {
      this.invalidInput = true;
      this.btnContactLoading = false
      setTimeout(() => {
        this.invalidInput = false;
      }, 3000);
    }
  }

  closeModal(data: any) {
    this.contactSuccess = false;
    this.contactFailed = false;
    this.invalidEmail = false;
    this.invalidInput = false;
  }
}
