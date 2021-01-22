        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
               return new PasswordAuthentication("huskynavigationfeedback", System.getenv("GMAIL_PASSWORD"));
            }
        });
        context.getLogger().info("Entering email stage.");
        try {
