import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes
import { AppComponent } from './app.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { AgregarEditarPersonaComponent } from './components/agregar-editar-persona/agregar-editar-persona.component';

// Modulos
import { SharedModule } from './shared/shared.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ReporteIngresoComponent } from './components/reporte-ingreso/reporte-ingreso.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPersonasComponent,
    AgregarEditarPersonaComponent,
    ReporteIngresoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
