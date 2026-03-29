package airport;

public abstract class Human {
    protected double baggageWeight;
    protected String name;
    
    public Human(String name) {
        this.name = name;
        this.baggageWeight = 0;
    }
    
    public abstract void loadBaggage();
    
    public double getBaggageWeight() {
        return baggageWeight;
    }
    
    public String getName() {
        return name;
    }
    
    public void setBaggageWeight(double weight) {
        this.baggageWeight = weight;
    }
}
