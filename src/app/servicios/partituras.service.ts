import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partitura } from '../clases/partitura';

const url = 'http://localhost/repositorioFlores/backendFlores/archivos/'
@Injectable({
  providedIn: 'root'
})
export class PartiturasService {

  constructor(private http:HttpClient) { }

  editarPartitura(entrada): Observable<any>{
    return this.http.put(url, entrada)
  }

  borrarPartitura(id:number): Observable<any>{
    return this.http.delete(url+id)
  }

  subirPartitura(entrada, id_obra:number, id_inst:number, voz:number): Observable<any>{
    return this.http.post(url + id_obra + "/" + id_inst + "/" + voz, entrada)
  }
}
