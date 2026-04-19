import { Component, OnInit } from '@angular/core';
import { SiteService } from '../_services/site.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.css']
})
export class SiteViewComponent implements OnInit {
  site: any = {};
  title: string = "Site Details";

  constructor(private siteService: SiteService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(p => {
      var id = (isNaN(Number(p['id']))) ? 0 : Number(p['id']);
      this.site.id = id;
    })
  }

  ngOnInit() {
    if(this.site.id) {
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

}
