import { Component, OnInit } from '@angular/core';
import { SiteService } from '../_services/site.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css']
})
export class SiteFormComponent implements OnInit {
  site: any = {};
  title: string = "";
    
  constructor(private siteService: SiteService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(p => {
      var id = (isNaN(Number(p['id']))) ? 0 : Number(p['id']);
      this.site.id = id;
      this.title = (this.site.id > 0) ? "Edit": "New";
    })
  }

  ngOnInit(): void {
    if(this.site.id){
      this.siteService.getSite(this.site.id).subscribe({
        next: (res) => {
          this.site = res;
          console.log(res);
        },
        error: (err) => console.log("Error: ", err),
        complete: () => console.log("Request completed")
      })
    }
  }
    
  save() {
    var result$ = this.site.id != 0 ? this.siteService.update(this.site) : this.siteService.create(this.site);
    result$.subscribe({
      next: (res) => {
        this.site = res;
        this.router.navigateByUrl('/admin/sites');
      },
      error: (err) => console.log("Error: ", err),
      complete: () => console.log("Request completed")
    })
  }
  
}
