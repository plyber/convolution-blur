import {Component, HostListener} from '@angular/core';
import {ConvolutionService} from "../convolution.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  gridSize: number = 100;
  grid: number[][] = [];
  mouseIsDown = false;
  blurSize: number = 1;
  history: number[][][] = [];

  constructor(private convolutionService: ConvolutionService) {
    for (let i = 0; i < this.gridSize; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.gridSize; j++) {
        this.grid[i][j] = 255;
        this.history.push(this.grid)
      }
    }
  }

  onMouseDown(row: number, col: number): void {
    this.mouseIsDown = true;
    this.drawCell(row, col);
  }

  onMouseMove(row: number, col: number): void {
    if (this.mouseIsDown) {
      this.drawCell(row, col);
    }
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    this.mouseIsDown = false;
  }

  applyBlur(): void {
    this.grid = this.convolutionService.applyBlur(this.grid, this.blurSize)
    this.history.push(this.grid)
  }

  getCellColor(value: number): string {
    const intensity = 255 - value;
    return `rgb(${intensity}, ${intensity}, ${intensity})`;
  }

  private drawCell(row: number, col: number): void {
    this.grid[row][col] = 0;
  }
}
