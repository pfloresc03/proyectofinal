import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegisterComponent } from './componentes/auth/register/register.component';
import { DirectorComponent } from './componentes/director/director.component';
import { HomeComponent } from './componentes/home/home.component';
import { PartiturasComponent } from './componentes/partituras/partituras.component';

const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: "registro", component:RegisterComponent},
  {path: "home", component:HomeComponent},
  {path: "partituras", component:PartiturasComponent},
  {path: "director", component:DirectorComponent},

  {path: "**", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
