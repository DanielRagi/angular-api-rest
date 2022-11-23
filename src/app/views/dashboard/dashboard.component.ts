import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service'
import { Router } from '@angular/router';
import { EstudiantesInterface } from '../../models/estudiantes.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  estudiantes:EstudiantesInterface[] = [];

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getEstudiantes().subscribe(data => {
      this.estudiantes = data;
    })
  }

  editarEstudiante(id:any){
    this.router.navigate(['editar-estudiante', id])
  }

  nuevoEstudiante() {
    this.router.navigate(['nuevo-estudiante'])
  }

}
