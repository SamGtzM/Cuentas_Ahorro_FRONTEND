import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { cuentaAhorroI } from '../models/cuentas_ahorro.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CuentaAhorroService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getCuentasAhorro(){
    return this.http.get<cuentaAhorroI>(`${this.url}/cuenta_ahorro/`);
  }

  singup(CuentasAhorro: cuentaAhorroI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/cuenta_ahorro/`, CuentasAhorro);
  }

  putCuentasAhorro(cuenta: cuentaAhorroI):Observable<ResponseI>{
    return this.http.put<ResponseI>(`${this.url}/cuenta_ahorro/`+cuenta.id_cuenta, cuenta);
  }

  getCuentasAhorroById(id_cuenta: cuentaAhorroI):Observable<cuentaAhorroI>{
    return this.http.get<cuentaAhorroI>(`${this.url}/cuenta_ahorro/`+ id_cuenta);
  }

  deleteCuentaAhorroById(id_cuenta: cuentaAhorroI):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${this.url}/cuenta_ahorro/`+ id_cuenta);
  }

}
