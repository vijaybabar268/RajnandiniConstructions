import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-slider',
  templateUrl: './carousel-slider.component.html',
  styleUrls: ['./carousel-slider.component.css']
})
export class CarouselSliderComponent implements OnInit {
  
  slides = [
    {
      id: 1,
      title: 'Residential Complex - Phase 1',
      description: 'Modern residential complex with 200+ units',
      image: 'assets/images/construction1.svg',
      badge: 'Active'
    },
    {
      id: 2,
      title: 'Commercial Plaza',
      description: 'Premium commercial space in business district',
      image: 'assets/images/construction2.svg',
      badge: 'In Progress'
    },
    {
      id: 3,
      title: 'Educational Institution',
      description: 'World-class school building with modern facilities',
      image: 'assets/images/construction3.svg',
      badge: 'Completed'
    },
    {
      id: 4,
      title: 'Shopping Mall Extension',
      description: 'Expansion of existing shopping complex',
      image: 'assets/images/construction1.svg',
      badge: 'Completed'
    }
    ,
    {
      id: 5,
      title: 'Rooftop Garden',
      description: 'Green rooftop with seating and planters',
      image: 'assets/images/construction2.svg',
      badge: 'Active'
    },
    {
      id: 6,
      title: 'Lakeside Villas',
      description: 'Luxury villas overlooking a lake',
      image: 'assets/images/construction3.svg',
      badge: 'In Progress'
    }
  ];

  currentSlide = 0;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.autoSlide();
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
    }, 5000); // Change slide every 5 seconds
  }

  getBackground(slide: any): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${slide.image}')`);
  }
}
