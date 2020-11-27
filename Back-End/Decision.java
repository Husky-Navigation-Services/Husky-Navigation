import java.util.*;

public class Decision {
    private List<Node> decision;

    public Decision(Map<Node, Set<Pair>> paths) {
        for (Node start : paths.keySet()) {
            Set<Pair> nearbyPaths = paths.get(start);
        }
        while (decision != null) {

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