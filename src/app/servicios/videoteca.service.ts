import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Videoteca } from '../clases/videoteca';

const url = 'http://localhost/repositorioFlores/backendFlores/videos/'
@Injectable({
  providedIn: 'root'
})
export class VideotecaService {

  constructor(private http:HttpClient) { }

  verVideoteca(id_concierto:number): Observable<any>{
    return this.http.get(url + id_concierto)
  }

  insertarVideo(video:Videoteca): Observable<any>{
    return this.http.post(url, video)
  }

  borrarVideo(id:number): Observable<any>{
    return this.http.delete(url+id)
  }

  editarVideo(video:Videoteca): Observable<any>{
    return this.http.put(url,video)
  }
}
