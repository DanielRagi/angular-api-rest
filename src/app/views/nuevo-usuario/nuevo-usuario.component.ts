import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UsuariosInterface } from '../../models/usuarios.interface'
import { ApiService } from '../../services/api/api.service'
import { AlertsService } from '../../services/alerts/alerts.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ResponseInterface } from '../../models/response.interface'

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {

  token = this.getToken();
  nuevoForm = new FormGroup({
    username: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    roles: new FormControl(''),
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
    this.api.postUsuario(form, this.token!).subscribe(data => {
      let respuesta:ResponseInterface = data;
      if(!respuesta.message) {
        this.alerts.showSuccess('Registrado correctamente', 'Hecho')
      } else {
        this.alerts.showError(respuesta.message, 'Error')
      }
      this.router.navigate(['usuarios'])
    })
  }

}
