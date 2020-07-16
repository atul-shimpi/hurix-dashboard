import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineGraphComponent } from './componenets/line-graph/line-graph.component';
import { ElementRef } from '@angular/core';
import * as D3 from 'd3';

@NgModule({
  declarations: [
    LineGraphComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LineGraphComponent
  ]
})
export class SharedModule { }
