import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit {
  color: ThemePalette = 'accent';


  constructor() { }

  ngOnInit(): void {
  }

  demo: number=0;
  val = 50;
  min = 0;
  max = 100;

}
