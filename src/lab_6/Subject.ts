import { type Observer } from "./Observer";

export interface Subject {
  Attach(observer: Observer): void;
  Detach(observer: Observer): void;
  Notify(): void;
}
