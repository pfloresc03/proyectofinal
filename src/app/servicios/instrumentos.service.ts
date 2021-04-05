import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost/repositorioFlores/backendFlores/instrumentos/'
@Injectable({
  providedIn: 'root'
})
export class InstrumentosService {

  constructor(private http:HttpClient) { }

  obtenerPartituras(id_obra:number): Observable<any>{
    return this.http.get(url + id_obra)
  }

  verInstrumentos(): Observable<any>{
    return this.http.get(url + "ver")
  }
}
