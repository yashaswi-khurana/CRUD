import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user-interface';
import { UserService } from '../../core/services/user.service';
import { response } from 'express';
import { error } from 'console';
import { RedirectCommand } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
  imports: [CommonModule, ReactiveFormsModule] 
})

export class SellerAuthComponent {
  signupForm: FormGroup;
  userService = inject(UserService);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      user_Name: ['', Validators.required],
      first_Name: ['', Validators.required],
      middle_Name: [''],
      last_Name: [''], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
      email: ['', [Validators.required, Validators.email]] 
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      // console.log(this.signupForm.value);
      this.userService.registerUser(this.signupForm.value).subscribe((response)=>{
        console.log('User Has been added Successfully:',response);
        // localStorage.setItem("Token", response.Token);
      },
    (error)=>{
      console.error('Error adding user',error)
    })
    }
  }
}