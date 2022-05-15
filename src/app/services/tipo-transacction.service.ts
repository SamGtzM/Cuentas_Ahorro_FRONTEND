import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tipoTransacctionI } from '../models/tipo_transacction.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoTransactionService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getTipoTransacction(){
    return this.http.get<tipoTransacctionI>(`${this.url}/tipo_transacctiones/`);
  }
  
}
