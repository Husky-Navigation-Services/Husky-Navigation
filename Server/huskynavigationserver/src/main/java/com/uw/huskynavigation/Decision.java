package com.uw.huskynavigation;

import java.util.*;

public class Decision {
    private ArrayList<Set<Edge>> neighbors;
    private Map<Integer, Node> nodeSearch;

    // Constructs a decision module given a map that connects a node to the set
    // of possible paths. Also sets up a way to find nodes based on a node id.
    public Decision(Map<Node, Set<Edge>> paths) {
        this.neighbors = new ArrayList<Set<Edge>>();
        this.nodeSearch = new HashMap<Integer, Node>();
        for (int i = 0; i < paths.keySet().size(); i++) {
            neighbors.add(new HashSet<Edge>());
        }
        for (Node node : paths.keySet()) {
            nodeSearch.put(node.id, node);
            neighbors.set(node.id, paths.get(node));
        }
    }

    // Returns the total distance of the optimal path. Gives the optimal path given
    // a start and end node through reference semantics for a given array list.
    public float getDecision(Node start, Node end, ArrayList<Node> path) {
        ArrayList<Integer> predecessors = new ArrayList<>();
        ArrayList<Float> distances = new ArrayList<>();
        for (int setup = 0; setup < neighbors.size(); setup++) {
            predecessors.add(setup);
            distances.add(Float.MAX_VALUE);
        }
        getShortestPath(start.id, start.id, 0, predecessors, distances);
        for (int nodeId: getPath(start.id, end.id, predecessors)) {
            path.add(nodeSearch.get(nodeId)); // Adds nodes to path.
        } // Based on the total distance, the total time can be computed.
        return distances.get(end.id); // Returns total distance.
    }

    // Gives the shortest path given the previous and current id, total distance,
    // array list of predecessors, and a array list of distances.
    private void getShortestPath(int previousId, int currentId, float totalDistance,
            ArrayList<Integer> predecessors, ArrayList<Float> distances) {
        if (distances.get(currentId) > totalDistance) {
            distances.set(currentId, totalDistance);
            predecessors.set(currentId, previousId);
            for (Edge neighbor : neighbors.get(currentId)) {
                getShortestPath(currentId, neighbor.end.id, totalDistance +
                        neighbor.distance, predecessors, distances);
            }
        }
    }

    // Returns the optimal path given a start id, end id, and a given list of predecessors.
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
}