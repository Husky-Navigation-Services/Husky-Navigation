import java.util.*;
import java.io.*;
import java.net.*;
import java.nio.file.*;

import com.sun.net.httpserver.*;

public class Server {
    // Port number used to connect to this server
    private static final int PORT = Integer.parseInt(System.getenv().getOrDefault("PORT", "8000"));

    public static void main(String[] args) throws FileNotFoundException, IOException {
        // Prepare Parser/Decision Module
        Parser.createMap(new File("[placeholder]"));
        Parser.setStops(new File("[placeholder]"));
        Decision decision = new Decision(Parser.getMap());
        // Initialize HTTP server with socket on localhost:8000
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 100);
        // Define endpoints for GET requests from client + the callback function for it (via lambda functions, which behave like normal methods but without names)
        server.createContext("/", (HttpExchange t) -> {
            // When transferring JSON in the third parameter, replace "text/plain" with "application/json"
            send(t, "text/plain; charset=utf-8", "Default Response: Make sure to specify the GET request with /[someKeyword]");
        });
        // Define endpoints for GET requests from client + the callback function for it (via lambda functions, which behave like normal methods but without names)
        // Request of form : "localhost:8000/pathfind?start=BagleyHall&end=GuggenheimHall"
        server.createContext("/pathfind", (HttpExchange t) -> {
            // Use the code
            //      String s = parse("s", t.getRequestURI().getQuery().split("&"));
            // to parse the query string of the GET request URL, which looks like data1=value1&data2=value2&data3/value3

            // Get endpoints
            String start = parse("start", t.getRequestURI().getQuery().split("&")); // e.g., "BagleyHall"
            String end = parse("start", t.getRequestURI().getQuery().split("&")); // e.g., "GuggenheimHall"
            // Prepare Parser Data
            Map<String, Node> names = Parser.getNames();
            if (names.containsKey(start) && names.containsKey(end)) {
                //return decision.getDecision(names.get(start), names.get(end), nodes);
            }

            // When transferring JSON in the third parameter, replace "text/plain" with "application/json"
            send(t, "text/plain; charset=utf-8", "Here's a response for /query context");
        });
        server.setExecutor(null);
        server.start();
    }

    // Returns the value corresponding to the given key in query string, which is given as an array split up at each "&" character. 
    private static String parse(String key, String... params) {
        for (String param : params) {
            String[] pair = param.split("=");
            if (pair.length == 2 && pair[0].equals(key)) {
                return pair[1];
            }
        }
        return "";
    }

    // Sends the given data of the given content type over the HttpExchange object representing the current request-response interaction.
    private static void send(HttpExchange t, String contentType, String data)
            throws IOException, UnsupportedEncodingException {
        // CORS Support
        t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        t.getResponseHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        t.getResponseHeaders().add("Access-Control-Allow-Headers", "*");
        t.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
        t.getResponseHeaders().add("Access-Control-Allow-Credentials-Header", "*");
        t.getResponseHeaders().set("Content-Type", contentType);
        byte[] response = data.getBytes("UTF-8");
        t.sendResponseHeaders(200, response.length);
        try (OutputStream os = t.getResponseBody()) {
            os.write(response);
        }
    }

    private static int processCommand(String command, Decision decision, ArrayList<Node> nodes) {
        StringTokenizer tokenizer = new StringTokenizer(command);
        if (tokenizer.nextToken().equals("PATHFIND")) {

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