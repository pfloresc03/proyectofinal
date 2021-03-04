import { Component, OnInit } from '@angular/core';
import { Videoteca } from 'src/app/clases/videoteca';
import { UserService } from 'src/app/servicios/user.service';
import { VideotecaService } from 'src/app/servicios/videoteca.service';

@Component({
  selector: 'app-videoteca',
  templateUrl: './videoteca.component.html',
  styleUrls: ['./videoteca.component.css']
})
export class VideotecaComponent implements OnInit {
  videoteca: Videoteca[]=[]
  videoNuevo: Videoteca = new Videoteca

  constructor(private servicioVideoteca:VideotecaService, private servicioUsuario:UserService) { }

  ngOnInit(): void {
    this.obtenerVideoteca()
  }

  fnLogged(): boolean {
    return this.servicioUsuario.isLogged()
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

  eliminarVideo(id): void{
    this.servicioVideoteca.borrarVideo(id).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerVideoteca()
      },
      error => console.log(error)
    )
  }
}
