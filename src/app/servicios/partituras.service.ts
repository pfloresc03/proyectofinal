import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partitura } from '../clases/partitura';

const url = 'http://localhost/backendfinal/archivos/'
@Injectable({
  providedIn: 'root'
})
export class PartiturasService {

  constructor(private http:HttpClient) { }

  verPartituras(id_obra:number): Observable<any>{
    return this.http.get(url+id_obra)
  }
  
  insertarPartitura(partitura:Partitura): Observable<any>{
    return this.http.post(url, partitura)
  }

  leerPartitura(id_obra:number): Observable<any>{
    return this.http.get(url+id_obra)
  }

  editarPartitura(partitura:Partitura): Observable<any>{
    return this.http.put(url, partitura)
  }

  borrarPartitura(id:number): Observable<any>{
    return this.http.delete(url+id)
  }

  buscarPartituras(entrada:string): Observable<any>{
    return this.http.get(url+'?busqueda='+entrada)
  }

  subirPartitura(entrada, id_obra:number): Observable<any>{
    return this.http.post(url + id_obra, entrada)
  }
}
