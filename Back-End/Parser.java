// the Parser class accepts a File and creates a HashMap from each Node to its neighbor
// functionalities that have yet to be added: 
// - return an error if the file is in incorrect format (see format below)
// - construct GeoJSON

// Format of Parsing File:
/*
x y [name] x y [name] x y [name]
x y [name] x y [name]
x y [name] x y [name] x y [name] x y [name]
*/
// each of the x and y are Strings for latitude and longitude, [name] is the name, and d is an int


import java.io.*;
import java.util.*;
public class Parser {
    private static Map<Node, Set<Edge>> map;
//  private Map<String, Node> names;
    private static Set<Node> busStops;
    private static Map<String, Node> names;
        
//    public Parser() {
//        map = new HashMap<Node, HashSet<Edge>>();
//        names = new HashMap<String, Node>();
//        busStops = new HashSet<Node>();
//    }

    public static void createMap(File input) throws FileNotFoundException {
        map = new HashMap<>();
        busStops = new HashSet<>();
        names = new HashMap<>();
        int currentId = 0;
        HashMap<Location, Integer> ids = new HashMap<>();
        Scanner reader = new Scanner(input);
        while (reader.hasNextLine()) {
            StringTokenizer line = new StringTokenizer(reader.nextLine());
            Location keyLoc = new Location(Float.parseFloat(line.nextToken()), Float.parseFloat(line.nextToken()));
            if (!ids.containsKey(keyLoc)) {
                ids.put(keyLoc, currentId++);
            }
            Node key = new Node(ids.get(keyLoc), keyLoc.x, keyLoc.y, line.nextToken());
            map.put(key, new HashSet<>());
            while (line.hasMoreTokens()) {
                Location temp = new Location(Float.parseFloat(line.nextToken()), Float.parseFloat(line.nextToken()));
                if (!ids.containsKey(temp)) {
                    ids.put(temp, currentId++);
                }
                String name = line.nextToken();
                Node end;
                if (name.equals("null")) {
                     end = new Node(ids.get(temp), temp.x, temp.y, null);
                } else {
                    end = new Node(ids.get(temp), temp.x, temp.y, name);
                    names.put(name, end);
                    System.out.println("name " + name);
                }
                float d = temp.getDist(keyLoc);
                map.get(key).add(new Edge(d, key, end));
                map.get(key).add(new Edge(d, end, key));
            }
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

    private static class Location implements Comparable<Location> {
        private float x, y;

        private Location(float x, float y) {
            this.x = x;
            this.y = y;
        }

        public float getDist(Location other) {
            return (float) Math.sqrt((x-other.x)*(x-other.x)+(y-other.y)*(y-other.y));
        }

        @Override
        public int compareTo(Parser.Location o) {
            if (x == o.x && y == o.y) {
                return 0;
            }
            return 1;
        }
    }
}
