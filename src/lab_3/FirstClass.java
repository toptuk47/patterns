package airport;

import java.util.ArrayList;
import java.util.List;

public class FirstClass extends Human implements CompositeHuman {
    private List<Human> passengers;
    private static final int MAX_CAPACITY = 10;
    
    public FirstClass(String name) {
        super(name);
        this.passengers = new ArrayList<>();
    }
    
    @Override
    public void addHuman(Human human) {
        if (passengers.size() < MAX_CAPACITY && human instanceof Passenger) {
            passengers.add(human);
            System.out.println("Добавлен пассажир первого класса: " + human.getName());
        } else if (passengers.size() >= MAX_CAPACITY) {
            System.out.println("Первый класс переполнен!");
        } else if (!(human instanceof Passenger)) {
            System.out.println("В первый класс могут добавляться только пассажиры!");
        }
    }
    
    @Override
    public void removeHuman(Human human) {
        passengers.remove(human);
        System.out.println("Удален пассажир первого класса: " + human.getName());
    }
    
    @Override
    public void loadBaggage() {
        double totalWeight = 0;
        System.out.println("\n=== Первый класс (безлимитный багаж) ===");
        for (Human human : passengers) {
            human.loadBaggage();
            totalWeight += human.getBaggageWeight();
        }
        System.out.println("Общий вес багажа первого класса: " + 
                          String.format("%.2f", totalWeight) + " кг");
    }
}
