import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Partitura } from 'src/app/clases/partitura';
import { PartiturasService } from 'src/app/servicios/partituras.service';

@Component({
  selector: 'app-partituras',
  templateUrl: './partituras.component.html',
  styleUrls: ['./partituras.component.css']
})

export class PartiturasComponent implements OnInit {
  partitura: Partitura = new Partitura
  archivo: File
  partituras: Partitura[]=[]
  id_obra: number = 0
  constructor(private fb:FormBuilder, private servicioPartitura:PartiturasService, private rutaActiva:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_obra = this.rutaActiva.snapshot.params.id_obra
    this.obtenerPartituras()
  }

  obtenerPartituras(): void{
    this.servicioPartitura.verPartituras(this.id_obra).subscribe(
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
  
  tengoArchivo(evento): void{
    if (evento.target.files){
      this.archivo = evento.target.files[0]
    }
  }

  subirArchivo(): void{
    const formData = new FormData()
    formData.append('partitura', this.archivo)
    this.servicioPartitura.subirPartitura(formData, this.id_obra).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerPartituras()
      },
      error => {
        console.log(error)
        console.log(error.error.error)
      }
    )
  }

}
