import java.util.*;

public class Decision {
    private ArrayList<Set<Pair>> neighbors;
    private Map<Integer, Node> nodeSearch;

    // Takes a map of each individual node to all nearby nodes.
    public Decision(Map<Node, Set<Pair>> paths) {
        this.neighbors = new ArrayList<Set<Pair>>();
        this.nodeSearch = new HashMap<Integer, Node>();
        for (int i = 0; i < paths.keySet().size(); i++) {
            neighbors.add(new HashSet<Pair>());
        }
        for (Node node : paths.keySet()) {
            nodeSearch.put(node.id, node);
            neighbors.set(node.id, paths.get(node));
        }
    }

    public static void main(String args[]) {
        ArrayList<Integer> visitedNodes = new ArrayList<Integer>();
        ArrayList<Integer> distances = new ArrayList<Integer>();
        for (int i = 0; i < 4; i++) {
            visitedNodes.add(i);
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

        Map<Node, Set<Pair>> decisionMap = new HashMap<Node, Set<Pair>>();
        decisionMap.put(n0, s0);
        decisionMap.put(n1, s1);
        decisionMap.put(n2, new HashSet<Pair>());
        decisionMap.put(n3, s3);
        
        Decision decision = new Decision(decisionMap);
        ArrayList<Node> path = new ArrayList<Node>();
        System.out.println(decision.getShortestPath(n0, n2, path));
        System.out.println(path);
    }
    
    public int getShortestPath(Node start, Node end, ArrayList<Node> path) {
        // Final part return the total distance in feet and through refrence
        // semantics a path of nodes.
        ArrayList<Integer> predecessors = new ArrayList<Integer>();
        ArrayList<Integer> distances = new ArrayList<Integer>();
        for (int i = 0; i < neighbors.size(); i++) {
            predecessors.add(i);
            distances.add(Integer.MAX_VALUE);
        }
        getShortestPath(start.id, start.id, 0, predecessors, distances);
        for (int nodeId: getPath(start.id, end.id, predecessors)) {
            path.add(nodeSearch.get(nodeId));
        }
        return distances.get(end.id);
    }

    private void getShortestPath(int previousId, int currentId, int totalDistance,
            ArrayList<Integer> predecessors, ArrayList<Integer> distances) {
        if (distances.get(currentId) <= totalDistance) {
            return;
        }
        distances.set(currentId, totalDistance);
        predecessors.set(currentId, previousId);
        for (Pair neighbor : neighbors.get(currentId)) {
            getShortestPath(currentId, neighbor.end.id, totalDistance + neighbor.distance, predecessors, distances);
        }
    }

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

    /*
    public String toString() {
        String finalString = "";
        if (path != null) {
            for (Node location : path) {
                finalString += "-> [" + location + "]";
            }
        }
        return finalString;
    }
    */
}