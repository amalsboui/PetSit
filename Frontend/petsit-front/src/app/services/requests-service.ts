import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Request} from '../data/requests.mock';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class RequestsService {

  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/requests';

  getSitterRequests(): Observable<Request[]>{
    return this.http.get<Request[]>(`${this.API_URL}/sitter`);
  }

  getOwnerRequests(): Observable<Request[]> {
      return this.http.get<Request[]>(`${this.API_URL}/owner`);
    }

  createRequest(data: Request): Observable<Request> {
    console.log('Mock Request:', data); 
    return this.http.post<Request>(`${this.API_URL}`, data);    
  }
  ///accept request function

  acceptRequest(id: number): Observable<Request> {
    return this.http.patch<Request>(`${this.API_URL}/${id}/accept`, {});
  }

  ///refuse request function

  refuseRequest(id: number): Observable<Request> {
    return this.http.patch<Request>(`${this.API_URL}/${id}/refuse`, {});
  }


    
}
