package com.uw.huskynavigation;

import java.io.*;

// the Parser class accepts a File and creates a HashMap from each Node to its neighbor
// functionalities that have yet to be added: 
// - return an error if the file is in incorrect format (see format below)
// - construct GeoJSON

/* Format of Parsing File:

ID x y name
ID x y name
...
ID neighborID neighborID...
ID neighborID neighborID...
...

each of the x and y are Strings for latitude and longitude, [name] is the name, and d is an int
*/

import java.util.*;
public class Parser {
    private static Map<Node, Set<Edge>> map;
//  private Map<String, Node> names;
    private static Set<Node> busStops;
    private static Map<String, Node> names;
    private static Node[] nodes; //nodes[id] gives the Node
    private static Map<Integer, Node> ids;
//    public Parser() {
//        map = new HashMap<Node, HashSet<Edge>>();
//        names = new HashMap<String, Node>();
//        busStops = new HashSet<Node>();
//    }

    public static void createMap(BufferedReader reader) throws IOException {
        map = new HashMap<>();
        busStops = new HashSet<>();
        names = new HashMap<>();
        ids = new HashMap<>();
        int total = Integer.parseInt(reader.readLine());
        nodes = new Node[total];
        String str;
        for (int i = 1; i <= total; i++) {
            str = reader.readLine();
            StringTokenizer line = new StringTokenizer(str);
            int id = Integer.parseInt(line.nextToken()) - 1;
            float lat = Float.parseFloat(line.nextToken());
            float lon = Float.parseFloat(line.nextToken());
            String name = line.nextToken();
            Node node = new Node(id, lat, lon, name);
            names.put(name, node);
            ids.put(id, node);
            nodes[id] = node;
        }
        for (int i = 0; i < total; i++) {
            str = reader.readLine();
            StringTokenizer line = new StringTokenizer(str);
            Node current = ids.get(Integer.parseInt(line.nextToken()) - 1);
            HashSet<Edge> edges = new HashSet<>();
            while (line.hasMoreTokens()) {
                Node next = ids.get(Integer.parseInt(line.nextToken()) - 1);
                edges.add(new Edge(current, next));
                edges.add(new Edge(next, current));
            }
            map.put(current, edges);
        }
        reader.close();
    }

    public static void setStops(File input) throws FileNotFoundException {
        Scanner reader = new Scanner(input);
        String stops = reader.nextLine();
        StringTokenizer s = new StringTokenizer(stops);
        while (s.hasMoreTokens()) {
            busStops.add(names.get(s.nextToken()));
        }
        reader.close();
    }

    public static Map<Node, Set<Edge>> getMap() {
        return map;
    }

    public static Map<String, Node> getNames() {
        return names;
    }

    public static Set<Node> getStops() {
        return busStops;
    }
}
