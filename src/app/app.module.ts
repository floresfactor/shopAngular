import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';
import { EmpleadosComponent } from './component/empleados/empleados.component';
import { HomeComponent } from './component/home/home.component';
import { ProductosComponent } from './component/productos/productos.component';
import { ClientesComponent } from './component/clientes/clientes.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    EmpleadosComponent,
    HomeComponent,
    ProductosComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home', component : HomeComponent},
      {path: 'empleados', component : EmpleadosComponent},
      {path: 'clientes', component : ClientesComponent},
      {path: 'productos', component : ProductosComponent},
      {path: '', component : HomeComponent }



    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
