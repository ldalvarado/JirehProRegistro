import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm, FormControl, } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isReadyToSend = false;
  LoginForm: FormGroup;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
  ) {
    this.LoginForm = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(50)]),
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    })
    this.LoginForm.valueChanges.subscribe((v) => {
      this.isReadyToSend = this.LoginForm.valid;
    })
  }

  ngOnInit() {
  }

  async guardarDatos() {
    if(this.isReadyToSend === false){
      return
    }else{
      this.LoginForm.reset();
      this.presentToast('Logeado con exito');
      this.router.navigate(['/']);
    }
  }

  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }

}
