import { type Observer } from "./Observer";

export class DeanOffice implements Observer {
  private logContainer: HTMLElement;

  constructor(logContainer: HTMLElement) {
    this.logContainer = logContainer;
  }

  Update(data: any): void {
    const defaulters: string[] = data as string[];
    defaulters.forEach((teacherId) => {
      const message = `Деканат оповещает кафедру. Преподаватель ${teacherId} вовремя не сдал текущую успеваемость!`;
      this.addLog(message);
    });
  }

  private addLog(message: string): void {
    const p = document.createElement("p");
    p.textContent = message;
    this.logContainer.appendChild(p);
  }
}
