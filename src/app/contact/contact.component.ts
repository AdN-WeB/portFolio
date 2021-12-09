import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  userForm: any;

  constructor(public fb:FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userTel: ['', [Validators.required, Validators.pattern('^((\\+)33|0)[1-9](\\d{2}){4}$')]],
      userMsg: ['', [Validators.maxLength(400),Validators.minLength(5), Validators.required]],
    });
   }

  ngOnInit(): void {
  }
  redirected(){
    this.router.navigate(['/home']);
  }
 

  onSubmit() {
    if(this.userForm.valid){
      alert("Votre message a bien été transmis");
      
        console.log(this.userForm)
        this.router.navigate(['/home']);
      }

}

clear(){
    this.userForm.controls.userName.setValue('');
    this.userForm.controls.userEmail.setValue('');
    this.userForm.controls.userTel.setValue('');
    this.userForm.controls.userMsg.setValue('');
}
}
