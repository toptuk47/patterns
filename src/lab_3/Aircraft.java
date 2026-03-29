package airport;

import java.util.ArrayList;
import java.util.List;

public class Aircraft extends Human implements CompositeHuman {
    private List<Human> sections;
    private double maxBaggageLoad;
    
    public Aircraft(String name, double maxBaggageLoad) {
        super(name);
        this.sections = new ArrayList<>();
        this.maxBaggageLoad = maxBaggageLoad;
    }
    
    @Override
    public void addHuman(Human human) {
        sections.add(human);
    }
    
    @Override
    public void removeHuman(Human human) {
        sections.remove(human);
    }
    
    @Override
    public List<Human> getHumans() {
        return sections;
    }
    
    public void setMaxBaggageLoad(double maxBaggageLoad) {
        this.maxBaggageLoad = maxBaggageLoad;
    }
    
    public double getMaxBaggageLoad() {
        return maxBaggageLoad;
    }
    
    @Override
    public void loadBaggage() {
        double totalWeight = 0;
        System.out.println("\n========================================");
        System.out.println("Загрузка самолета " + name);
        System.out.println("========================================");
        
        for (Human section : sections) {
            section.loadBaggage();
            if (section instanceof FirstClass) {
                totalWeight += ((FirstClass) section).getHumans().stream()
                    .mapToDouble(Human::getBaggageWeight).sum();
            } else if (section instanceof BusinessClass) {
                totalWeight += ((BusinessClass) section).getHumans().stream()
                    .mapToDouble(Human::getBaggageWeight).sum();
            } else if (section instanceof EconomyClass) {
                totalWeight += ((EconomyClass) section).getHumans().stream()
                    .mapToDouble(Human::getBaggageWeight).sum();
            }
        }
        
        System.out.println("\n========================================");
        System.out.println("ИТОГОВАЯ ЗАГРУЗКА САМОЛЕТА");
        System.out.println("========================================");
        System.out.println("Общий вес багажа: " + String.format("%.2f", totalWeight) + " кг");
        System.out.println("Максимально допустимый вес: " + String.format("%.2f", maxBaggageLoad) + " кг");
        
        if (totalWeight > maxBaggageLoad) {
            double excess = totalWeight - maxBaggageLoad;
            System.out.println("ПЕРЕГРУЗ: " + String.format("%.2f", excess) + " кг");
            
            // Ищем секцию эконом класса для снятия багажа
            for (Human section : sections) {
                if (section instanceof EconomyClass) {
                    ((EconomyClass) section).removeExcessBaggage(maxBaggageLoad, totalWeight);
                    break;
                }
            }
            
            // Пересчитываем вес после снятия багажа
            double newTotalWeight = 0;
            for (Human section : sections) {
                if (section instanceof FirstClass) {
                    newTotalWeight += ((FirstClass) section).getHumans().stream()
                        .mapToDouble(Human::getBaggageWeight).sum();
                } else if (section instanceof BusinessClass) {
                    newTotalWeight += ((BusinessClass) section).getHumans().stream()
                        .mapToDouble(Human::getBaggageWeight).sum();
                } else if (section instanceof EconomyClass) {
                    newTotalWeight += ((EconomyClass) section).getHumans().stream()
                        .mapToDouble(Human::getBaggageWeight).sum();
                }
            }
            
            System.out.println("\n--- ПОСЛЕ СНЯТИЯ БАГАЖА ---");
            System.out.println("Новый общий вес: " + String.format("%.2f", newTotalWeight) + " кг");
            
            // Выводим информацию о снятом багаже
            for (Human section : sections) {
                if (section instanceof EconomyClass) {
                    List<Human> removed = ((EconomyClass) section).getRemovedBaggagePassengers();
                    if (!removed.isEmpty()) {
                        System.out.println("\nСнятый багаж (эконом класс):");
                        for (Human passenger : removed) {
                            System.out.println("  - " + passenger.getName() + 
                                             " (" + String.format("%.2f", passenger.getBaggageWeight()) + " кг после снятия)");
                        }
                    }
                    break;
                }
            }
        } else {
            System.out.println("Загрузка в пределах нормы");
        }
    }
}
