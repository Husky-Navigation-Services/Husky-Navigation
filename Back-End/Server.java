import java.net.*;
import java.io.*;
import java.util.*;

public class Server {
    public Server(Parser parse, Set<Node> nodes) {
    
    }

    public static void main(String[] args) throws Exception {
        start();
    }

    public static void start() {
        new Thread(() -> {
            try {
                ServerSocket server = new ServerSocket(8080);
                Socket socket = server.accept();
                DataInputStream in = new DataInputStream(socket.getInputStream());
                DataOutputStream out = new DataOutputStream(socket.getOutputStream());
                while (true) {
                    String command = in.readUTF();
                    if (command.equals("hi"));
                    out.write(5);
                }
            }
            catch(IOException ex) {
                ex.printStackTrace();
            }
        }).start();
    }
}
