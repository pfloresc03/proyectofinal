import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRouterGuard } from './auth/user-router.guard';
import { LoginComponent } from './componentes/auth/login/login.component';
import { PerfilComponent } from './componentes/auth/perfil/perfil.component';
import { RegisterComponent } from './componentes/auth/register/register.component';
import { DirectorComponent } from './componentes/director/director.component';
import { GalardonesComponent } from './componentes/galardones/galardones.component';
import { HomeComponent } from './componentes/home/home.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { ObrasComponent } from './componentes/obras/obras.component';
import { PartiturasComponent } from './componentes/partituras/partituras.component';
import { SobreMiComponent } from './componentes/sobre-mi/sobre-mi.component';
import { VideotecaComponent } from './componentes/videoteca/videoteca.component';

const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: "registro", component:RegisterComponent},
  {path: "home", component:HomeComponent},
  {path: "partituras/:id_obra", component:PartiturasComponent, canActivate:[UserRouterGuard]},
  {path: "director", component:DirectorComponent},
  {path: "obras", component:ObrasComponent, canActivate:[UserRouterGuard]},
  {path: "galardones", component:GalardonesComponent},
  {path: "videoteca", component:VideotecaComponent},
  {path: "perfil", component:PerfilComponent, canActivate:[UserRouterGuard]},
  {path: "mapa", component:MapaComponent},
  {path: "sobreMi", component:SobreMiComponent},

  {path: "**", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
