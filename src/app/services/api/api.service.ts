import { Injectable } from '@angular/core';
import { LoginInterface } from '../../models/login.interface';
import { ResponseInterface } from '../../models/response.interface';
import { EstudiantesInterface } from '../../models/estudiantes.interface'
import { UsuariosInterface } from 'src/app/models/usuarios.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://http-nodejs-production-2b7e.up.railway.app/"

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginInterface):Observable<ResponseInterface>{
    let dir = this.url + "auth/signin"
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<ResponseInterface>(dir,form,httpOptions)
  }

  getEstudiantes():Observable<EstudiantesInterface[]>{
    let dir = this.url + "students"
    return this.http.get<EstudiantesInterface[]>(dir)
  }

  getEstudiante(id:any):Observable<EstudiantesInterface>{
    let dir = this.url + "students/" + id;
    return this.http.get<EstudiantesInterface>(dir);
  }

  putEstudiante(form:EstudiantesInterface, token:string):Observable<ResponseInterface>{
    let dir = this.url + "students/" + form.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token
      })
    };
    return this.http.put<ResponseInterface>(dir, form, httpOptions)
  }

  postEstudiante(form:EstudiantesInterface, token:string):Observable<ResponseInterface>{
    let dir = this.url + "students";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token
      })
    };
    return this.http.post<ResponseInterface>(dir, form, httpOptions)
  }

  deleteEstudiante(form:EstudiantesInterface, token:string):Observable<ResponseInterface>{
    let dir = this.url + "students/" + form.id;
    let Options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token
      }),
      body:form
    }
    return this.http.delete<ResponseInterface>(dir, Options)
  }

  getUsuarios():Observable<UsuariosInterface[]>{
    let dir = this.url + "users"
    return this.http.get<UsuariosInterface[]>(dir)
  }

  postUsuario(form:UsuariosInterface, token:string):Observable<ResponseInterface>{
    let dir = this.url + "users";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token
      })
    };
    return this.http.post<ResponseInterface>(dir, form, httpOptions)
  }

}
