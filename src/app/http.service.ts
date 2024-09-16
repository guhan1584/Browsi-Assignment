import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Domain, Publisher } from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:4300/api';

  constructor(private http: HttpClient) {}

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${this.apiUrl}/publishers`);
  }

  postPublishers(publisherInput: string): Observable<Publisher> {
    return this.http.post<Publisher>(`${this.apiUrl}/publishers`, {
      publisher: publisherInput,
    });
  }

  getDomains(publisherInput: string): Observable<Domain[]> {
    let params = new HttpParams().set('publisherInData', publisherInput);
    return this.http.get<Domain[]>(`${this.apiUrl}/domains`, { params });
  }
}
