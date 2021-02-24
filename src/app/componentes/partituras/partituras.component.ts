import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Partitura } from 'src/app/clases/partitura';
import { PartiturasService } from 'src/app/servicios/partituras.service';

@Component({
  selector: 'app-partituras',
  templateUrl: './partituras.component.html',
  styleUrls: ['./partituras.component.css']
})

export class PartiturasComponent implements OnInit {
  archivo: File
  partituras: Partitura[]=[]
  constructor(private fb:FormBuilder, private servicioPartitura:PartiturasService) { }

  ngOnInit(): void {
    this.obtenerPartituras()
  }

  obtenerPartituras(): void{
    this.servicioPartitura.verPartituras().subscribe(
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
    this.servicioPartitura.subirPartitura(formData).subscribe(
      respuesta => {
        console.log(respuesta)
      },
      error => {
        console.log(error)
        console.log(error.error.error)
      }
    )
  }
}
