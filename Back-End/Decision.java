import java.util.*;

public class Decision {
    private ArrayList<Node> path;

    // Takes a map of each individual node to all nearby nodes.
    public Decision(Map<Node, Set<Pair>> paths) {
    }

    public static void main(String args[]) {
        ArrayList<Integer> predecessors = new ArrayList<Integer>();
        ArrayList<Integer> distances = new ArrayList<Integer>();
        for (int i = 0; i < 4; i++) {
            predecessors.add(i);
            distances.add(Integer.MAX_VALUE);
        }

        Node n0 = new Node(0, "0", "0");
        Node n1 = new Node(1, "0", "0");
        Node n2 = new Node(2, "0", "0");
        Node n3 = new Node(3, "0", "0");

        Pair p01 = new Pair(3, n0, n1);
        Pair p03 = new Pair(2, n0, n3);
        Pair p12 = new Pair(1, n1, n2);
        Pair p32 = new Pair(5, n3, n2);

        Set<Pair> s0 = new HashSet<Pair>();
        s0.add(p01);
        s0.add(p03);
        Set<Pair> s1 = new HashSet<Pair>();
        s1.add(p12);
        Set<Pair> s3 = new HashSet<Pair>();
        s3.add(p32);

        ArrayList<Set<Pair>> neighbors = new ArrayList<Set<Pair>>();
        neighbors.add(s0);
        neighbors.add(s1);
        neighbors.add(new HashSet<Pair>());
        neighbors.add(s3);

        Decision decision = new Decision();
        decision.shortestPath(0, 0, 0, predecessors, distances, neighbors);
        System.out.println(distances.get(2));
        System.out.println(distances);
        System.out.println(decision.getPath(0, 2, predecessors));
    }

    private void shortestPath(int previousId, int currentId, int totalDistance,
            ArrayList<Integer> predecessors, ArrayList<Integer> distances,
            ArrayList<Set<Pair>> neighbors) {
        if (distances.get(currentId) <= totalDistance) {
            return;
        }
        distances.set(currentId, totalDistance);
        predecessors.set(currentId, previousId);
        for (Pair neighbor : neighbors.get(currentId)) {
            shortestPath(currentId, neighbor.end.id, totalDistance + neighbor.distance, predecessors, distances, neighbors);
        }
    }

// rename pair to edge

    private ArrayList<Integer> getPath(int startId, int endId, ArrayList<Integer> predecessors) {
        ArrayList<Integer> path = new ArrayList<Integer>();
        int currentId = endId;
        while (currentId != startId) {
            path.add(0, currentId);
            currentId = predecessors.get(currentId);
        }
        path.add(0, startId);
        return path;
    }

    public int getShortestPath(Node start, Node end, ArrayList<Node> path) {
        int totalLength = 0;
        
        return totalLength;
    }

    public ArrayList<Node> getPath() {
        return path;
    }

    public String toString() {
        String finalString = "";
        if (path != null) {
            for (Node location : path) {
                finalString += "-> [" + location + "]";
            }
        }
        return finalString;
    }
}