package com.uw.huskynavigation;

public class Node {
    public int id;
    public String location;
    public float latitude;
    public float longitude;
    
    // Constructs a new node instance given a id, latitude, and longitude.
    public Node(int id, float latitude, float longitude) {
        this(id, latitude, longitude, null);
    }

    // Constructs a new node instance given a id, location, latitude, and longitude.
    public Node(int id, float latitude, float longitude, String location) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.location = location;
    }

    // Returns a string identification.
    public int getId() {
        return id;
    }

    // Returns a string location.
    public String getLocation() {
        return location;
    }

    // Returns a decimal latitude.
    public float getLatitude() {
        return latitude;
    }

    // Returns a decimal longitude.
    public float getLongitude() {
        return longitude;
    }

    // Returns true or false if this node is equal to the given object.
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (!(o instanceof Node)) {
            return false;
        }
        return this.toString().equals(o.toString());
    }

    // Returns a integer hashcode representation of this DNA strand.
    public int hashCode() {
        return toString().hashCode();
    }

    // Returns a string representation of the node data type.
    public String toString() {
        if (location == null) {
            return "(" + latitude + ", " + longitude + ")" + "[" + id + "]";
        } else {
            return location + ": (" + latitude + ", " + longitude + ")" + "[" + id + "]";
        }
    }
}