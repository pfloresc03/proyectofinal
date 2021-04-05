import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LOCALE_ID, NgModule } from '@angular/core';
import "@angular/common/locales/global/es"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegisterComponent } from './componentes/auth/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnviarTokenInterceptor } from './auth/enviar-token.interceptor';
import { HomeComponent } from './componentes/home/home.component';
import { PartiturasComponent } from './componentes/partituras/partituras.component';
import { DirectorComponent } from './componentes/director/director.component';
import { ObrasComponent } from './componentes/obras/obras.component';
import { GalardonesComponent } from './componentes/galardones/galardones.component';
import { VideotecaComponent } from './componentes/videoteca/videoteca.component';
import { SafePipe } from './pipes/safe.pipe';
import { PerfilComponent } from './componentes/auth/perfil/perfil.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { SobreMiComponent } from './componentes/sobre-mi/sobre-mi.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PartiturasComponent,
    DirectorComponent,
    ObrasComponent,
    GalardonesComponent,
    VideotecaComponent,
    SafePipe,
    PerfilComponent,
    MapaComponent,
    SobreMiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {provide:LOCALE_ID, useValue:"es"},
    {provide: HTTP_INTERCEPTORS, useClass:EnviarTokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
