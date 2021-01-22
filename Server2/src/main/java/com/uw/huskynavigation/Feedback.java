package com.uw.huskynavigation;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;
import javax.mail.Session;
import javax.mail.Transport;
import java.time.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

/**
 * Azure Functions with HTTP Trigger.
 */
public class Feedback {
    /**
     * This function listens at endpoint "/api/Feedback". Two ways to invoke it using "curl" command in bash:
     * 1. curl -d "HTTP Body" {your host}/api/Feedback
     * 2. curl {your host}/api/Feedback?name=HTTP%20Query
     */
    @FunctionName("feedback")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req", methods = {HttpMethod.GET, HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");

        // Parse and setup feedback message.
        String feedback = request.getBody().orElse("");

        // Send email to process feedback.
        Properties properties = System.getProperties();
        properties.setProperty("mail.smtp.host", "smtp.gmail.com");
        try {
            MimeMessage message = new MimeMessage(Session.getDefaultInstance(properties));
            message.setFrom(new InternetAddress("huskynavigationfeedback@gmail.com"));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress("huskynavigationfeedback@gmail.com"));
            message.setSubject("Feedback Form Response [" + LocalDate.now().toString() + "]");
            message.setText(feedback);
            Transport.send(message);
            System.out.println("Mail successfully sent!");
        }
        catch (MessagingException messageError) {
            messageError.printStackTrace();
        }
        
        // Return confirmation that feedback has been sent.
        return request.createResponseBuilder(HttpStatus.OK).body("Feedback sent! " + feedback).build();
    }
}