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
  projects: any = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  // Return a normalized filename for the site's first photo (handles arrays and casing)
  getPhotoFilename(site: any): string {
    if (!site) return 'assets/images/site_comming_soon.avif';
    const photos = Array.isArray(site.photos) ? site.photos : (site.photos ? [site.photos] : []);
    if (!photos || photos.length === 0) return 'assets/images/site_comming_soon.avif';
    const first = photos[0] || {};
    return first.fileName ?? first.FileName ?? first.filename ?? 'assets/images/about.jpg';
  }

  // Build full URL for the photo; fallback to a local asset when missing
  getPhotoUrl(site: any): string {
    const filename = this.getPhotoFilename(site);
    if (!filename) return 'assets/images/site_comming_soon.avif';
    // If filename already looks like a URL or local asset, return as-is
    if (filename.startsWith('http') || filename.startsWith('/') || filename.startsWith('assets')) {
      return filename;
    }
    return `https://localhost:5001/uploads/admin/projects/${filename}`;
  }

  getProjects() {
    this.homeService.getProjects().subscribe({
      next: (res) => {
        this.projects = res;
      },
      error: (err) => console.log("Error: ", err),
      complete: () => console.log("Request completed")
    })
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
