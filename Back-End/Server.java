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
            ServerSocket serverSocket = new ServerSocket(52934);
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client @" + clientSocket.getPort() + " connected....");

            // Get input and output streams to talk to the client
            InputStream inputStream = clientSocket.getInputStream();
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader); 
            OutputStream out = clientSocket.getOutputStream();

            // Process Request (read request using in.readLine())
            String request = bufferedReader.readLine();
            System.out.println("Request was: ");
            System.out.println(request);

            // Prepare response (write response using )
            String response = "Here's a response!";

            System.out.println("Response was: " + response);
            
            // Close socket, breaking client connection. Close input/output streams.
            out.close();
            inputStream.close();
            clientSocket.close();
            System.out.println("Communication thread terminated.");
        }
        catch(IOException ex) {
            ex.printStackTrace();
        }
    }
}

// Example: http://www.java2s.com/Code/Java/Network-Protocol/AverysimpleWebserverWhenitreceivesaHTTPrequestitsendstherequestbackasthereply.htm
