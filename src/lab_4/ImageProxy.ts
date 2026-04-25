import { type Graphic } from "./Graphic";
import { RealImage } from "./RealImage";

export class ImageProxy implements Graphic {
  private realImage: RealImage | null = null;
  private filename: string;
  private placeholderWidth: number;
  private placeholderHeight: number;

  constructor(
    filename: string,
    placeholderWidth: number,
    placeholderHeight: number,
  ) {
    this.filename = filename;
    this.placeholderWidth = placeholderWidth;
    this.placeholderHeight = placeholderHeight;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    if (this.realImage) {
      this.realImage.draw(ctx, x, y);
    } else {
      ctx.save();
      ctx.strokeStyle = "lightblue";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(x, y, this.placeholderWidth, this.placeholderHeight);
      ctx.restore();

      ctx.font = "14px sans-serif";
      ctx.fillStyle = "lightblue";
      ctx.fillText("TestImage", x + 10, y + 25);
    }
  }

  loadImage(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
  }

  getWidth(): number {
    return this.realImage ? this.realImage.getWidth() : this.placeholderWidth;
  }

  getHeight(): number {
    return this.realImage ? this.realImage.getHeight() : this.placeholderHeight;
  }
}
