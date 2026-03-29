package airport;

import java.util.Random;

public class Passenger extends Human {
    private String classType;
    
    public Passenger(String name, String classType) {
        super(name);
        this.classType = classType;
        Random rand = new Random();
        // багаж от 5 до 60 кг
        this.baggageWeight = 5 + rand.nextDouble() * 55;
    }
    
    @Override
    public void loadBaggage() {
        System.out.println("Пассажир " + name + " (" + classType + 
                          ") загружает багаж весом: " + 
                          String.format("%.2f", baggageWeight) + " кг");
    }
    
    public String getClassType() {
        return classType;
    }
}
