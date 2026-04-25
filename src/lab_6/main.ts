import { PerformanceTracker } from "./PerformanceTracker";
import { DeanOffice } from "./DeanOffice";

document.addEventListener("DOMContentLoaded", () => {
  const teacherIds = ["Иванов", "Петрова", "Сидоров"];
  const tracker = new PerformanceTracker(teacherIds);

  const logContainer = document.getElementById("log")!;
  const deanOffice = new DeanOffice(logContainer);
  tracker.Attach(deanOffice);

  const statusElements: Record<string, HTMLElement> = {};
  teacherIds.forEach((id) => {
    const el = document.getElementById(`status-${id}`);
    if (el) statusElements[id] = el;
  });

  teacherIds.forEach((id) => {
    const btn = document.getElementById(`btn-${id}`);
    if (btn) {
      btn.addEventListener("click", () => {
        tracker.SubmitReport(id);
        if (statusElements[id]) {
          statusElements[id].textContent = "Сдано";
          statusElements[id].style.color = "green";
        }
      });
    }
  });

  const deadlineBtn = document.getElementById("deadline-btn");
  if (deadlineBtn) {
    deadlineBtn.addEventListener("click", () => {
      logContainer.innerHTML = "";
      tracker.CheckDeadline();
    });
  }
});
