import { Component, OnInit } from '@angular/core';

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
      image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Crect fill=%22%234A90E2%22 width=%221200%22 height=%22600%22/%3E%3Ctext x=%22600%22 y=%22300%22 font-size=%2248%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EResidential Complex%3C/text%3E%3C/svg%3E',
      badge: 'Active'
    },
    {
      id: 2,
      title: 'Commercial Plaza',
      description: 'Premium commercial space in business district',
      image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Crect fill=%22%2350C878%22 width=%221200%22 height=%22600%22/%3E%3Ctext x=%22600%22 y=%22300%22 font-size=%2248%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3ECommercial Plaza%3C/text%3E%3C/svg%3E',
      badge: 'In Progress'
    },
    {
      id: 3,
      title: 'Educational Institution',
      description: 'World-class school building with modern facilities',
      image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Crect fill=%22%23FF6B6B%22 width=%221200%22 height=%22600%22/%3E%3Ctext x=%22600%22 y=%22300%22 font-size=%2248%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EEducational Institution%3C/text%3E%3C/svg%3E',
      badge: 'Completed'
    },
    {
      id: 4,
      title: 'Shopping Mall Extension',
      description: 'Expansion of existing shopping complex',
      image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Crect fill=%22%23FFD93D%22 width=%221200%22 height=%22600%22/%3E%3Ctext x=%22600%22 y=%22300%22 font-size=%2248%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EShopping Mall%3C/text%3E%3C/svg%3E',
      badge: 'Completed'
    }
  ];

  currentSlide = 0;

  constructor() { }

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
}
