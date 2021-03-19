import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost/backendfinal/instrumentos/'
@Injectable({
  providedIn: 'root'
})
export class InstrumentosService {

  constructor(private http:HttpClient) { }

  obtenerInstrumento(id:number): Observable<any>{
    return this.http.get(url+id)
  }

  verInstrumentos(): Observable<any>{
    return this.http.get(url)
  }
}
