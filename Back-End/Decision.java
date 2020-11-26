import jdk.internal.org.objectweb.asm.tree.LocalVariableAnnotationNode;
import sun.reflect.annotation.TypeAnnotation.LocationInfo;

public class Decision {
    private int userSession;
    private Set<Node> decision;

    public Decision(int userSession) {
        this.userSession = userSession;
    }

    public Node decision(Node a, Node b) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    public Set<Node> finalDecision(Node a, Node b) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    public int getUserSession() {
        return userSession;
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