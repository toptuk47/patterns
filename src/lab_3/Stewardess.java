package airport;

public class Stewardess extends Human {
    public Stewardess(String name) {
        super(name);
        this.baggageWeight = 0; // стюардессы не имеют багажа
    }
    
    @Override
    public void loadBaggage() {
        System.out.println("Стюардесса " + name + " не имеет багажа");
    }
}
