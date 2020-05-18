import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/firebase/auth.service';
import { Router } from '@angular/router';
import { PixabayService } from 'src/api/pixabay.service';

@Component({
  selector: 'eat-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild('frame') frame: ElementRef<HTMLDivElement>;
  @ViewChild('dialog') dialog: ElementRef<HTMLDivElement>;

  signinForm: FormGroup;
  errorMessage: string;

  hide: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private pixabayService: PixabayService) { }

  ngOnInit(): void {
    this.initForm();
    this.pixabayService.randomOne("montagne", img => 
      this.renderer.setStyle(this.frame.nativeElement, 'background-image', `url('${img.largeImageURL}')`));
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)]]
    });
  }
  
  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    
    this.authService.signIn(email, password).then(() => {
        this.animate();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 460);
      },
      err => console.log
    );
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
