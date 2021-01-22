package com.uw.huskynavigation;

import java.util.*;
import java.time.*;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

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

        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        context.getLogger().info("Authenticating");
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
               return new PasswordAuthentication("huskynavigationfeedback", System.getenv("GMAIL_PASSWORD"));
            }
        });
        context.getLogger().info("Entering email stage.");
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("huskynavigationfeedback@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                InternetAddress.parse("huskynavigationfeedback@gmail.com"));
            message.setSubject("Feedback Form Response [" + LocalDate.now().toString() + "]");
            message.setText(feedback);
            Transport.send(message);
            context.getLogger().info("Message sent");
            return request.createResponseBuilder(HttpStatus.OK).body("Feedback successfully sent! " + feedback).build();
        } finally {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST).body("Feedback failed to send!").build();
        }
    }
}