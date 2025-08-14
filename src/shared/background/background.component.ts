import { Component } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent {
  bitstreams = Array.from({length: 6}, () => Math.round(Math.random()));
  bitstreamLines: number[][] = [];
  numLines = 25; // match your circuit lines
  
  ngOnInit() {
    // Precompute bitstreams for each circuit line
    for (let i = 0; i < this.numLines; i++) {
      // Generate 6–10 bits randomly per line
      const length = 6 + Math.floor(Math.random() * 5);
      this.bitstreamLines[i] = Array.from({ length }, () => Math.round(Math.random()));
    }
  }
}
