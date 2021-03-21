package com.uw.huskynavigation;

import java.util.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

/**
 * Azure Functions with HTTP Trigger.
 */
public class Password {
    /**
     * This function listens at endpoint "/api/Password". Two ways to invoke it using "curl" command in bash:
     * 1. curl -d "HTTP Body" {your host}/api/Password
     * 2. curl {your host}/api/Password?name=HTTP%20Query
     */
    @FunctionName("password")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req", methods = {HttpMethod.GET, HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");

        // Request gmail password.
        return request.createResponseBuilder(HttpStatus.OK).body(System.getenv("GMAIL_PASSWORD")).build();
    }
}
