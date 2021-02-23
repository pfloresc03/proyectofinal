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
  partitura: Partitura = new Partitura
  
  constructor(private fb:FormBuilder, private servicioPartitura:PartiturasService) { }

  ngOnInit(): void {
  }

  subirPartitura(): void {
    
    this.servicioPartitura.insertarPartitura(this.partitura).subscribe(
      respuesta => {
        console.log(respuesta)
        
      },
      error => {console.log(error)}
    )
  }
}
