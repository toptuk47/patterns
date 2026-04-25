import { type Graphic } from "./Graphic";

export class RealImage implements Graphic {
  private image: HTMLImageElement;
  private loaded = false;

  constructor(filename: string) {
    this.image = new Image();
    this.image.src = filename;
    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    if (this.loaded) {
      ctx.drawImage(this.image, x, y);
    } else {
      ctx.fillStyle = "lightblue";
      ctx.fillRect(x, y, 100, 100);
    }
  }

  getWidth(): number {
    return this.loaded ? this.image.naturalWidth : 100;
  }

  getHeight(): number {
    return this.loaded ? this.image.naturalHeight : 100;
  }
}
