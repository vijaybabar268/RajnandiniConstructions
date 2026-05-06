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
  selectedFile: File | null = null;
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  buildFormData(): FormData {
    const formData = new FormData();

    formData.append('Title', this.slide.title);
    formData.append('Description', this.slide.description);

    if (this.selectedFile) {
      formData.append('File', this.selectedFile);
    }

    return formData;
  }

  save() {
    const formData = this.buildFormData();

    if (this.slide.id === 0) {
      // CREATE
      this.sliderService.createSlider(formData).subscribe({
        next: res => {
          console.log('Created:', res);
          this.router.navigateByUrl('/admin/sliders');
        },
        error: err => console.error(err)
      });
    } else {
      // UPDATE
      this.sliderService.updateSlider(this.slide.id, formData).subscribe({
        next: () => {
          console.log('Updated');
          this.router.navigateByUrl('/admin/sliders');
        },
        error: err => console.error(err)
      });
    }
  }

}
