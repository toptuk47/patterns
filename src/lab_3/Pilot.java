package airport;

public class Pilot extends Human {
    public Pilot(String name) {
        super(name);
        this.baggageWeight = 0; // пилоты не имеют багажа
    }
    
    @Override
    public void loadBaggage() {
        System.out.println("Пилот " + name + " не имеет багажа");
    }
}
