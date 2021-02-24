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

  verPartituras(): Observable<any>{
    return this.http.get(url)
  }
  
  insertarPartitura(partitura:Partitura): Observable<any>{
    return this.http.post(url, partitura)
  }

  leerPartitura(id:number): Observable<any>{
    return this.http.get(url+id)
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

  subirPartitura(entrada): Observable<any>{
    return this.http.post(url,entrada)
  }
}
