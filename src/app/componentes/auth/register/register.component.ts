import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister= this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    password: ['',[Validators.required, Validators.minLength(4)]],
    password2: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],

  })
  mensaje: string
  constructor(private fb:FormBuilder, private servicioUsuario:UserService, private irHacia:Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.formRegister.value.password == this.formRegister.value.password2){
      this.servicioUsuario.registrar(this.formRegister.value).subscribe (
        respuesta => {
          console.log(respuesta)
          this.servicioUsuario.guardarToken(respuesta)
          this.mensaje = respuesta
          this.irHacia.navigate(['/home'])
          setTimeout(()=>{this.mensaje=""},2000)
        },
        error => {
          console.log(error)
          this.mensaje = error.error.error
          setTimeout(()=>{this.mensaje=""},2000)
        }
      )
    }
    else alert('las constraseñas no coinciden')
  }
}
