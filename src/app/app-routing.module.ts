import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NuevoEstudianteComponent } from './views/nuevo-estudiante/nuevo-estudiante.component'
import { EditarEstudianteComponent } from './views/editar-estudiante/editar-estudiante.component';
import { LogoutComponent } from './views/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'nuevo-estudiante', component:NuevoEstudianteComponent },
  { path: 'editar-estudiante/:id', component:EditarEstudianteComponent },
  { path: 'logout', component:LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, NuevoEstudianteComponent, EditarEstudianteComponent]