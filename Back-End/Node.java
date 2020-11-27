public class Node {
    private final String location;
    private final String latitude;
    private final String longitude;
    
    // Constructs a new node instance given a latitude and longitude.
    public Node(String latitude, String longitude) {
        this(latitude, longitude, null);
    }

    // Constructs a new node instance given a location, latitude, and longitude.
    public Node(String latitude, String longitude, String location) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.location = location;
    }

    // Returns a string location.
    public String getLocation() {
        return location;
    }

    // Returns a string latitude.
    public String getLatitude() {
        return latitude;
    }

    // Returns a string longitude.
    public String getLongitude() {
        return longitude;
    }

    // Returns a string representation of the node data type.
    public String toString() {
        if (location != null) {
            return "(" + latitude + ", " + longitude + ")";
        } else {
            return location + ": (" + latitude + ", " + longitude + ")";
        }
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
}