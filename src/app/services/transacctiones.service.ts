import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { transacctionesI } from '../models/transacctiones.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class transacctionesService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  gettransacctiones(){
    return this.http.get<transacctionesI>(`${this.url}/transacctiones/`);
  } 

  singup(transacction: transacctionesI):Observable<ResponseI>{
    console.log(transacction);
    return this.http.post<ResponseI>(`${this.url}/transacctiones/`, transacction);
  }

  deletetransacctionesById(id_transacction: transacctionesI):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${this.url}/transacctiones/`+ id_transacction);
  }

}
