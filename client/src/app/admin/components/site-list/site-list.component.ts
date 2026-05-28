import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../_services/site.service';

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

  toggleStatus(id: number) {
    if (confirm("Are you sure?")) {
      this.siteService.toggleStatus(id).subscribe(
        x => {
          this.router.navigate(['/sites']);
          this.getSites();
        },
        err => {
          alert("Error while deleting vehicle: "+ err);
        }
      );
    }
  }

}
