// the Parser class accepts a File and creates a HashMap from each Node to its neighbor
// functionalities that have yet to be added: 
// - return an error if the file is in incorrect format (see format below)
// - construct GeoJSON

// Format of Parsing File:
/*
x y [name] x y [name] d x y [name] d
x y [name] x y [name] d
x y [name] x y [name] d x y [name] d x y [name] d
*/
// each of the x and y are Strings for latitude and longitude, [name] is the name, and d is an int


import java.io.*;
import java.util.*;
public class Parser {
    private Map<Node, HashSet<Pair>> map;
//  private Map<String, Node> names;
    private Set<Node> busStops;
        
    public Parser() {
        map = new HashMap<Node, HashSet<Pair>>();
//      names = new HashMap<String, Node>();
        busStops = new HashSet<Node>();
    }

    public void createMap(File input) throws FileNotFoundException {
        int currentId = 0;
        HashMap<Location, Integer> ids = new HashMap<>();
        Scanner reader = new Scanner(input);
        while (reader.hasNextLine()) {
            StringTokenizer line = new StringTokenizer(reader.nextLine());
            Location keyLoc = new Location(Float.parseFloat(line.nextToken()), Float.parseFloat(line.nextToken()));
            if (!ids.containsKey(keyLoc)) {
                ids.put(keyLoc, currentId++);
            }
            Node key = new Node (ids.get(keyLoc), keyLoc.x, keyLoc.y, line.nextToken());
            map.put(key, new HashSet<Pair>());
            while (line.hasMoreTokens()) {
                Location temp = new Location(Float.parseFloat(line.nextToken()), Float.parseFloat(line.nextToken()));
                if (!ids.containsKey(temp)) {
                    ids.put(temp, currentId++);
                }
                Node end = new Node(ids.get(temp), temp.x, temp.y, line.nextToken());
                int d = Integer.parseInt(line.nextToken());
                map.get(key).add(new Pair(d, key, end));
                map.get(key).add(new Pair(d, end, key));
            }
        }
        reader.close();
    }

    public void setStops(File input) throws FileNotFoundException {
        Scanner reader = new Scanner(input);
        String stops = reader.nextLine();
        StringTokenizer s = new StringTokenizer(stops);
        while (s.hasMoreTokens()) {
            // will change from 0 to actual id
            busStops.add(new Node (0, Float.parseFloat(s.nextToken()),Float.parseFloat(s.nextToken())));
        }
        reader.close();
    }

    public Map<Node, HashSet<Pair>> getMap() {
        return map;
    }

    public Set<Node> getStops() {
        return busStops;
    }

    private class Location implements Comparable<Location> {
        private float x, y;

        private Location(float x, float y) {
            this.x = x;
            this.y = y;
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
