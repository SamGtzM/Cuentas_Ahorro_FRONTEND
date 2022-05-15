import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cuentaAhorroI } from 'src/app/models/cuentas_ahorro.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { CuentaAhorroService } from 'src/app/services/cuenta-ahorro.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas-ahorro',
  templateUrl: './cuentas-ahorro.component.html',
  styleUrls: ['./cuentas-ahorro.component.scss']
})
export class CuentasAhorroComponent implements OnInit {

  public estado: Array<cuentaAhorroI> = [];

  singupForm = new FormGroup({
    estado: new FormControl('', Validators.required),
    numero_cuenta: new FormControl('', Validators.required),
    saldo: new FormControl('', Validators.required)
  });

  getcuentasahorroIdForm = new FormGroup({
    id_cuenta: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    numero_cuenta: new FormControl('', Validators.required),
    saldo: new FormControl('', Validators.required),
    fecha_alta: new FormControl('')
  })

  //Cabeceras tabla
  displayedColumns: string[] = [
    'ID',
    'Estado',
    'Numero de cuenta',
    'Saldo',
    'Fecha alta',
    'Accion'
  ];
  dataSource!:MatTableDataSource<cuentaAhorroI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private CuentaAhorroService: CuentaAhorroService,
  ) { }

  ngOnInit(): void {
    this.getCuentasAhorro();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenando tabla
  getCuentasAhorro(){
    this.CuentaAhorroService.getCuentasAhorro().subscribe( (res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.estado = res;
    });
  }

  //Altas
  singUp(CuentasAhorro: cuentaAhorroI){
    this.CuentaAhorroService.singup(CuentasAhorro).subscribe( (res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Guardado!',
        text: 'Registrado correctamente!',
      });
      this.getCuentasAhorro();
    });
  }

  //Llenar modal por id
  getCuentasAhorroById(id_cuenta: cuentaAhorroI){
    this.CuentaAhorroService.getCuentasAhorroById(id_cuenta).subscribe( (res:any) =>{
      this.getcuentasahorroIdForm = new FormGroup({
        id_cuenta: new FormControl(res[0].id_cuenta, Validators.required),
        estado: new FormControl(res[0].estado, Validators.required),
        numero_cuenta: new FormControl(res[0].numero_cuenta, Validators.required),
        saldo: new FormControl(res[0].saldo, Validators.required),
        fecha_alta: new FormControl(res[0].fecha_alta, Validators.required),
      });
    });
  }

  //Actualizar registro
  putCuentasAhorro(cuenta: cuentaAhorroI){
    this.CuentaAhorroService.putCuentasAhorro(cuenta).subscribe( (res:ResponseI) =>{
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Cuenta Actualizada!',
      });
      this.getCuentasAhorro();
    })
  }

  //Borrar registros de la tabla
  deleteCuentaAhorroById(id_cuenta: cuentaAhorroI){
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
          this.CuentaAhorroService.deleteCuentaAhorroById(id_cuenta).subscribe( (res:ResponseI) =>{
          this.getCuentasAhorro();
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
