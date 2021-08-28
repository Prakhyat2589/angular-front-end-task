import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-site-maintenance',
  templateUrl: './site-maintenance.component.html',
  styleUrls: ['./site-maintenance.component.scss']
})
export class SiteMaintenanceComponent implements OnInit {

  constructor(private meta: Meta, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Website | Site Maintenance');
    this.meta.updateTag({ name: 'description', content: 'Site Maintenance' });
  }

}
