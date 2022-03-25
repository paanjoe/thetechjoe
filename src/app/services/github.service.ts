import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { helper } from '../helper/enum';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${environment.gh_token}`
    })
  }

  public apiURL: string = helper.GH_API_URL;
  public gh_token: string  = environment.gh_token;


  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

 sendEmail(name: string, email: string, subject: string, message: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.httpClient.post(helper.FORMSPRING_LINK, {
    name: name, replyto: email, message: message, subject: subject
  }, {headers: headers }).pipe(catchError(this.errorHandler));
 }

}
