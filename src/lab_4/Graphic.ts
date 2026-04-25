export interface Graphic {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
  getWidth(): number;
  getHeight(): number;
}
