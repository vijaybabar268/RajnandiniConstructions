import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HomeService } from '../_services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contact: any = {};
  message: string = "";

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    console.log(this.contact);
    this.homeService.saveContactUs(this.contact).subscribe({
      next: (res) => {
        this.message = "Thank you for reaching out to us! We’ve received your message and our team will respond shortly.";
        form.resetForm();
        console.log(res);
      },
      error: (err) => console.log("Error: ", err),
      complete: () => console.log("Request completed")
    });
  }

}
