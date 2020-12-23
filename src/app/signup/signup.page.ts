import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm, FormControl, } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/mustMatch.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isReadyToSend = false;
  SignupForm: FormGroup;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
  ) {
    this.SignupForm = formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      nacionalidad: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      cedula: ['', [Validators.required, Validators.min(10000000), Validators.max(50000000)]],
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(50)]),
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    },{ validator: MustMatch('password', 'confirmpassword') })
    this.SignupForm.valueChanges.subscribe((v) => {
      this.isReadyToSend = this.SignupForm.valid;
    })
  }

  ngOnInit() {
  }

  async guardarDatos() {
    if(this.isReadyToSend === false){
      return
    }else{
      this.SignupForm.reset();
      this.presentToast('Registrado con exito');
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
