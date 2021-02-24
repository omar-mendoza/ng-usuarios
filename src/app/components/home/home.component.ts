import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search = '';

  usuario: Usuario = {
    id: -1,
    codigo: '',
    nombre: '',
    direccion: '',
    poblacion: '',
    cp: '',
    ciudad: '',
    telefono: '',
    email: ''
  };

  data: Usuario[];
  tmp: Usuario[];
  display = false;
  displayDelete = false;
  saveText = "Guardar Usuario";
  updateText = "Actualizar Usuario";
  textTitle = '';

  constructor(private service: UsuariosService) { }

  ngOnInit(): void {
    this.loadData();
  }

  tmpFunction() {
    this.tmp = this.data;
  }

  async loadData() {
    this.data = await this.service.getAll();
    console.log(this.data);
    this.tmpFunction();
    
  }

  create() {
    this.textTitle = this.saveText;
    this.display = true;
  }

  async createOrUpdateUser(id?: number) {

    if(id) {
      await this.service.update(this.usuario);
    } else {
      await this.service.create(this.usuario);
    }

    this.data = await this.service.getAll();
    this.tmpFunction();

    this.display = false;
    this.usuario = {};

  }

  update(usuario: Usuario) {
    this.usuario = usuario;
    this.textTitle = this.updateText;
    this.display = true;

  }

  async delete(id: number) {
    this.displayDelete = true;
  }

  async confirmDelete(res: number, id: number) {

    if(res != 0) {
      await this.service.delete(id);
      this.data = await this.service.getAll();
    }
    this.tmpFunction();
    this.displayDelete = false;

  }

  searchInData() {
      this.data = this.tmp.filter((e : Usuario) => {
        return (e.codigo.toLowerCase().includes(this.search.toLowerCase()) || 
        e.nombre.toLowerCase().includes(this.search.toLowerCase()) || 
        e.direccion.toLowerCase().includes(this.search.toLowerCase()) || 
        e.poblacion.toLowerCase().includes(this.search.toLowerCase()) || 
        e.cp.toLowerCase().includes(this.search.toLowerCase()) || 
        e.ciudad.toLowerCase().includes(this.search.toLowerCase()) || 
        e.telefono.toLowerCase().includes(this.search.toLowerCase()) || 
        e.email.toLowerCase().includes(this.search.toLowerCase()) )
      });
  }
}
