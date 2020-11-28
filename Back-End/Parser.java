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
        Scanner reader = new Scanner(input);
        while (reader.hasNextLine()) {
            StringTokenizer line = new StringTokenizer(reader.nextLine());
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
