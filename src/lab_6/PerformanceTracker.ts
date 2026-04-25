import { type Subject } from "./Subject";
import { type Observer } from "./Observer";

export class PerformanceTracker implements Subject {
  private observers: Observer[] = [];
  private teachers: Map<string, boolean> = new Map();

  constructor(teacherIds: string[]) {
    teacherIds.forEach((id) => this.teachers.set(id, false));
  }

  Attach(observer: Observer): void {
    this.observers.push(observer);
  }

  Detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  Notify(): void {
    const defaulters = Array.from(this.teachers.entries())
      .filter(([, submitted]) => !submitted)
      .map(([id]) => id);

    if (defaulters.length > 0) {
      this.observers.forEach((observer) => observer.Update(defaulters));
    }
  }

  SubmitReport(teacherId: string): void {
    if (this.teachers.has(teacherId)) {
      this.teachers.set(teacherId, true);
    }
  }

  CheckDeadline(): void {
    this.Notify();
  }
}
