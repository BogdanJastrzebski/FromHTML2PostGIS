package edu.MapApp;

public class Package {
    private final long number;
    private final String name;
    private final float size;
    private final float lat;
    private final float lng;

    public Package(long number, String name, float size, float lat, float lng) {
        this.number = number;
        this.name = name;
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
    public float getSize() {
        return size;
    }
    public float getLat() {
        return lat;
    }
    public float getLng() {
        return lng;
    }

}
