// the Parser class accepts a File and creates a HashMap from each Node to its neighbor
// functionalities that have yet to be added: 
// - return an error if the file is in incorrect format (see format below)
// - construct GeoJSON

// Format of Parsing File:
/*
x y x y x y
x y x y
x y x y x y x y
*/
// each of the lines must contain an even (>=2) number of integers
// where the first 2 are the key Node and the rest are its neighbors

// Format of Names File:
/*
[name]
x y
[name]
x y
*/


import java.io.*;
import java.util.*;
public class Parser {
    private Map<Node, HashSet<Node>> map;
    private Map<String, Node> names;
    private Set<Node> busStops;
        
    public Parser() {
        map = new HashMap<Node, HashSet<Node>>();
        names = new HashMap<String, Node>();
        busStops = new HashSet<Node>();
    }

    public void createMap(File input) throws FileNotFoundException {
        Scanner reader = new Scanner(input);
        while (reader.hasNextLine()) {
            StringTokenizer line = new StringTokenizer(reader.nextLine());
            Node key = new Node(Integer.parseInt(line.nextToken()),Integer.parseInt(line.nextToken()));
            map.put(key, new HashSet<String>());
            while (line.hasMoreTokens()) {
                map.get(key).add(new Node(Integer.parseInt(line.nextToken()),Integer.parseInt(line.nextToken())));
            }
        }
        reader.close();
    }

    public void setNames(File input) throws FileNotFoundException {
        Scanner reader = new Scanner(input);
        while (reader.hasNextLine()) {
            String name = reader.nextLine();
            StringTokenizer locationReader = new StringTokenizer(reader.nextLine());
            Node location = new Node (Integer.parseInt(locationReader.nextToken()),Integer.parseInt(locationReader.nextToken()));
            names.put(name, location);
        }
        reader.close();
    }

    public void setStops(File input) throws FileNotFoundException {
        Scanner reader = new Scanner(input);
        String stops = reader.nextLine();
        StringTokenizer s = new StringTokenizer(stops);
        while (s.hasMoreTokens()) {
            busStops.add(new Node (Integer.parseInt(s.nextToken()),Integer.parseInt(s.nextToken())));
        }
        reader.close();
    }

    public Map<Node, Set<Node>> getMap() {
        return map;
    }

    public Map<String, Node> getNames() {
        return names;
    }

    public Set<Node> getStops() {
        return busStops;
    }
}
