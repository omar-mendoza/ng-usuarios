import { coerceStringArray } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  url = "http://192.168.1.66:8080/usuarios/api/v1";

  constructor(private http: HttpClient) {}

  async getAll() {
    const restService = `${this.url}/all`
    let data: Usuario [] = [];
    await this.http.get<Usuario[]>(restService).toPromise().then(res => data = res);

    return data;

  }

  async create(usuario: Usuario) {

    const restService = `${this.url}/create`;
    await this.http.post(restService, usuario).toPromise()
      .then(res => console.log)
      .catch(error => console.log );
  }

  async update(usuario: Usuario) {
    const restService = `${this.url}/update`;
    await this.http.put(restService, usuario).toPromise()
      .then(res => console.log)
      .catch(error => console.log )
  }

  async delete(id: number) {
    const restService = `${this.url}/delete/${id}`;
    await this.http.delete(restService).toPromise()
      .then(res => console.log)
      .catch(error => console.log);
    
  }
}
