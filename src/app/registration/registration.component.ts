import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      termsAndConditions: [false, Validators.requiredTrue]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    const passwordControl = g.get('password');
    const confirmPasswordControl = g.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
        return passwordControl.value === confirmPasswordControl.value ? null : { 'mismatch': true };
    }
    return null; // or return { 'mismatch': true } if you want to treat missing controls as a mismatch
}


onSubmit() {
  if (this.registerForm.valid) {
    const { email, password } = this.registerForm.value;
    // Handle your registration logic here
    this.authService.Register(email, password);
  } else {
    // Handle errors or prompt user
  }
}

}
