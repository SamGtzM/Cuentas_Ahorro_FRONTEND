import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { transacctionesI } from 'src/app/models/transacctiones.interface';
import { terminalI } from 'src/app/models/terminal.interface';
import { tipoTransacctionI } from 'src/app/models/tipo_transacction.interface';
import { loginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { transacctionesService } from 'src/app/services/transacctiones.service';
import { TerminalService } from 'src/app/services/terminal.service';
import { TipoTransactionService } from 'src/app/services/tipo-transacction.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CuentaAhorroService } from 'src/app/services/cuenta-ahorro.service';
import { cuentaAhorroI } from 'src/app/models/cuentas_ahorro.interface';

@Component({
  selector: 'app-transacctiones',
  templateUrl: './transacctiones.component.html',
  styleUrls: ['./transacctiones.component.scss']
})
export class TransacctionesComponent implements OnInit {

  public terminal: Array<terminalI> = [];
  public tipoTransacction: Array<tipoTransacctionI> = [];
  public cuentaAhorro: Array<cuentaAhorroI> = [];
  public usuario: Array<loginI> = [];

  singupForm = new FormGroup({
    id_tipo_transacction: new FormControl('', Validators.required),
    id_cuenta: new FormControl('', Validators.required),
    id_terminal: new FormControl('', Validators.required),
    id_usuario: new FormControl('', Validators.required),
    saldo: new FormControl('', Validators.required),
  });

  //Cabeceras tabla
  displayedColumns: string[] = [
    'id_transacction',
    'email',
    'nombre_completo',
    'tipo_transacction',
    'estado',
    'numero_cuenta',
    'saldo',
    'nombre_terminal',
    'fecha_movimiento',
    'Accion'
  ];
  dataSource!:MatTableDataSource<transacctionesI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private transacctionesService: transacctionesService,
    private TerminalService: TerminalService,
    private TipoTransactionService: TipoTransactionService,
    private CuentaAhorroService: CuentaAhorroService,
    private UsuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getTransacctiones();
    this.getTerminal();
    this.getTipoTransacction();
    this.getCuentaAhorro();
    this.info();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenar terminal
  getTerminal(){
    this.TerminalService.getTerminal().subscribe( (res:any) =>{
      this.terminal = res;
    });
  }
  
  //Llenar terminal
  getTipoTransacction(){
    this.TipoTransactionService.getTipoTransacction().subscribe( (res:any) =>{
      this.tipoTransacction = res;
    });
  }

  //Llenar terminal
  getCuentaAhorro(){
    this.CuentaAhorroService.getCuentasAhorro().subscribe( (res:any) =>{
      this.cuentaAhorro = res;
    });
  }

  //Llenar info usuario actual
  info(){
    this.usuario = this.UsuarioService.us();
    const id_usuario = new String(this.usuario[0]);
    this.singupForm = new FormGroup({
      id_tipo_transacction: new FormControl('', Validators.required),
      id_cuenta: new FormControl('', Validators.required),
      id_terminal: new FormControl('', Validators.required),
      id_usuario: new FormControl(id_usuario, Validators.required),
      saldo: new FormControl('', Validators.required),
    });
  }

  //Llenando tabla
  getTransacctiones(){
    this.transacctionesService.gettransacctiones().subscribe( (res:any) =>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  //Altas
  singUp(Transaction: transacctionesI){
    this.transacctionesService.singup(Transaction).subscribe( (res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Guardado!',
        text: 'Registrado correctamente!',
      });
      this.getTransacctiones();
    });
  }

  //Borrar registros de la tabla
  deleteTransacctionesById(id_transacction: transacctionesI){
    Swal.fire({
      title: 'Estas de acuerdo?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.transacctionesService.deletetransacctionesById(id_transacction).subscribe( (res:ResponseI) =>{
          this.getTransacctiones();
        });
        Swal.fire(
          'Eliminado!',
          'El registro fue eliminado con exito.',
          'success'
        )
      }
    });
  }

}
