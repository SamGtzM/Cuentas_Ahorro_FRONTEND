import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CuentasAhorroComponent } from './components/cuentas-ahorro/cuentas-ahorro.component';
import { TransacctionesComponent } from './components/transacctiones/transacctiones.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate:[RoleGuard] },
  { path: 'cuenta_ahorro', component: CuentasAhorroComponent, canActivate:[RoleGuard] },
  { path: 'transacciones', component: TransacctionesComponent, canActivate:[RoleGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
