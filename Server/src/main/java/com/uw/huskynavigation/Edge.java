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
        this.distance = (float) Math.sqrt(((start.latitude-end.latitude)*(start.latitude-end.latitude)
        -(start.longitude-end.longitude)*(start.longitude-end.longitude)));
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
}