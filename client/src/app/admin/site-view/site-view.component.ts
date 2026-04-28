import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SiteService } from '../_services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../_services/photo.service';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.css']
})
export class SiteViewComponent implements OnInit {
  photos: any = [];
  sites: any = [];
  site: any = {};
  siteId: number = 0;
  title: string = "Site Details";
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private siteService: SiteService,
    private photoService: PhotoService, 
    private router: Router, 
    private route: ActivatedRoute) {
      
    route.params.subscribe(p => {
      var id = (isNaN(Number(p['id']))) ? 0 : Number(p['id']);
      this.site.id = id;
      this.siteId = id;
    })
  }

  ngOnInit() {
    if(this.site.id) {
      this.siteService.getSite(this.site.id).subscribe({
        next: (res) => {
          this.site = res;
          this.loadPhotos();
          console.log(res);
        },
        error: (err) => console.log("Error: ", err),
        complete: () => console.log("Request completed")
      })
    }

    this.photoService.getPhotos(this.siteId).subscribe({
      next: (res) => {
        this.photos = res;
        console.log(res);
      },
      error: (err) => console.log("Error: ", err),
      complete: () => console.log("Request completed")
    })
  }

  loadPhotos() {
    if (!this.siteId) return;
    this.photoService.getPhotos(this.siteId).subscribe({
      next: (res: any) => {
        // Normalize filename casing coming from the API (FileName / fileName / filename)
        this.photos = (res || []).map((p: any) => ({ filename: p.fileName ?? p.FileName ?? p.filename }));
        console.log('Photos:', this.photos);
      },
      error: (err: any) => console.log('Error loading photos', err)
    })
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
          alert("Deleted site successfully.");
          this.router.navigate(['/admin/sites']);
          this.getSites();
        },
        err => {
          alert("Error while deleting vehicle: "+ err);
        }
      );
  }}

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    const files = nativeElement.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.photoService.upload(this.siteId, file).subscribe(
        x => {
          console.log(x);        
          this.loadPhotos();
          // this.router.navigate(['/admin/sites']);
        },
        err => {
          alert("Error while uploading photos: "+ err);
        }
      );
    }
  }

}
