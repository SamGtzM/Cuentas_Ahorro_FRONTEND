import { Injectable } from '@angular/core';
import { ResponseI } from '../models/response.interface';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  usuario: Array<any> = []; 

  us(){
    const token = localStorage.getItem('token') as string;
    const { id_usuario, email }:ResponseI = decode(token);
    this.usuario = [  
      id_usuario,
      email
    ];

    return this.usuario;
  }

}
