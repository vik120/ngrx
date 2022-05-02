import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {
  title: string
  userForm: FormGroup;
  bsModalRef?: BsModalRef;
  loading: boolean = false
  isModalShown: boolean = false
  submitted = false;

  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }
 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.title = 'Edit user'
    this.userForm = this.formBuilder.group({
      phone: ['', [ Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onHidden(){
    this.isModalShown = false
  }

  addOrUpdateUser(){
    this.submitted = false
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
  }

}
