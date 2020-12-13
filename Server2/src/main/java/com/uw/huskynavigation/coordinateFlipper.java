package com.uw.huskynavigation;

import java.io.*;
import java.util.*;

public class coordinateFlipper {
    public static void main(String[] args) throws FileNotFoundException{
        File nodes = new File("./Back-End/nodes.txt");
        File reversedNodes = new File("reversedNodes.txt");
        reverseCoordinates(new Scanner(nodes), new PrintStream(reversedNodes));
    }

    private static void reverseCoordinates(Scanner input, PrintStream output) {
        if (!input.hasNext()) {
            return;
        }
        String first = input.next();
        String second = input.next();
        String name = input.next();
        output.print(second + " " + first + " " + name + " ");
        reverseCoordinates(input, output);
    }
}
