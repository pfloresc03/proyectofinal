import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Instrumentos } from 'src/app/clases/instrumentos';
import { Partitura } from 'src/app/clases/partitura';
import { AdminService } from 'src/app/servicios/admin.service';
import { InstrumentosService } from 'src/app/servicios/instrumentos.service';
import { PartiturasService } from 'src/app/servicios/partituras.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-partituras',
  templateUrl: './partituras.component.html',
  styleUrls: ['./partituras.component.css']
})

export class PartiturasComponent implements OnInit {
  partitura: Partitura = new Partitura
  instrumento: Instrumentos = new Instrumentos
  instrumentos: Instrumentos[]=[]
  archivo: File
  partituras: any
  id_obra: number = 0
  voces: number[]=[1,2,3,4]
  id_instrumento: number = 1
  id_voz: number = 1
  mensaje: string
  id_partitura: number
  formNuevo: FormGroup = new FormGroup({
    id_partitura: new FormControl(),
    id_instrumento: new FormControl(),
    id_voz: new FormControl()
  })
  fnAdmin = this.servicioAdmin.isAdmin
  constructor(private fb:FormBuilder, private servicioPartitura:PartiturasService, 
    private servicioUsuario:UserService, private rutaActiva:ActivatedRoute, 
    private servicioAdmin:AdminService, private servicioInstrumentos:InstrumentosService) { }

  ngOnInit(): void {
    this.id_obra = this.rutaActiva.snapshot.params.id_obra
    this.obtenerPartituras()
    this.obtenerInstrumentos()
  }

  fnLogged(): boolean {
    return this.servicioUsuario.isLogged()
  }

  obtenerPartituras(): void{
    this.servicioInstrumentos.obtenerPartituras(this.id_obra).subscribe(
      respuesta => {
        console.log(respuesta)
        this.partituras = respuesta
      },
      error => {
        console.log(error)
        console.log(error.error.error)
        
      }
    )
  }

  obtenerInstrumentos(): void{
    this.servicioInstrumentos.verInstrumentos().subscribe(
      respuesta => {
        console.log(respuesta)
        this.instrumentos = respuesta
      },
      error => {
        console.log(error)
        console.log(error.error.error)
        
      }
    )
  }
  
  tengoArchivo(evento): void{
    if (evento.target.files){
      this.archivo = evento.target.files[0]
    }
  }

  subirArchivo(id_inst, voz): void{
    const formData = new FormData()
    formData.append('partitura', this.archivo)
    this.servicioPartitura.subirPartitura(formData, this.id_obra, id_inst, voz).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerPartituras()
      },
      error => {
        console.log(error)
        console.log(error.error.error)
        this.mensaje = error.error.error;
        
      }
    )
  }

  editarPartitura(): void{
    this.formNuevo.value.id_partitura = this.id_partitura
    this.formNuevo.value.id_instrumento = this.id_instrumento
    this.formNuevo.value.id_voz = this.id_voz
    this.servicioPartitura.editarPartitura(this.formNuevo.value).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerPartituras()
        this.id_partitura = null
        this.id_instrumento = 1
        this.id_voz = 1
        this.mensaje = respuesta
        setTimeout(()=>{this.mensaje=""},2000)
      }, error => {
        console.log(error)
        this.mensaje = error.error.error;
      }
    )
  }

  eliminarPartitura(id:number): void{
    if (confirm('Está seguro de eliminar la partitura?')==true){
      
      this.servicioPartitura.borrarPartitura(id).subscribe(
        respuesta => {
          console.log(respuesta)
          this.obtenerPartituras()
          alert('La partitura ha sido eliminada correctamente!!!');
        },
        error => console.log(error)
      )
    } 
  }

}
