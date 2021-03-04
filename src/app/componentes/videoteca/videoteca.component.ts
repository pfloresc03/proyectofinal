import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Videoteca } from 'src/app/clases/videoteca';
import { VideotecaService } from 'src/app/servicios/videoteca.service';
import { Url } from 'url';

@Component({
  selector: 'app-videoteca',
  templateUrl: './videoteca.component.html',
  styleUrls: ['./videoteca.component.css']
})
export class VideotecaComponent implements OnInit {
  videoteca: Videoteca[]=[]
  videoNuevo: Videoteca = new Videoteca

  constructor(private servicioVideoteca:VideotecaService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.obtenerVideoteca()
  }

  obtenerVideoteca(): void{
    this.servicioVideoteca.verVideoteca().subscribe(
      respuesta => {
        console.log(respuesta)
        this.videoteca = respuesta
        
      },
      error => {
        console.log(error)
        console.log(error.error.error)
        
      }
    )
  }

  insertarVideo(): void{
    this.videoNuevo.enlace = this.videoNuevo.enlace.substring(this.videoNuevo.enlace.lastIndexOf("/"))
    this.videoNuevo.enlace = "https://www.youtube.com/embed"+this.videoNuevo.enlace
    this.servicioVideoteca.insertarVideo(this.videoNuevo).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerVideoteca()
      },
      error => {
        console.log(error)
        console.log(error.error.error)
      }
    )
  }
}
