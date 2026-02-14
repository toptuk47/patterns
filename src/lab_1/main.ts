import { Depot } from "./depot";
import {
  BoardTaxi,
  BoardBus,
  BusDriver,
  TaxiDriver,
  type Driver,
  Passenger,
} from "./entities";

const depot = Depot.getInstance();
let driver: Driver;

// Выбор типа автомобиля для загрузки

const chooseTaxiCarButton: HTMLButtonElement | null = document.querySelector(
  ".choose-car__taxi-button",
);
const chooseBusCarButton: HTMLButtonElement | null = document.querySelector(
  ".choose-car__bus-button",
);
const chosenCarOutput: HTMLSpanElement | null = document.querySelector(
  ".choose-car__chosen-car",
);

console.log(chooseTaxiCarButton);
console.log(chooseBusCarButton);
console.log(chosenCarOutput);

if (chooseTaxiCarButton && chosenCarOutput) {
  chooseTaxiCarButton.addEventListener("click", () => {
    depot.boardCarBehavior(new BoardTaxi());
    chosenCarOutput.textContent = "Такси";
  });
}

if (chooseBusCarButton && chosenCarOutput) {
  chooseBusCarButton.addEventListener("click", () => {
    depot.boardCarBehavior(new BoardBus());
    chosenCarOutput.textContent = "Автобус";
  });
}

// Выбор типа водителя для загрузки

const chooseTaxiDriverButton: HTMLButtonElement | null = document.querySelector(
  ".choose-driver__taxi-button",
);
const chooseBusDriverButton: HTMLButtonElement | null = document.querySelector(
  ".choose-driver__bus-button",
);
const chosenDriverOutput: HTMLSpanElement | null = document.querySelector(
  ".choose-driver__chosen-driver",
);

console.log(chooseTaxiDriverButton);
console.log(chooseBusDriverButton);
console.log(chosenDriverOutput);

if (chosenDriverOutput && chooseTaxiDriverButton) {
  chooseTaxiDriverButton.addEventListener("click", () => {
    driver = TaxiDriver.getInstance();
    chosenDriverOutput.textContent = "Такси";
  });
}

if (chosenDriverOutput && chooseBusDriverButton) {
  chooseBusDriverButton.addEventListener("click", () => {
    driver = BusDriver.getInstance();
    chosenDriverOutput.textContent = "Автобус";
  });
}

// Загрузка водителя/пассажиров

const loadDriverButton: HTMLButtonElement | null =
  document.querySelector(".load-driver");

const loadPassengerButton: HTMLButtonElement | null =
  document.querySelector(".load-passenger");

console.log(loadDriverButton);
console.log(loadPassengerButton);

if (loadDriverButton) {
  loadDriverButton.addEventListener("click", () => {
    depot.loadDriver(driver);
  });
}

if (loadPassengerButton) {
  loadPassengerButton.addEventListener("click", () => {
    depot.loadPassenger(new Passenger());
  });
}
