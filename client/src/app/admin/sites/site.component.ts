import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

interface Site {
  id: number;
  name: string;
  location: string;
  type: string;
  status: string;
  progress: number;
  date: string;
}

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'location', 'type', 'status', 'progress', 'date', 'actions'];
  dataSource!: MatTableDataSource<Site>;
  searchControl = new FormControl('');
  statusFilter = new FormControl('');

  sites: Site[] = [
    { id: 1, name: 'Residential Complex - Phase 1', location: 'Downtown', type: 'Residential', status: 'Active', progress: 75, date: '2025-01-15' },
    { id: 2, name: 'Commercial Plaza', location: 'Business District', type: 'Commercial', status: 'In Progress', progress: 50, date: '2025-02-01' },
    { id: 3, name: 'School Building', location: 'Suburb', type: 'Institutional', status: 'Planned', progress: 20, date: '2025-04-20' },
    { id: 4, name: 'Shopping Mall Extension', location: 'City Center', type: 'Commercial', status: 'Completed', progress: 100, date: '2024-06-10' },
    { id: 5, name: 'Residential Apartments', location: 'East Wing', type: 'Residential', status: 'Active', progress: 60, date: '2025-03-05' }
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.sites);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // Search filter
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value || '');
    });

    // Status filter
    this.statusFilter.valueChanges.subscribe(value => {
      this.applyStatusFilter(value || '');
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyStatusFilter(status: string): void {
    if (status) {
      this.dataSource.data = this.sites.filter(site => site.status === status);
    } else {
      this.dataSource.data = this.sites;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'accent';
      case 'In Progress':
        return 'warn';
      case 'Planned':
        return 'primary';
      case 'Completed':
        return '';
      default:
        return '';
    }
  }

  getProgressColor(progress: number): 'accent' | 'primary' | 'warn' {
    if (progress >= 75) return 'accent';
    if (progress >= 50) return 'warn';
    return 'primary';
  }

  editSite(site: Site): void {
    console.log('Edit site:', site);
  }

  viewDetails(site: Site): void {
    console.log('View details:', site);
  }

  deleteSite(site: Site): void {
    if (confirm(`Are you sure you want to delete "${site.name}"?`)) {
      this.sites = this.sites.filter(s => s.id !== site.id);
      this.dataSource.data = this.sites;
    }
  }

  addNewSite(): void {
    console.log('Add new site');
  }
}
