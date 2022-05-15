import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { terminalI } from '../models/terminal.interface';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getTerminal(){
    return this.http.get<terminalI>(`${this.url}/terminal/`);
  }
  
}
