import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fruit } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/fruits';


@Injectable({
  providedIn: 'root'
})
export class FruitsService {

  constructor(private http: HttpClient) { }

  all(): Observable<[Fruit]>{
    return this.http.get<[Fruit]>(BASE_URL);
  }

  byId(id): Observable<Fruit>{
    return this.http.get<Fruit>(this.getUrl(id));
  }

  create(fruit: Fruit): Observable<Fruit>{
    return this.http.post<Fruit>(BASE_URL, fruit);
  }

  update(fruit: Fruit): Observable<Fruit>{
    return this.http.put<Fruit>(this.getUrl(fruit.id), fruit);
  }

  delete(id): Observable<Fruit>{
    return this.http.delete<Fruit>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
