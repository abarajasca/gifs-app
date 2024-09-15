import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})

export class LazyImageComponent implements OnInit {
  constructor() { }

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  ngOnInit() { }

  public imageLoaded: boolean = false;

  public loaded(): void {
    this.imageLoaded = true;
  }

}
