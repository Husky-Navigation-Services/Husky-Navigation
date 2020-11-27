import java.net.*;
import java.io.*;
import java.util.*;
import java.lang.*;

public class Server {
    public Server(Parser parse, Set<Node> nodes) {
    
    }

    public static void main(String[] args) throws Exception {
        start();
    }

    public void start() {
        new Thread(() -> {
            try {
                ServerSocket server = new ServerSocket(8080);
                Socket socket = server.accept();
                in = new DateInputStream(socket.getInputStream());
                out = new DateOutputStream(socket.getOutputStream());
                while (true) {
                    String command = in.readUTF();
                    // call a back-end method to process the command
                    // output something
                }
            }
            catch(IOException ex) {
                ex.printStackTrace();
            }
        }).start();
    }
}
