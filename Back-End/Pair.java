public class Pair implements Comparable<Node> {
    private final int distance;
    private final Node start;
    private final Node end;

    // Constructs an instance of a pair given a distance, start, and end.
    public Pair(int distance, Node start, Node end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Illegal start or end given.");
        }
        this.distance = distance;
        this.start = start;
        this.end = end;
    }

    // Returns the distance from the start and end nodes.
    public int getDistance() {
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

    // Returns an integer comparing one pair to another pair object.
    public int compareTo(Pair other) {
        if (this.distance > other.distance) {
            return 1;
        } else if (this.distance < other.distance) {
            return -1;
        }
        return 0;
    }

    // Returns true or false if this pair is equal to the given object.
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (!(o instanceof DNAStrand)) {
            return false;
        }
        return this.toString().equals(o.toString());
    }

    // Returns a hash code representation of this pair.
    public int hashCode() {
        return start.hashCode() ^ end.hashCode();
    }
}