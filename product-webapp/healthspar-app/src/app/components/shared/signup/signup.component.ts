// signup.component.ts
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  selectedRole = 'PATIENT';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/[A-Za-z]+/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), customPasswordValidator]]
    });
  }

  selectRole(role: string) {
    this.selectedRole = role;
  }

  signup(): void {
    if (this.signupForm.valid) {
      this.authService
        .signup(
          this.signupForm.value.name,
          this.signupForm.value.email,
          this.signupForm.value.password,
          this.selectedRole
        )
        .subscribe(
          (response) => {
            // Handle success, navigate to appropriate route
            if (response.selectedRole === 'PATIENT') {
              this.router.navigate(['/patient-profile']);
            } else {
              this.router.navigate(['/hospital-details']);
            }
          },
          (error) => {
            // Handle error
            console.error(error);
          }
        );
    } else {
      // Form is invalid, you can handle this case as needed
    }
  }
}

function customPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value as string;

  if (!password) {
    return null;
  }

  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;

  if (!regex.test(password)) {
    return { invalidPassword: true };
  }

  return null;
}