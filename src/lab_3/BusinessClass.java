package airport;

import java.util.ArrayList;
import java.util.List;

public class BusinessClass extends Human implements CompositeHuman {
    private List<Human> passengers;
    private static final int MAX_CAPACITY = 20;
    private static final double FREE_BAGGAGE_LIMIT = 35; // бесплатно 35 кг
    
    public BusinessClass(String name) {
        super(name);
        this.passengers = new ArrayList<>();
    }
    
    @Override
    public void addHuman(Human human) {
        if (passengers.size() < MAX_CAPACITY && human instanceof Passenger) {
            passengers.add(human);
            System.out.println("Добавлен пассажир бизнес класса: " + human.getName());
        } else if (passengers.size() >= MAX_CAPACITY) {
            System.out.println("Бизнес класс переполнен!");
        } else if (!(human instanceof Passenger)) {
            System.out.println("В бизнес класс могут добавляться только пассажиры!");
        }
    }
    
    @Override
    public void removeHuman(Human human) {
        passengers.remove(human);
        System.out.println("Удален пассажир бизнес класса: " + human.getName());
    }
    
    @Override
    public void loadBaggage() {
        double totalWeight = 0;
        double overweight = 0;
        System.out.println("\n=== Бизнес класс (лимит 35 кг) ===");
        for (Human human : passengers) {
            human.loadBaggage();
            double passengerWeight = human.getBaggageWeight();
            totalWeight += passengerWeight;
            if (passengerWeight > FREE_BAGGAGE_LIMIT) {
                overweight += (passengerWeight - FREE_BAGGAGE_LIMIT);
                System.out.println("  Превышение у " + human.getName() + 
                                  ": " + String.format("%.2f", passengerWeight - FREE_BAGGAGE_LIMIT) + " кг");
            }
        }
        System.out.println("Общий вес багажа бизнес класса: " + 
                          String.format("%.2f", totalWeight) + " кг");
        System.out.println("Общее превышение в бизнес классе: " + 
                          String.format("%.2f", overweight) + " кг");
    }
}
