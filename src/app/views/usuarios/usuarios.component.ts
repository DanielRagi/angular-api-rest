import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service'
import { Router } from '@angular/router';
import { UsuariosInterface } from '../../models/usuarios.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  
  usuarios:UsuariosInterface[] = [];

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  }

  editarUsuario(id:any){
    this.router.navigate(['editar-usuario', id])
  }

  nuevoUsuario() {
    this.router.navigate(['nuevo-usuario'])
  }

}
