import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Concierto } from 'src/app/clases/concierto';
import { Videoteca } from 'src/app/clases/videoteca';
import { AdminService } from 'src/app/servicios/admin.service';
import { ConciertosService } from 'src/app/servicios/conciertos.service';
import { UserService } from 'src/app/servicios/user.service';
import { VideotecaService } from 'src/app/servicios/videoteca.service';

@Component({
  selector: 'app-videoteca',
  templateUrl: './videoteca.component.html',
  styleUrls: ['./videoteca.component.css']
})
export class VideotecaComponent implements OnInit {
  videoteca: Videoteca[]=[]
  conciertos: Concierto[]=[]
  id_concierto: number = 1
  mensaje: string
  formNuevo: FormGroup = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl('',[Validators.required]),
    autor: new FormControl(''),
    enlace: new FormControl('',[Validators.required]),
    id_concierto: new FormControl('',[Validators.required])
  })
  formConcierto: FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    fecha: new FormControl('',[Validators.required])
  })
  formEdit: FormGroup = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl('',[Validators.required]),
    autor: new FormControl(''),
    enlace: new FormControl('',[Validators.required]),
    id_concierto: new FormControl('',[Validators.required])
  })
  fnAdmin = this.servicioAdmin.isAdmin

  constructor(private servicioVideoteca:VideotecaService, private servicioUsuario:UserService, 
    private servicioAdmin:AdminService, private servicioConciertos:ConciertosService) { }

  ngOnInit(): void {
    this.obtenerVideoteca()
    this.obtenerConciertos()
  }

  fnLogged(): boolean {
    return this.servicioUsuario.isLogged()
  }

  obtenerVideoteca(): void{
    this.servicioVideoteca.verVideoteca(this.id_concierto).subscribe(
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

  obtenerVideos(evento):void {
    this.id_concierto = evento.target.value
    this.servicioVideoteca.verVideoteca(evento.target.value).subscribe(
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
    if (this.formNuevo.value.autor == ""){
      this.formNuevo.value.autor = "Anónimo"
    }
    this.id_concierto = this.formNuevo.value.id_concierto
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
    if (this.formEdit.value.autor == ""){
      this.formEdit.value.autor = "Anónimo"
    }
    this.id_concierto = this.formEdit.value.id_concierto
    this.formEdit.value.enlace = this.formEdit.value.enlace.substring(this.formEdit.value.enlace.lastIndexOf("/"))
    this.formEdit.value.enlace = "https://www.youtube.com/embed"+this.formEdit.value.enlace
    this.servicioVideoteca.editarVideo(this.formEdit.value).subscribe(
      respuesta =>{
        console.log(respuesta)
        this.obtenerVideoteca()
      },
      error =>{
        console.log(error)
      }

    )
  }

  obtenerConciertos(): void{
    this.servicioConciertos.verConciertos().subscribe(
      respuesta => {
        console.log(respuesta)
        this.conciertos = respuesta
      }, error => {
        console.log(error)
        console.log(error.error.error)
        
      }
    )
  }

  crearConcierto(): void {
    this.servicioConciertos.crearConcierto(this.formConcierto.value).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerConciertos()
        this.formConcierto.reset()
      }, error => {
        console.log(error)
        this.mensaje = error.error.error
      } 
    )
  }
}
