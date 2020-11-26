// the Parser class accepts a File and creates a HashMap from each Node to its neighbor
// functionalities that have yet to be added: 
// - return an error if the file is in incorrect format (see format below)
// - construct GeoJSON

// Format of File:
/*
x y x y x y
x y x y
x y x y x y x y
*/
// each of the lines must contain an even (>=2) number of integers
// where the first 2 are the key Node and the rest are its neighbors


import java.io.*;
import java.util.*;
public class Parser {
    private Map<Node> nodes;
        
    public Parser(File input) {
        nodes = parse(input); // Could be a tree set as well.
        // nah HashMap should be fine (see below), no point in sorting the nodes - albert
    }
    
    public Map<Node, Set<Node>> parse() { // given a map area, returns a set of nodes
        // or some other similar data structure.
        // why set? I though we were using a HashMap to point from a Node to all its neighbors - albert
        return nodes;
    }

    private Map<Node, Set<Node>> parse(File input) {
        HashMap<Node, HashSet<Node>> map = new HashMap<>();
        Scanner reader = new Scanner(input);
        while (reader.hasNextLine()) {
            StringTokenizer line = StringTokenizer(reader.nextLine());
            Node key = new Node(Integer.parseInt(line.nextToken),Integer.parseInt(line.nextToken));
            map.put(key, new HashSet<String>());
            while (line.hasMoreTokens()) {
                map.get(key).add(new Node(Integer.parseInt(line.nextToken),Integer.parseInt(line.nextToken)));
            }
        }
        return map;
    }
}
