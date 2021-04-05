import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concierto } from '../clases/concierto';

const url = 'http://localhost/repositorioFlores/backendFlores/conciertos/'
@Injectable({
  providedIn: 'root'
})
export class ConciertosService {

  constructor(private http:HttpClient) { }

  verConciertos(): Observable<any>{
    return this.http.get(url)
  }

  crearConcierto(concierto:Concierto): Observable<any>{
    return this.http.post(url, concierto)
  }

  eliminarConcierto(id:number): Observable<any>{
    return this.http.delete(url+id)
  }

  editarConcierto(concierto:Concierto): Observable<any>{
    return this.http.put(url,concierto)
  }
}
