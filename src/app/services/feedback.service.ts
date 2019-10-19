import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }
  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
