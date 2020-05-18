import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/firebase/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'eat-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('frame') frame: ElementRef<HTMLDivElement>;
  @ViewChild('dialog') dialog: ElementRef<HTMLDivElement>;

  signupForm: FormGroup;
  errorMessage: string;

  hide: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)]]
    });
  }
  
  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    
    this.authService.createNewUser(email, password).then(
      () => {
        this.animate();
        setTimeout(() => this.router.navigate(['/home']), 400)
      },
      err => this.errorMessage = err
    );
    this.animate();
  }

  animate() {
  if(this.dialog != null) {
      this.renderer.setStyle(this.dialog.nativeElement, "transform", "translate3d(200px, -500px, 0) scale(0, 0)");
    }
  }

  blur(enable: boolean) {
    if(this.frame != null) {
      if(!enable) {
        this.renderer.addClass(this.frame.nativeElement, 'blur');
      }
      else 
      this.renderer.removeClass(this.frame.nativeElement, 'blur');
    }
    
  }

}
