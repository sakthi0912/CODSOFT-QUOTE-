import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'http://localhost:5000/api/quotes/random';

  constructor( private http : HttpClient) { }

  getQuote(){
    return this.http.get<any>(this.apiUrl);
  }
}
