package com.uw.huskynavigation;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;

import java.io.*;
import java.util.*;

/**
 * Azure Functions with HTTP Trigger.
 */
public class Function {
    /**
     * This function listens at endpoint "/api/HttpExample". Two ways to invoke it using "curl" command in bash:
     * 1. curl -d "HTTP Body" {your host}/api/HttpExample
     * 2. curl "{your host}/api/HttpExample?name=HTTP%20Query"
     */
    private Map<Node, Set<Edge>> map;
    private Decision decision;
     
    // Parses through a list of nodes in order to create a map and creates an
    // instance of a decision. Throws both file not found and IOE exceptions.
    // [Get List of Nodes] --> [Instantiate parser] --> [Instantiate decision]
    public Function() throws FileNotFoundException, java.io.IOException {
        InputStream in = getClass().getResourceAsStream("/nodes6.txt");
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        Parser.createMap(reader);
        this.map = Parser.getMap();
        this.decision = new Decision(map);
    }

    @FunctionName("pathfind")
    public HttpResponseMessage run(
            @HttpTrigger(
                name = "req",
                methods = {HttpMethod.GET, HttpMethod.POST},
                authLevel = AuthorizationLevel.ANONYMOUS)
                HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");

        // - Parse query parameter
        final String start = request.getQueryParameters().get("start"); // e.g., "BagleyHall"
        final String end = request.getQueryParameters().get("end"); // e.g., "GuggenheimHall"

        // - Map start and end to node.
        Map<String, Node> names = Parser.getNames();
        if (!names.containsKey(start) || !names.containsKey(end)) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST).body("Please pass valid endpoints").build();
        }
        // - Call find path in decision module.
        ArrayList<Node> decisionPath = new ArrayList<Node>();
        float decisionDistance = decision.getDecision(names.get(start), names.get(end), decisionPath);
        decisionDistance *= 69.096;
        double eta = decisionDistance / 0.05223; // Where distance is in miles, time is
        // in minutes. Average walking speed is 4.6 ft/sec or 276 ft/min.
        // - Package data.
        String decisionPathJSON = convertPathToJSON(decisionPath);
        String data = convertAllDataToJSON(decisionDistance, eta, decisionPathJSON);
        // String testdata = "{\"someData\": \"someinfo\"}";
        // - Return HTTP request.
        return request.createResponseBuilder(HttpStatus.OK).body(data).build();
    }

    // Returns the decision path in a JSON format given a list of nodes.
    public static String convertPathToJSON(ArrayList<Node> nodes) {
        StringBuilder json = new StringBuilder("{" +
                "  \"type\": \"FeatureCollection\"," +
                "  \"features\": [" +
                "    {" +
                "      \"type\": \"Feature\"," +
                "      \"properties\": {}," +
                "      \"geometry\": {" +
                "        \"type\": \"LineString\"," +
                "        \"coordinates\": [");
        for (Node n : nodes) {
            json.append("[");
            json.append(n.longitude);
            json.append(",");
            json.append(n.latitude);
            json.append("],");
        }
        json.deleteCharAt(json.length() - 1);
        json.append("]}}]}");
        return json.toString();
    }

    // Returns results in JSON format givinf the decision path, distance, and ETA.
    public static String convertAllDataToJSON(float decisionDistance, double ETA, String pathJSON) {
        StringBuilder json = new StringBuilder("{" +
                "  \"distance\": \"");
        json.append(decisionDistance);
        json.append("\", \"eta\": \"");
        json.append(ETA);
        json.append("\", \"pathGeoJSON\": ");
        json.append(pathJSON);
        json.append("}");
        return json.toString();
    }
}