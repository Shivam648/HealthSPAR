import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { PatientProfileService } from 'src/app/service/patient-profile.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  email = '';
  password = '';
  selectedRole = 'PATIENT';
  patientId='';
  errorMessage= '';
  successMessage = '';
  loginForm: FormGroup; 
  signupForm: FormGroup;


  constructor(private renderer: Renderer2, private authService: AuthenticationService, private formBuilder: FormBuilder,private route:Router,private patientService:PatientProfileService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email is required and should be a valid email format
      password: ['', Validators.required] // Password is required
    });

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/[A-Za-z]+/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), customPasswordValidator]]
    });
  }


  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response) => {
          this.successMessage = 'Login successful';
          localStorage.setItem('access_token',response.access_token)
          this.getPatientByEmail(this.loginForm.value.email);
          this.loginForm.reset();
          this.route.navigate(['/patient/index']);
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.successMessage = '';
        }
      );
    }
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
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('email', this.signupForm.value.email);
            localStorage.setItem('name', this.signupForm.value.name);
            this.route.navigate(['/patient/profile']);
          },
          (error) => {
            console.error(error);
          }
        );
    } 
  }

  getPatientByEmail(email: string): void {
    this.patientService.getPatientByEmail(email).subscribe(
      (response) => {
        this.patientId = response.patientId;  
        localStorage.setItem("patientId", this.patientId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit() {
    // Create a script element
    const script = this.renderer.createElement('script');

    // Set the inner HTML of the script element to your script code
    script.innerHTML = `
      const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (() => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (() => {
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (() => {
        signupBtn.click();
        return false;
      });
    `;

    // Append the script element to the component's HTML
    this.renderer.appendChild(document.body, script);
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
