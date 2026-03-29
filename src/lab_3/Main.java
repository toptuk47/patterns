package airport;

import java.util.Random;

public class Main {
    public static void main(String[] args) {
        // Создаем самолет с максимальной загрузкой 5000 кг
        Aircraft aircraft = new Aircraft("Boeing 747", 5000);
        
        // Создаем секции самолета
        FirstClass firstClass = new FirstClass("Первый класс");
        BusinessClass businessClass = new BusinessClass("Бизнес класс");
        EconomyClass economyClass = new EconomyClass("Эконом класс");
        
        // Добавляем пилотов (2)
        Pilot pilot1 = new Pilot("Пилот Иванов");
        Pilot pilot2 = new Pilot("Пилот Петров");
        
        // Добавляем стюардесс (6)
        Stewardess[] stewardesses = {
            new Stewardess("Стюардесса Анна"),
            new Stewardess("Стюардесса Мария"),
            new Stewardess("Стюардесса Елена"),
            new Stewardess("Стюардесса Ольга"),
            new Stewardess("Стюардесса Татьяна"),
            new Stewardess("Стюардесса Наталья")
        };
        
        // Добавляем пассажиров первого класса (10)
        for (int i = 1; i <= 10; i++) {
            Passenger passenger = new Passenger("Пассажир_1К_" + i, "первый");
            firstClass.addHuman(passenger);
        }
        
        // Добавляем пассажиров бизнес класса (20)
        for (int i = 1; i <= 20; i++) {
            Passenger passenger = new Passenger("Пассажир_БК_" + i, "бизнес");
            businessClass.addHuman(passenger);
        }
        
        // Добавляем пассажиров эконом класса (150)
        for (int i = 1; i <= 150; i++) {
            Passenger passenger = new Passenger("Пассажир_ЭК_" + i, "эконом");
            economyClass.addHuman(passenger);
        }
        
        // Добавляем все секции в самолет
        aircraft.addHuman(firstClass);
        aircraft.addHuman(businessClass);
        aircraft.addHuman(economyClass);
        
        // Загружаем багаж и проверяем готовность
        aircraft.loadBaggage();
    }
}
