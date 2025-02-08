import { Component,inject } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

    loginForm: FormGroup;
    userService = inject(UserService);
    authService = inject(AuthService);

    constructor(private fb: FormBuilder, private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  
    onSubmit() {
      if (this.loginForm.valid) {
        const login = this.loginForm.value;
        
        this.userService.loginUser(login).subscribe(
          (response) => {
            this.router.navigate(['']); 
          },
          (error) => {
            console.error('Error login:', error);
          }
        );
      } else {
        console.error('Form is invalid');
      }
    }


}
