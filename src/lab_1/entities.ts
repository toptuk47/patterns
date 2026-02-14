interface BoardAnyCar {
  boardDriver(driver: Driver): void;
  boardPassenger(passenger: Passenger): void;
}

class BoardTaxi implements BoardAnyCar {
  private driver: TaxiDriver | undefined;
  private passengers: Passenger[];

  public constructor() {
    this.passengers = [];
  }

  public boardDriver(driver: Driver): void {
    if (!(driver instanceof TaxiDriver)) {
      console.log("Нельзя посадить в такси водителя другой категории!");
      return;
    }

    if (!this.driver) {
      console.log("Водитель такси успешно сел в машину!");
      this.driver = TaxiDriver.getInstance();
      return;
    }

    console.log(
      "Водитель такси уже есть в машине! Нельзя посадить второго водителя.",
    );
  }

  public boardPassenger(passenger: Passenger): void {
    if (this.passengers.length < 4) {
      console.log("Пассажир успешно сел в такси!");
      this.passengers.push(passenger);
      return;
    }

    console.log(
      "Такси переполнено (4 человека)! Нельзя посадить нового пассажира.",
    );
  }
}

class BoardBus implements BoardAnyCar {
  private driver: BusDriver | undefined;
  private passengers: Passenger[];

  public constructor() {
    this.passengers = [];
  }

  public boardDriver(driver: Driver): void {
    if (!(driver instanceof BusDriver)) {
      console.log("Нельзя посадить в автобус водителя другой категории!");
      return;
    }

    if (!this.driver) {
      console.log("Водитель автобуса успешно сел в автобус!");
      this.driver = driver;
      return;
    }

    console.log(
      "Водитель автобуса уже есть! Нельзя посадить второго водителя.",
    );
  }

  public boardPassenger(passenger: Passenger): void {
    if (this.passengers.length < 30) {
      console.log("Пассажир успешно сел в автобус!");
      this.passengers.push(passenger);
      return;
    }

    console.log(
      "Автобус переполнен (30 человек)! Нельзя посадить нового пассажира.",
    );
  }
}

interface Driver { }

class BusDriver implements Driver {
  private static instance: BusDriver;

  private constructor() {
    console.log("Водитель автобуса был успешно создан!");
  }

  static getInstance() {
    if (!this.instance) {
      console.log("Создаем нового водителя автобуса.");
      this.instance = new BusDriver();
    } else {
      console.log("Водитель автобуса уже существует!");
    }

    return this.instance;
  }
}

class TaxiDriver implements Driver {
  private static instance: TaxiDriver;

  private constructor() {
    console.log("Водитель такси был успешно создан!");
  }

  static getInstance() {
    if (!this.instance) {
      console.log("Создаем нового водителя такси.");
      this.instance = new TaxiDriver();
    } else {
      console.log("Водитель такси уже существует!");
    }

    return this.instance;
  }
}

class Passenger { }

export type { BoardAnyCar, Driver };
export { BoardBus, BoardTaxi, BusDriver, TaxiDriver, Passenger };
