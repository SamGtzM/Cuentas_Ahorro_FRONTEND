import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginI } from '../../models/login.interface'
import { ResponseI } from 'src/app/models/response.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
});

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logIn(user: loginI){
    this.authService.singin(user).subscribe( (res: ResponseI)=>{
      localStorage.setItem('token', res['token']);
      this.router.navigate(['']);
    });
  }

}
