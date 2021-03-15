import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { obra } from 'src/app/clases/obra';
import { AdminService } from 'src/app/servicios/admin.service';
import { ObrasService } from 'src/app/servicios/obras.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {
  obra: obra = new obra
  obras: obra[]=[]
  formNuevo: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl('',[Validators.required]),
    autor: new FormControl('')
  })
  fnAdmin = this.servicioAdmin.isAdmin
  constructor(private servicioObras:ObrasService, private irHacia:Router, private servicioUsuario:UserService, private servicioAdmin:AdminService) { }

  ngOnInit(): void {
    this.obtenerObras()
  }

  fnLogged(): boolean {
    return this.servicioUsuario.isLogged()
  }

  obtenerObras(): void{
    this.servicioObras.verObras().subscribe(
      respuesta => {
        console.log(respuesta)
        this.obras = respuesta
      },
      error => {
        console.log(error)
        console.log(error.error.error)
        
      }
    )
  }

  crearObra(): void{
    if (this.formNuevo.value.autor == ""){
      this.formNuevo.value.autor = "Anónimo"
    }
    this.servicioObras.insertarObra(this.formNuevo.value).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerObras()
        this.formNuevo.reset()
      },
      error => {
        console.log(error)
        console.log(error.error.error)
      }
    )
  }

  eliminarObra(id:number): void {
    if (confirm('Está seguro de eliminar la obra?')==true){
      
      this.servicioObras.borrarObra(id).subscribe(
        respuesta => {
          console.log(respuesta)
          this.obtenerObras()
          alert('La obra ha sido eliminada correctamente!!!');
        },
        error => console.log(error)
      )
    } 
  }

  editarObra(): void{
    if (this.formNuevo.value.autor == ""){
      this.formNuevo.value.autor = "Anónimo"
    }
    this.servicioObras.editarObra(this.formNuevo.value).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerObras()
        this.formNuevo.reset()
      },
      error => {
        console.log(error)
        console.log(error.error.error)
      }
    )
  }
  
}
