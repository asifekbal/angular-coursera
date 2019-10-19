import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { baseURL } from '../shared/baseurl';
import { Promotion } from '../shared/promotion';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getPromotions(): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getPromotion(id: string): Observable<Promotion> {
    return this.httpClient.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.httpClient.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}