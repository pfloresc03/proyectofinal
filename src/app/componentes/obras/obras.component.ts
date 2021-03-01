import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { obra } from 'src/app/clases/obra';
import { ObrasService } from 'src/app/servicios/obras.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {
  obra: obra = new obra
  obras: obra[]=[]
  constructor(private servicioObras:ObrasService, private irHacia:Router) { }

  ngOnInit(): void {
    this.obtenerObras()
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
    this.servicioObras.insertarObra(this.obra).subscribe(
      respuesta => {
        console.log(respuesta)
        this.obtenerObras()
      },
      error => {
        console.log(error)
        console.log(error.error.error)
      }
    )
  }

  
}
