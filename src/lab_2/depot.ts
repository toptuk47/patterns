export enum DriverLicense {
  BUS,
  TAXI,
}

export enum PassengerCategory {
  ADULT,
  PREFERENTIAL,
  CHILD,
}

export class Driver {
  constructor(private license: DriverLicense) { }

  getLicense(): DriverLicense {
    return this.license;
  }
}

export class Passenger {
  constructor(private category: PassengerCategory) { }

  getCategory(): PassengerCategory {
    return this.category;
  }
}

export interface Vehicle {
  addDriver(driver: Driver): void;
  addPassenger(passenger: Passenger): void;
  getCurrentLoad(): number;
  getMaxCapacity(): number;
  isReadyToDepart(): boolean;
}

export class Bus implements Vehicle {
  private passengers: Passenger[] = [];
  private driver: Driver | null = null;
  private readonly maxCapacity = 30;

  addDriver(driver: Driver): void {
    if (this.driver) {
      console.log("В автобусе уже есть водитель!");
      return;
    }
    if (driver.getLicense() !== DriverLicense.BUS) {
      console.log("Водитель не имеет прав нужной категории!");
      return;
    }
    this.driver = driver;
    console.log("Водитель автобуса назначен.");
  }

  addPassenger(passenger: Passenger): void {
    if (this.passengers.length >= this.maxCapacity) {
      console.log("Автобус переполнен (макс. 30 пассажиров)!");
      return;
    }
    this.passengers.push(passenger);
    console.log(
      `Пассажир (${PassengerCategory[passenger.getCategory()]}) добавлен в автобус.`,
    );
  }

  getCurrentLoad(): number {
    return this.passengers.length;
  }

  getMaxCapacity(): number {
    return this.maxCapacity;
  }

  isReadyToDepart(): boolean {
    if (!this.driver) {
      console.log("Автобус не готов: нет водителя.");
      return false;
    }
    if (this.passengers.length === 0) {
      console.log("Автобус не готов: нет пассажиров.");
      return false;
    }
    console.log("Автобус готов к отправлению.");
    return true;
  }
}

export class Taxi implements Vehicle {
  private passengers: Passenger[] = [];
  private driver: Driver | null = null;
  private readonly maxCapacity = 4;
  private hasChildSeat = false;

  addDriver(driver: Driver): void {
    if (this.driver) {
      console.log("В такси уже есть водитель!");
      return;
    }
    if (driver.getLicense() !== DriverLicense.TAXI) {
      console.log("Водитель не имеет прав нужной категории!");
      return;
    }
    this.driver = driver;
    console.log("Водитель такси назначен.");
  }

  addPassenger(passenger: Passenger): void {
    if (this.passengers.length >= this.maxCapacity) {
      console.log("Такси переполнено (макс. 4 пассажира)!");
      return;
    }
    const category = passenger.getCategory();
    if (category === PassengerCategory.PREFERENTIAL) {
      console.log("Льготные пассажиры не допускаются в такси.");
      return;
    }
    if (category === PassengerCategory.CHILD) {
      this.hasChildSeat = true; // автоматически устанавливаем кресло при посадке ребёнка
    }
    this.passengers.push(passenger);
    console.log(`Пассажир(${PassengerCategory[category]}) добавлен в такси.`);
  }

  getCurrentLoad(): number {
    return this.passengers.length;
  }

  getMaxCapacity(): number {
    return this.maxCapacity;
  }

  isReadyToDepart(): boolean {
    if (!this.driver) {
      console.log("Такси не готово: нет водителя.");
      return false;
    }
    if (this.passengers.length === 0) {
      console.log("Такси не готово: нет пассажиров.");
      return false;
    }

    const hasChildren = this.passengers.some(
      (p) => p.getCategory() === PassengerCategory.CHILD,
    );
    if (hasChildren && !this.hasChildSeat) {
      console.log("Такси не готово: есть ребёнок, но нет детского кресла.");
      return false;
    }
    console.log("Такси готово к отправлению.");
    return true;
  }

  isChildSeatNeeded(): boolean {
    return this.passengers.some(
      (p) => p.getCategory() === PassengerCategory.CHILD,
    );
  }
}

export interface VehicleBuilder {
  setDriver(driver: Driver): void;
  addPassenger(passenger: Passenger): void;
  isReadyToDepart(): boolean;
  getVehicle(): Vehicle;
}

export class BusBuilder implements VehicleBuilder {
  private bus: Bus;

  constructor() {
    this.bus = new Bus();
  }

  setDriver(driver: Driver): void {
    this.bus.addDriver(driver);
  }

  addPassenger(passenger: Passenger): void {
    this.bus.addPassenger(passenger);
  }

  isReadyToDepart(): boolean {
    return this.bus.isReadyToDepart();
  }

  getVehicle(): Vehicle {
    return this.bus;
  }
}

export class TaxiBuilder implements VehicleBuilder {
  private taxi: Taxi;

  constructor() {
    this.taxi = new Taxi();
  }

  setDriver(driver: Driver): void {
    this.taxi.addDriver(driver);
  }

  addPassenger(passenger: Passenger): void {
    this.taxi.addPassenger(passenger);
  }

  isReadyToDepart(): boolean {
    return this.taxi.isReadyToDepart();
  }

  getVehicle(): Vehicle {
    return this.taxi;
  }
}

export class Director {
  private builder: VehicleBuilder | null = null;

  setBuilder(builder: VehicleBuilder): void {
    this.builder = builder;
  }

  constructBus(driver: Driver, passengers: Passenger[]): void {
    if (!this.builder) {
      throw new Error(
        "Builder не установлен. Сначала выберите тип транспорта.",
      );
    }
    console.log("Директор начинает построение автобуса...");
    this.builder.setDriver(driver);
    for (const p of passengers) {
      this.builder.addPassenger(p);
    }
  }

  constructTaxi(driver: Driver, passengers: Passenger[]): void {
    if (!this.builder) {
      throw new Error(
        "Builder не установлен. Сначала выберите тип транспорта.",
      );
    }
    console.log("Директор начинает построение такси...");
    this.builder.setDriver(driver);
    for (const p of passengers) {
      this.builder.addPassenger(p);
    }
  }
}
