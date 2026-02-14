import { type Driver, Passenger, type BoardAnyCar } from "./entities";

class Depot {
  private static instance: Depot;

  private boardBehavior: BoardAnyCar | undefined;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Depot();
    }

    return this.instance;
  }

  public boardCarBehavior(behavior: BoardAnyCar) {
    this.boardBehavior = behavior;
  }

  public loadDriver(driver: Driver) {
    if (!this.boardBehavior) {
      console.log("Вы еще не выбрали, в какой автомобиль будете загружать!");
      return;
    }

    this.boardBehavior.boardDriver(driver);
  }

  public loadPassenger(passenger: Passenger) {
    if (!this.boardBehavior) {
      console.log("Вы еще не выбрали, в какой автомобиль будете загружать!");
      return;
    }

    this.boardBehavior.boardPassenger(passenger);
  }
}

export { Depot };
