import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: User = {}
  mostrarEditar: boolean = false
  mostrarEliminar: boolean = false
  borrarEmail: string = ""
  formPerfil= this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    password: ['',[Validators.minLength(4)]],
    password2: [''],
    email: ['', [Validators.required, Validators.email]],

  })

  mensaje: string
  constructor(private fb:FormBuilder, private servicioUsuario:UserService, private irHacia:Router) { }

  ngOnInit(): void {
    this.cargarPerfil()
  }

  cargarPerfil(): void{
    this.servicioUsuario.obtenerPerfil().subscribe(
      respuesta => {
        console.log(respuesta)
        this.perfil = respuesta
        this.formPerfil.patchValue(respuesta)
      },
      error => console.log(error)
    )
  }

  editarPerfil(): void {
    if (this.formPerfil.value.password == this.formPerfil.value.password2){
      this.servicioUsuario.editarPerfil(this.formPerfil.value).subscribe (
        respuesta => {
          console.log(respuesta)
          this.cargarPerfil()
          this.mostrarEditar = false
          this.mensaje=respuesta
          this.formPerfil.reset()
          setTimeout(()=>{this.mensaje=null},2000)
        },
        error =>{
          console.log(error)
          this.mensaje=error.error.error
          setTimeout(()=>{this.mensaje=null},2000)
        } 
      )
    } else {
      this.mensaje = "Las contraseñas no coinciden"
      setTimeout(()=>{this.mensaje=null},2000)
    }
  }

  eliminarUsuario(): void {
    this.servicioUsuario.eliminarUsuario().subscribe(
      respuesta => {
        console.log(respuesta)
        this.servicioUsuario.logout()
        this.irHacia.navigate(['/login'])
      },
      error => console.log(error)
    )
  }

}
