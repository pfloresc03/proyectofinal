import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { obra } from '../clases/obra';

const url = 'http://localhost/repositorioFlores/backendFlores/obras/'
@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  constructor(private http:HttpClient) { }

  verObras(): Observable<any>{
    return this.http.get(url)
  }

  insertarObra(obra:obra): Observable<any>{
    return this.http.post(url, obra)
  }

  borrarObra(id:number): Observable<any>{
    return this.http.delete(url+id)
  }

  editarObra(obra:obra): Observable<any>{
    return this.http.put(url,obra)
  }
}
