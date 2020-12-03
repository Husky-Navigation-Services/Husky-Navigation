import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Server2 {

    public static void main(String[] args) throws Exception {
        System.out.println("ff");
        HttpServer server = HttpServer.create(new InetSocketAddress("192.168.1.128", 8500), 0);
        server.createContext("/test", new MyHandler());
        server.setExecutor(null); // creates a default executor
        server.start();
    }

    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", allowedOrigin); 
    ttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET,POST");

    static class MyHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            System.out.println(t.toString());
            String response = "Here's some cake.";
            t.sendResponseHeaders(200, response.length());
            // -- CORS support
            t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            if (t.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                t.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
                t.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
                t.sendResponseHeaders(204, -1);
                return;
            }
            // --
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

}