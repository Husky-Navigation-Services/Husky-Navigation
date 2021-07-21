package com.uw.huskynavigation;

public class Edge {
    public float distance;
    public Node start;
    public Node end;

    // Constructs an instance of a edge given a distance, start, and end.
    public Edge(float distance, Node start, Node end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Illegal start or end given.");
        }
        this.distance = distance;
        this.start = start;
        this.end = end;
    }

    // Constructs an instance of an edge, with a computed distance, given a start and end.
    public Edge(Node start, Node end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Illegal start or end given.");
        }
        this.start = start;
        this.end = end;
        this.distance = (float) distance((double) start.latitude, (double) start.longitude, (double) end.latitude, (double) end.longitude);
    }

    // Returns the distance from the start and end nodes.
    public float getDistance() {
        return distance;
    }

    // Returns the start node.
    public Node getStart() {
        return start;
    }

    // Returns the end node.
    public Node getEnd() {
        return end;
    }

    // Returns an integer comparing one edge to another edge object.
    public int compareTo(Edge other) {
        if (this.distance > other.distance) {
            return 1;
        } else if (this.distance < other.distance) {
            return -1;
        }
        return 0;
    }

    // Returns true or false if this edge is equal to the given object.
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (!(o instanceof Edge)) {
            return false;
        }
        return this.toString().equals(o.toString());
    }

    // Returns a hash code representation of this edge.
    public int hashCode() {
        return start.hashCode() ^ end.hashCode();
    }

    // Returns a string represenation of this edge.
    public String toString() {
        return start + " -> " + end + " [" + distance + "]";
    }

    private double distance(double lat1, double lon1, double lat2, double lon2) {
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;
        return (dist);
      }
      
      /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
      /*::  This function converts decimal degrees to radians             :*/
      /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
      private double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
      }
      
      /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
      /*::  This function converts radians to decimal degrees             :*/
      /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
      private double rad2deg(double rad) {
        return (rad * 180.0 / Math.PI);
      }
      
}
// 1 <-- DO NOT DELETE THE DAMN 1