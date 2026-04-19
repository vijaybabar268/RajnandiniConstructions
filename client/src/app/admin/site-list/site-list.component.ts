import { Component, OnInit } from '@angular/core';
import { SiteService } from '../_services/site.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  sites: any = [];
  
  constructor(private siteService: SiteService, private router: Router) { }
    
  ngOnInit() {
    this.getSites();
  }

  getSites() {
    this.siteService.getSites().subscribe({
      next: (res) => {
        this.sites = res;
        console.log(res);
      },
      error: (err) => console.log("Error: ", err),
      complete: () => console.log("Request completed")
    })
  }
  
  delete(id: number) {
    if (confirm("Are you sure?")) {
      this.siteService.delete(id).subscribe(
        x => {
          alert("Deleted vehicle successfully.");
          this.router.navigate(['/vehicles']);
          this.getSites();
        },
        err => {
          alert("Error while deleting vehicle: "+ err);
        }
      );
  }}
}
