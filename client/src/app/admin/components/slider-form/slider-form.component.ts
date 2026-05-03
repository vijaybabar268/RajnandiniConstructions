import { Component, ElementRef, ViewChild } from '@angular/core';
import { SliderService } from '../../_services/slider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-slider-form',
  templateUrl: './slider-form.component.html',
  styleUrls: ['./slider-form.component.css']
})
export class SliderFormComponent {
  slide: any = {};
  title: string = "";
  @ViewChild('fileInput') fileInput!: ElementRef;
    
  constructor(private sliderService: SliderService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(p => {
      var id = (isNaN(Number(p['id']))) ? 0 : Number(p['id']);
      this.slide.id = id;
      this.title = (this.slide.id > 0) ? "Edit": "New";
    })
  }

  ngOnInit(): void {
    if(this.slide.id){
      this.sliderService.getSlide(this.slide.id).subscribe({
        next: (res) => {
          this.slide = res;
          console.log(res);
        },
        error: (err) => console.log("Error: ", err),
        complete: () => console.log("Request completed")
      })
    }
  }
    
  // save() {
  //   var result$ = this.slide.id != 0 ? this.sliderService.update(this.slide) : this.sliderService.create(this.slide);
  //   result$.subscribe({
  //     next: (res) => {
  //       this.slide = res;
  //       this.router.navigateByUrl('/admin/sliders');
  //     },
  //     error: (err) => console.log("Error: ", err),
  //     complete: () => console.log("Request completed")
  //   })
  // }

  save() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    const files = nativeElement.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.sliderService.upload(this.slide, file).subscribe({
        next: x => {
          console.log(x);
          this.router.navigateByUrl('/admin/sliders');
        },
        error: err => {
          alert('Error while uploading photos: ' + err);
        }
      });
    } else {
      // no file selected - create or update slide without uploading a file
      const result$ = this.slide.id && this.slide.id !== 0 ? this.sliderService.update(this.slide) : this.sliderService.create(this.slide);
      result$.subscribe({
        next: res => {
          this.slide = res;
          this.router.navigateByUrl('/admin/sliders');
        },
        error: err => console.log('Error: ', err)
      });
    }
  }

}
