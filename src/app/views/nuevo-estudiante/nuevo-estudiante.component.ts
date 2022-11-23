import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { EstudiantesInterface } from '../../models/estudiantes.interface'
import { ApiService } from '../../services/api/api.service'
import { AlertsService } from '../../services/alerts/alerts.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ResponseInterface } from '../../models/response.interface'

@Component({
  selector: 'app-nuevo-estudiante',
  templateUrl: './nuevo-estudiante.component.html',
  styleUrls: ['./nuevo-estudiante.component.css']
})
export class NuevoEstudianteComponent {

  token = this.getToken();
  nuevoForm = new FormGroup({
    id: new FormControl('',Validators.required),
    nombre: new FormControl('',Validators.required),
    apellido: new FormControl('',Validators.required),
    programa: new FormControl('',Validators.required),
    ingreso: new FormControl('',Validators.required),
    urlFotoPerfil: new FormControl('',Validators.required),
    createdAt: new FormControl('',Validators.required),
    updatedAt: new FormControl('',Validators.required)
  })

  constructor(private activatedroute:ActivatedRoute, private router:Router, private api:ApiService, private alerts:AlertsService) {  }

  ngOnInit(): void {
    let token = this.getToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }


  postForm(form:any){
    this.api.postEstudiante(form, this.token!).subscribe(data => {
      let respuesta:ResponseInterface = data;
      if(!respuesta.message) {
        this.alerts.showSuccess('Registrado correctamente', 'Hecho')
      } else {
        this.alerts.showError(respuesta.message, 'Error')
      }
      this.router.navigate(['dashboard'])
    })
  }

}
