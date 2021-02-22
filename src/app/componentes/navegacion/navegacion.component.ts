import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  

  constructor(private servicioUsuario:UserService, private irHacia:Router) { }

  ngOnInit(): void {
  }

  doLogout(): void {
    this.servicioUsuario.logout()
    this.irHacia.navigate(['/login'])
  }

  fnLogged(): boolean {
    return this.servicioUsuario.isLogged()
  }
}
