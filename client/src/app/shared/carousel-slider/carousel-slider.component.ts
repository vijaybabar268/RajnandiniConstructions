import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from 'src/app/public/_services/home.service';

@Component({
  selector: 'app-carousel-slider',
  templateUrl: './carousel-slider.component.html',
  styleUrls: ['./carousel-slider.component.css']
})
export class CarouselSliderComponent implements OnInit {
  slides: any = [];
  currentSlide = 0;

  constructor(private sanitizer: DomSanitizer, private homeService: HomeService) { }

  ngOnInit(): void {
    this.getSliders();
    this.autoSlide();
  }

  getSliders() {
    this.homeService.getActiveSliders().subscribe({
      next: (res) => {
        this.slides = res;
        console.log(res);
      },
      error: (err) => console.log("Error: ", err),
      complete: () => console.log("Request completed")
    })
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  autoSlide(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  getBackground(slide: any) {
    if (!slide || !slide.url) return '';
    const url = `url('https://localhost:5001/uploads/admin/sliders/${slide.url}')`;
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }
}
