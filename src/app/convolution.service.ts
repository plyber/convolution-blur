import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvolutionService {

  constructor() {
  }

  clamp(num: number, min: number, max: number) {
    return num <= min ? min : num
    >= max ? max : num
  }

  applyBlur(grid: number[][],blurSize:number): number[][] {
    const blurredGrid = grid.map(row => [...row]);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        blurredGrid[i][j] = this.calculateAverage(grid, i, j,blurSize);
      }
    }
    return blurredGrid;
  }

  private calculateAverage(grid: number[][], x: number, y: number,blurSize:number): number {
    let sum = 0;
    let count = 0;

    for (let i = -blurSize; i <= blurSize; i++) {
      for (let j = -blurSize; j <= blurSize; j++) {
        const xi = x + i;
        const yj = y + j;

        if (xi >= 0 && xi < grid.length && yj >= 0 && yj < grid[xi].length) {
          sum += grid[xi][yj];
          count++;
        }
      }
    }
    return count > 0 ? this.clamp(sum / count, 0, 255) : grid[x][y];
    // return count > 0 ? Math.min(Math.max(Math.round(sum / count), 0), 255) : grid[x][y];
  }


}
