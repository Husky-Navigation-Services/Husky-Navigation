import java.util.*;

public class Decision {
    private List<Node> decision;
    private Map<Node, Set<Pair>> paths;

    // Takes a map of each individual node to all nearby nodes.
    public Decision() {
    }

    public static void main(String args[]) {
        int [] predecessors = new int[4];
        int [] distances = new int[4];
        for (int i = 0; i < 4; i++) {
            predecessors[i] = i;
            distances[i] = Integer.MAX_VALUE;
        }

        Node n0 = new Node(0, "12", "12");
        Node n1 = new Node(1, "12", "12");
        Node n2 = new Node(2, "12", "12");
        Node n3 = new Node(3, "12", "12");




        Set<Pair>[] neighbors = new Set<Pair>[4];
        shortestPath(0, 0, 0, 0,  predecessors, distances, neighbors)
    }

    public void shortestPath(int previousId, int currentId, int totalDistance,
            int[] predecessors, int[] distances, Set<Pair>[] neighbors) {
        if (distances[currentId] <= totalDistance) {
            return;
        }
        distances[currentId] = totalDistance;
        predecessors[currentId] = previousId;
        for (Pair neighbor : neighbors[currentId]) {
            shortestPath(currentId, neighbor.end.id, totalDistance + neighbor.distance, predecessors, distances, neighbors);
        }
    }

    public List<Node> getDecision() {
        return decision;
    }

    public String toString() {
        String finalString = "";
        if (decision != null) {
            for (Node location : decision) {
                finalString += "-> [" + location + "]";
            }
        }
        return finalString;
    }
}