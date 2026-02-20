import {
  Director,
  BusBuilder,
  TaxiBuilder,
  Driver,
  DriverLicense,
  Passenger,
  PassengerCategory,
  type VehicleBuilder,
} from "./depot";

const chooseTaxiBtn = document.getElementById(
  "chooseTaxi",
) as HTMLButtonElement;
const chooseBusBtn = document.getElementById("chooseBus") as HTMLButtonElement;
const chosenVehicleSpan = document.getElementById(
  "chosenVehicle",
) as HTMLSpanElement;

const chooseTaxiDriverBtn = document.getElementById(
  "chooseTaxiDriver",
) as HTMLButtonElement;
const chooseBusDriverBtn = document.getElementById(
  "chooseBusDriver",
) as HTMLButtonElement;
const chosenDriverSpan = document.getElementById(
  "chosenDriver",
) as HTMLSpanElement;

const addAdultBtn = document.getElementById("addAdult") as HTMLButtonElement;
const addPreferentialBtn = document.getElementById(
  "addPreferential",
) as HTMLButtonElement;
const addChildBtn = document.getElementById("addChild") as HTMLButtonElement;
const passengerCountSpan = document.getElementById(
  "passengerCount",
) as HTMLSpanElement;
const passengerListDiv = document.getElementById(
  "passengerList",
) as HTMLDivElement;

const buildBtn = document.getElementById("buildAndDepart") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

let currentVehicleType: "bus" | "taxi" | null = null;
let currentDriver: Driver | null = null;
let passengers: Passenger[] = [];

const director = new Director();
let currentBuilder: VehicleBuilder | null = null;

// --- Вспомогательные функции ---
function updateUI() {
  // Транспорт
  chosenVehicleSpan.textContent =
    currentVehicleType === "bus"
      ? "Автобус"
      : currentVehicleType === "taxi"
        ? "Такси"
        : "—";
  // Водитель
  if (currentDriver) {
    const license =
      currentDriver.getLicense() === DriverLicense.BUS ? "BUS" : "TAXI";
    chosenDriverSpan.textContent = license === "BUS" ? "Автобуса" : "Такси";
  } else {
    chosenDriverSpan.textContent = "—";
  }
  // Пассажиры
  passengerCountSpan.textContent = passengers.length.toString();
  if (passengers.length === 0) {
    passengerListDiv.innerHTML = "<i>нет пассажиров</i>";
  } else {
    const counts = { ADULT: 0, PREFERENTIAL: 0, CHILD: 0 };
    passengers.forEach(
      (p) =>
        counts[PassengerCategory[p.getCategory()] as keyof typeof counts]++,
    );
    passengerListDiv.innerHTML = `
      🧑 Взрослых: ${counts.ADULT}<br>
      👴 Льготных: ${counts.PREFERENTIAL}<br>
      🧒 Детей: ${counts.CHILD}
    `;
  }
}

function resetState() {
  currentVehicleType = null;
  currentDriver = null;
  passengers = [];
  currentBuilder = null;
  director.setBuilder(null as any); // сбрасываем билдер в директоре
  updateUI();
  resultDiv.innerHTML = "";
  console.clear();
}

// --- Обработчики выбора транспорта ---
chooseTaxiBtn.addEventListener("click", () => {
  currentVehicleType = "taxi";
  currentBuilder = new TaxiBuilder();
  director.setBuilder(currentBuilder);
  // Сбрасываем водителя и пассажиров, т.к. они могут не подходить для нового ТС
  currentDriver = null;
  passengers = [];
  updateUI();
  console.log("Выбран строитель такси");
});

chooseBusBtn.addEventListener("click", () => {
  currentVehicleType = "bus";
  currentBuilder = new BusBuilder();
  director.setBuilder(currentBuilder);
  currentDriver = null;
  passengers = [];
  updateUI();
  console.log("Выбран строитель автобуса");
});

// --- Обработчики выбора водителя ---
chooseTaxiDriverBtn.addEventListener("click", () => {
  if (!currentVehicleType) {
    alert("Сначала выберите тип транспорта!");
    return;
  }
  currentDriver = new Driver(DriverLicense.TAXI);
  updateUI();
  console.log("Выбран водитель такси");
});

chooseBusDriverBtn.addEventListener("click", () => {
  if (!currentVehicleType) {
    alert("Сначала выберите тип транспорта!");
    return;
  }
  currentDriver = new Driver(DriverLicense.BUS);
  updateUI();
  console.log("Выбран водитель автобуса");
});

// --- Обработчики добавления пассажиров ---
addAdultBtn.addEventListener("click", () => {
  if (!currentVehicleType) {
    alert("Сначала выберите тип транспорта!");
    return;
  }
  passengers.push(new Passenger(PassengerCategory.ADULT));
  updateUI();
});

addPreferentialBtn.addEventListener("click", () => {
  if (!currentVehicleType) {
    alert("Сначала выберите тип транспорта!");
    return;
  }
  // Для такси льготные не допускаются (проверка будет в билдере, но предупредим заранее)
  if (currentVehicleType === "taxi") {
    alert("Льготные пассажиры не могут ехать в такси!");
    return;
  }
  passengers.push(new Passenger(PassengerCategory.PREFERENTIAL));
  updateUI();
});

addChildBtn.addEventListener("click", () => {
  if (!currentVehicleType) {
    alert("Сначала выберите тип транспорта!");
    return;
  }
  passengers.push(new Passenger(PassengerCategory.CHILD));
  updateUI();
});

// --- Построение и отправка ---
buildBtn.addEventListener("click", () => {
  if (!currentVehicleType) {
    alert("Выберите тип транспорта!");
    return;
  }
  if (!currentDriver) {
    alert("Выберите водителя!");
    return;
  }
  if (passengers.length === 0) {
    alert("Добавьте хотя бы одного пассажира!");
    return;
  }

  // Очищаем предыдущие логи и вывод
  console.clear();
  resultDiv.innerHTML = "";

  // Строим через Director
  try {
    if (currentVehicleType === "bus") {
      director.constructBus(currentDriver, passengers);
    } else {
      director.constructTaxi(currentDriver, passengers);
    }

    // Проверяем готовность
    if (currentBuilder) {
      const ready = currentBuilder.isReadyToDepart();
      const vehicle = currentBuilder.getVehicle();
      resultDiv.innerHTML = `
        <strong>Результат:</strong><br>
        Транспорт: ${currentVehicleType === "bus" ? "Автобус" : "Такси"}<br>
        Загрузка: ${vehicle.getCurrentLoad()}/${vehicle.getMaxCapacity()}<br>
        Готов к отправке: ${ready ? "✅ ДА" : "❌ НЕТ"}<br>
        ${currentVehicleType === "taxi" ? `Детское кресло необходимо: ${(vehicle as any).isChildSeatNeeded() ? "✅" : "❌"}` : ""}
      `;
    }
  } catch (e: any) {
    alert(e.message);
  }
});

// --- Сброс ---
resetBtn.addEventListener("click", resetState);

// Инициализация UI
updateUI();
