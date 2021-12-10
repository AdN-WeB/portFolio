import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  userForm: any;
  honneyPot: FormControl = new FormControl('');
  submitted: boolean = false;
  isLoading: boolean = false;
  responseMessage: string | undefined; 
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userTel: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+)33|0)[1-9](\\d{2}){4}$'),
        ],
      ],
      userMsg: [
        '',
        [
          Validators.maxLength(400),
          Validators.minLength(5),
          Validators.required,
        ],
      ],
      honneyPot: this.honneyPot,
    });
  }

  ngOnInit(): void {}
  redirected() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.userForm.status == "VALID" && this.honneyPot.value == '') {
      this.userForm.disable();
      this.isLoading = true;
      this.submitted = false;
     
      const formData: any = new FormData();
      formData.append('userName', this.userForm.get('userName').value);
      formData.append('userEmail', this.userForm.get('userEmail').value);
      formData.append('userTel', this.userForm.get('userTel').value);
      formData.append('userMsg', this.userForm.get('userMsg').value);
      
      this.http
      .post(
        'https://script.google.com/macros/s/AKfycbypOHAyNos1VtdhhavklswS9w0XbzRyEQfNA1q2G77BdjKgSR4/exec',
        formData
      ).subscribe(
        (response:any) => {
          if (response.result == 'success') {
            this.responseMessage = "Votre message a bien été transmit";  
          } else {
            this.responseMessage = "Oops!! Un problème est survenu, rafraichissez et réessayez";
          }
          this.userForm.enable();
          this.submitted = true;
          this.isLoading = false;
        },
        (error) => {
          this.responseMessage = "Oops!! Un problème est survenu, rafraichissez et réessayez"
          this.userForm.enable();
          this.submitted = true;
          this.isLoading = false;
        }
      );
 
    }
  }

  clear() {
    this.userForm.controls.userName.setValue('');
    this.userForm.controls.userEmail.setValue('');
    this.userForm.controls.userTel.setValue('');
    this.userForm.controls.userMsg.setValue('');
  }
}
