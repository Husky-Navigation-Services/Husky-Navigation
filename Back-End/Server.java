import java.net.*;
import java.io.*;
import java.util.*;

public class Server {
    public Server(Parser parse, Set<Node> nodes) {
    
    }

    public static void main(String[] args) throws Exception {
        Parser.createMap(new File("[placeholder]"));
        Parser.setStops(new File("[placeholder]"));
        Decision decision = new Decision(Parser.getMap());
        start(decision);
    }

    public static void start(Decision decision) {
        try {
            // Prepare server + client socket connections
            System.out.println("Server On");
            ServerSocket serverSocket = new ServerSocket(35832);
            Socket clientSocket = serverSocket.accept();
            System.out.println("client connected");

            // Input
            InputStreamReader in = new InputStreamReader(clientSocket.getInputStream());
            BufferedReader bufferedReader = new BufferedReader(in); 
            // Output
             OutputStream outPut = clientSocket.getOutputStream();

            // Process Request (read request using in.readLine())
            System.out.println("Request Data: ");
            String data = bufferedReader.readLine();
            while (data != null) {
                System.out.println(data);
                ArrayList<Node> nodes = new ArrayList<>();
                outPut.write(processCommand(data, decision, nodes));
                outPut.write(convert(nodes).getBytes());
                data = bufferedReader.readLine();
            }
            
            System.out.println("Communication thread terminated.");
        }
        catch(IOException ex) {
            ex.printStackTrace();
        }
    }

    private static int processCommand(String command, Decision decision, ArrayList<Node> nodes) {
        StringTokenizer tokenizer = new StringTokenizer(command);
        if (tokenizer.nextToken().equals("PATHFIND")) {
            String start = tokenizer.nextToken();
            String end = tokenizer.nextToken();
            Map<String, Node> names = Parser.getNames();
            if (names.containsKey(start) && names.containsKey(end)) {
                return decision.getDecision(names.get(start), names.get(end), nodes);
            }
        }
        throw new IllegalArgumentException();
    }

    public static String convert (ArrayList<Node> nodes) {
        StringBuilder json = new StringBuilder("{" +
                "  \"type\": \"FeatureCollection\"," +
                "  \"features\": [" +
                "    {" +
                "      \"type\": \"Feature\"," +
                "      \"properties\": {}," +
                "      \"geometry\": {" +
                "        \"type\": \"LineString\"," +
                "        \"coordinates\": [");
        for (Node n: nodes) {
            json.append("[");
            json.append(n.latitude);
            json.append(",");
            json.append(n.longitude);
            json.append("],");
        }
        json.deleteCharAt(json.length() - 1);
        json.append("]}}]}");
        return json.toString();
    }
}

// Example: http://www.java2s.com/Code/Java/Network-Protocol/AverysimpleWebserverWhenitreceivesaHTTPrequestitsendstherequestbackasthereply.htm
