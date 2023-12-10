import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HospitalService } from 'src/app/service/hospital.service';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-hospital-register',
  templateUrl: './hospital-register.component.html',
  styleUrls: ['./hospital-register.component.css']
})
export class HospitalRegisterComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  selectedRole: string = 'HCP';
  errorMessage: string = '';
  hospitalId: number = 0;
  successMessage: string = '';
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private renderer: Renderer2, private authService: AuthenticationService, private formBuilder: FormBuilder, private route: Router, private hospitalService: HospitalService) {
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

  public getHospitalByEmail(email: string): void {
    this.hospitalService.getHospitalProfileByEmail(email).subscribe(
      (response) => {
        this.hospitalId = response.hospitalId;
        localStorage.setItem("hospitalId", `${this.hospitalId}`);
      },
      (error) => {
        console.error(error);
      }
    )
  }


  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response) => {
          this.successMessage = 'Login successful';
          localStorage.setItem('access_token', response.access_token);
          this.getHospitalByEmail(this.loginForm.value.email);
          this.loginForm.reset();
          this.route.navigate(['/hospital/dashboard']);
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
            this.route.navigate(['/hospital/profile']);
          },
          (error) => {
            console.error(error);
          }
        );
    }
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
