package airport;

import java.util.ArrayList;
import java.util.List;

public class EconomyClass extends Human implements CompositeHuman {
    private List<Human> passengers;
    private static final int MAX_CAPACITY = 150;
    private static final double FREE_BAGGAGE_LIMIT = 20; // бесплатно 20 кг
    private List<Human> removedBaggagePassengers;
    
    public EconomyClass(String name) {
        super(name);
        this.passengers = new ArrayList<>();
        this.removedBaggagePassengers = new ArrayList<>();
    }
    
    @Override
    public void addHuman(Human human) {
        if (passengers.size() < MAX_CAPACITY && human instanceof Passenger) {
            passengers.add(human);
            System.out.println("Добавлен пассажир эконом класса: " + human.getName());
        } else if (passengers.size() >= MAX_CAPACITY) {
            System.out.println("Эконом класс переполнен!");
        } else if (!(human instanceof Passenger)) {
            System.out.println("В эконом класс могут добавляться только пассажиры!");
        }
    }
    
    @Override
    public void removeHuman(Human human) {
        passengers.remove(human);
        System.out.println("Удален пассажир эконом класса: " + human.getName());
    }
    
    public List<Human> getRemovedBaggagePassengers() {
        return removedBaggagePassengers;
    }
    
    public void removeExcessBaggage(double maxAircraftLoad, double currentLoad) {
        double excess = currentLoad - maxAircraftLoad;
        if (excess <= 0) return;
        
        System.out.println("\n=== Снятие багажа с эконом класса ===");
        System.out.println("Перегруз: " + String.format("%.2f", excess) + " кг");
        
        // Сортируем пассажиров по весу багажа (от большего к меньшему)
        passengers.sort((p1, p2) -> Double.compare(p2.getBaggageWeight(), p1.getBaggageWeight()));
        
        for (Human passenger : new ArrayList<>(passengers)) {
            if (excess <= 0) break;
            
            double passengerWeight = passenger.getBaggageWeight();
            if (passengerWeight > FREE_BAGGAGE_LIMIT) {
                double canRemove = passengerWeight - FREE_BAGGAGE_LIMIT;
                double toRemove = Math.min(canRemove, excess);
                
                passenger.setBaggageWeight(passengerWeight - toRemove);
                excess -= toRemove;
                
                removedBaggagePassengers.add(passenger);
                System.out.println("  У " + passenger.getName() + " снято " + 
                                  String.format("%.2f", toRemove) + " кг багажа");
            }
        }
    }
    
    @Override
    public void loadBaggage() {
        double totalWeight = 0;
        double overweight = 0;
        System.out.println("\n=== Эконом класс (лимит 20 кг) ===");
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
        System.out.println("Общий вес багажа эконом класса: " + 
                          String.format("%.2f", totalWeight) + " кг");
        System.out.println("Общее превышение в эконом классе: " + 
                          String.format("%.2f", overweight) + " кг");
    }
}
