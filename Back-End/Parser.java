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
        HashSet<Node> seen = new HashSet<>();
        Scanner reader = new Scanner(input);
        while (reader.hasNextLine()) {
// Make sure that for the associated set of paths the pathways go "two-ways" what I mean by that is for
// the decision module it is pretty critical that all nodes that have a connected pathway in one set
// have a connected pathway in the other nodes such that for a node n1 and n2 in the associate value in
// the map for n1 is a set that contains p1 a pair constructed by (4, n1, n2) and for n2 with path p2
// a pair constructed by the opposite (4, n2, n1).
            StringTokenizer line = new StringTokenizer(reader.nextLine());
// Only thing left to add here is the sequential id
            Node key = new Node(line.nextToken(), line.nextToken(), line.nextToken());
            map.put(key, new HashSet<Pair>());
            while (line.hasMoreTokens()) {
                Node end = new Node(line.nextToken(), line.nextToken(), line.nextToken());
                map.get(key).add(new Pair(Integer.parseInt(line.nextToken()), key, end));
            }
        }
        reader.close();
    }

    public void setStops(File input) throws FileNotFoundException {
        Scanner reader = new Scanner(input);
        String stops = reader.nextLine();
        StringTokenizer s = new StringTokenizer(stops);
        while (s.hasMoreTokens()) {
            busStops.add(new Node (s.nextToken(),s.nextToken()));
        }
        reader.close();
    }

    public Map<Node, HashSet<Pair>> getMap() {
        return map;
    }

    public Set<Node> getStops() {
        return busStops;
    }
}
