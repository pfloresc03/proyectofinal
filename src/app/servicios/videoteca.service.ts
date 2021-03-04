import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Videoteca } from '../clases/videoteca';

const url = 'http://localhost/backendfinal/videos/'
@Injectable({
  providedIn: 'root'
})
export class VideotecaService {

  constructor(private http:HttpClient) { }

  verVideoteca(): Observable<any>{
    return this.http.get(url)
  }

  insertarVideo(video:Videoteca): Observable<any>{
    return this.http.post(url, video)
  }

  borrarVideo(id:number): Observable<any>{
    return this.http.delete(url+id)
  }
}
