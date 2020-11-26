import jdk.internal.org.objectweb.asm.tree.LocalVariableAnnotationNode;
import sun.reflect.annotation.TypeAnnotation.LocationInfo;

public class Decision {
    private int userSession;
    private Set<LocationNode> decision;

    public Decision(int userSession) {
        this.userSession = userSession;
    }

    public LocationNode decision(LocationNode a, LocationNode b) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    public Set<LocationNode> finalDecision(LocationNode a, LocationNode b) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    public String toString() {
        String finalString = "";
        if (decision != null) {
            for (LocationNode location : decision) {
                finalString += "-> [" + location + "]";
            }
        }
        return finalString;
    }
}