import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private metaTagService: Meta
  ) { }
  ngOnInit() {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Front-end Task' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Prakhyat Gailani' },
    ]);
  }
}
