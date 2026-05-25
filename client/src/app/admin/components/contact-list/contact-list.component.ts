import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../_services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.getContacts();  
  }

  getContacts() {
    this.contactService.getContacts().subscribe({
      next: (res) => {
        this.contacts = res;
        console.log(res);
      },
      error: (err) => console.log("Error: ", err),
      complete: () => console.log("Request completed")
    })
  }

}
