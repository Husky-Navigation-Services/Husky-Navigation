public class Node {
    private String location;
    private String latitude;
    private String longitude;
    
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
        if (location == null) {
            throw new NoSuchFieldError("No location field implemented");
        }
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
}