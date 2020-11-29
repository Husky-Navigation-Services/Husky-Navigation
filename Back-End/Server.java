import java.net.*;
import java.io.*;
import java.util.*;

public class Server {
    public Server(Parser parse, Set<Node> nodes) {
    
    }

    public static void main(String[] args) throws Exception {
        start();
    }

    public static void start() throws IOException {
        try {
            // Prepare server + client socket connections
            System.out.println("Server On");
            ServerSocket serverSocket = new ServerSocket(35832);
            Socket clientSocket = serverSocket.accept();
            System.out.println("client connected");

            // Input
            InputStreamReader in = new InputStreamReader(clientSocket.getInputStream());
            BufferedReader bufferedReader = new BufferedReader(in); 
            // Output
            // OutputStream out = clientSocket.getOutputStream();

            // Process Request (read request using in.readLine())
            System.out.println("Request Data: ");
            String data = bufferedReader.readLine();
            while (data != null) {
                System.out.println(data);
                data = bufferedReader.readLine();
            }
            
            System.out.println("Communication thread terminated.");
        }
        catch(IOException ex) {
            ex.printStackTrace();
        }
    }
}

// Example: http://www.java2s.com/Code/Java/Network-Protocol/AverysimpleWebserverWhenitreceivesaHTTPrequestitsendstherequestbackasthereply.htm
