package map;

public class Package {
    private long number;
    private String name;
    private double size;
    private double lat;
    private double lng;

    public Package(long number,
                   String name,
                   double size,
                   double lat,
                   double lng) {
        this.name = name;
        this.number = number;
        this.size = size;
        this.lat = lat;
        this.lng = lng;

    }

    public long getNumber() {
        return number;
    }
    public String getName() {
        return name;
    }
    public double getSize() {
        return size;
    }
    public double getLat() {
        return lat;
    }
    public double getLng() {
        return lng;
    }

}
