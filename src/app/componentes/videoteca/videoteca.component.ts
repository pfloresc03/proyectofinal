import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  mostrarEditar: boolean = false
  formNuevo: FormGroup = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl('',[Validators.required]),
    enlace: new FormControl('',[Validators.required])
  })
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
    this.formNuevo.value.enlace = this.formNuevo.value.enlace.substring(this.formNuevo.value.enlace.lastIndexOf("/"))
    this.formNuevo.value.enlace = "https://www.youtube.com/embed"+this.formNuevo.value.enlace
    this.servicioVideoteca.insertarVideo(this.formNuevo.value).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerVideoteca()
        this.formNuevo.reset()
      },
      error => {
        console.log(error)
        console.log(error.error.error)
      }
    )
  }

  eliminarVideo(id): void{
    if (confirm('Está seguro de eliminar el video?')==true){
      
      this.servicioVideoteca.borrarVideo(id).subscribe(
        respuesta => {
          console.log(respuesta)
          this.obtenerVideoteca()
          alert('El video ha sido eliminado correctamente!!!');
        },
        error => console.log(error)
      )
    } 
  }

  editarVideo(): void {
    this.formNuevo.value.enlace = this.formNuevo.value.enlace.substring(this.formNuevo.value.enlace.lastIndexOf("/"))
    this.formNuevo.value.enlace = "https://www.youtube.com/embed"+this.formNuevo.value.enlace
    this.servicioVideoteca.editarVideo(this.formNuevo.value).subscribe(
      respuesta =>{
        console.log(respuesta)
        this.obtenerVideoteca()
        this.formNuevo.reset()
      },
      error =>{
        console.log(error)
      }

    )
  }
}
