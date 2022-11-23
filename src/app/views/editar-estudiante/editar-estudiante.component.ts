import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { EstudiantesInterface } from '../../models/estudiantes.interface'
import { ApiService } from '../../services/api/api.service'
import { AlertsService } from '../../services/alerts/alerts.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ResponseInterface } from '../../models/response.interface'

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.css']
})
export class EditarEstudianteComponent {

  constructor(private activatedroute:ActivatedRoute, private router:Router, private api:ApiService, private alerts:AlertsService) {  }

  token = this.getToken();
  datosEstudiante: EstudiantesInterface;
  editarForm = new FormGroup({
    id: new FormControl('',Validators.required),
    nombre: new FormControl('',Validators.required),
    apellido: new FormControl('',Validators.required),
    programa: new FormControl('',Validators.required),
    ingreso: new FormControl('',Validators.required),
    urlFotoPerfil: new FormControl('',Validators.required),
    createdAt: new FormControl('',Validators.required),
    updatedAt: new FormControl('',Validators.required)
  })

  ngOnInit(): void {
    let estudianteId = this.activatedroute.snapshot.paramMap.get('id')
    let token = this.getToken();
    
    this.api.getEstudiante(estudianteId).subscribe(data => {
      this.datosEstudiante = data;
      this.editarForm.setValue({
        'id': this.datosEstudiante.id,
        'nombre': this.datosEstudiante.nombre,
        'apellido': this.datosEstudiante.apellido,
        'programa': this.datosEstudiante.programa,
        'ingreso': this.datosEstudiante.ingreso,
        'urlFotoPerfil': this.datosEstudiante.urlFotoPerfil,
        'createdAt': this.datosEstudiante.createdAt,
        'updatedAt': this.datosEstudiante.updatedAt
      });
    })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  putForm(form:any){
    this.api.putEstudiante(form, this.token!).subscribe(data => {
      let respuesta:ResponseInterface = data;
      if(!respuesta.message) {
        this.alerts.showSuccess('Modificado correctamente', 'Hecho')
      } else {
        this.alerts.showError(respuesta.message, 'Error')
      }
      this.router.navigate(['dashboard'])
    })
  }

  eliminarEstudiante() {
    let datos:any = this.editarForm.value;
    this.api.deleteEstudiante(datos, this.token!).subscribe(data  =>{
      let respuesta:ResponseInterface = data;
      if(!respuesta.message) {
        this.alerts.showSuccess('Eliminado correctamente', 'Hecho')
      } else {
        this.alerts.showError(respuesta.message, 'Error')
      }
      this.router.navigate(['dashboard'])
    })
  }
}
