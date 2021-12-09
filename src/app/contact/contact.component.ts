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
    if (this.userForm.valid && this.honneyPot.value == '') {
      // this.userForm.disable();
      const formData: any = new FormData();
      formData.append('userName', this.userForm.get('userName').value);
      formData.append('userEmail', this.userForm.get('userEmail').value);
      formData.append('userTel', this.userForm.get('userTel').value);
      formData.append('userMsg', this.userForm.get('userMsg').value);
      this.isLoading = true;
      this.submitted = false;
      this.http
        .post(
          'https://script.google.com/macros/s/AKfycbypOHAyNos1VtdhhavklswS9w0XbzRyEQfNA1q2G77BdjKgSR4/exec',
          formData
        ).subscribe(
          (response) => {
            if (response == 'success') {
              this.responseMessage = 'Votre message a bien été transmit';
            } else {
              this.responseMessage =
                'Oops! un problème est survenue.. Rafraîchissez la page et réessayez';
            }
            this.userForm.enable();
            this.submitted = true;
            this.isLoading = false;
            console.log(response);
          },
          (error) => {
            this.responseMessage =
              'Oops! un problème est survenue.. Rafraîchissez la page et réessayez';
            this.userForm.enable();
            this.submitted = true;
            this.isLoading = false;
            console.log(error);
          }
        );
      this.router.navigate(['/home']);
    }
  }

  clear() {
    this.userForm.controls.userName.setValue('');
    this.userForm.controls.userEmail.setValue('');
    this.userForm.controls.userTel.setValue('');
    this.userForm.controls.userMsg.setValue('');
  }
}
