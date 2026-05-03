import { Component } from '@angular/core';
import { SliderService } from '../../_services/slider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.css']
})
export class SliderListComponent {
  sliders: any = [];
    
  constructor(private sliderService: SliderService, private router: Router) { }
    
  ngOnInit() {
    this.getSliders();
  }

  getSliders() {
    this.sliderService.getSliders().subscribe({
      next: (res) => {
        this.sliders = res;
        console.log(res);
      },
      error: (err) => console.log("Error: ", err),
      complete: () => console.log("Request completed")
    })
  }

  delete(id: number) {
  if (confirm("Are you sure?")) {
    this.sliderService.delete(id).subscribe(
      x => {
        alert("Deleted sliders successfully.");
        this.router.navigate(['/sliders']);
        this.getSliders();
      },
      err => {
        alert("Error while deleting vehicle: "+ err);
      }
    );
  }}

  toggleStatus(id: number) {
    if (confirm("Are you sure?")) {
      this.sliderService.toggleStatus(id).subscribe(
        x => {
          this.router.navigate(['/sliders']);
          this.getSliders();
        },
        err => {
          alert("Error while deleting vehicle: "+ err);
        }
      );
    }
  }

}
