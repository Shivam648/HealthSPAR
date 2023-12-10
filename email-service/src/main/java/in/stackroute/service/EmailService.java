package in.stackroute.service;

import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {
    public boolean sendEmail(String subject, String message,String to)
    {
        boolean success = false;
        String from="roopeshrokade4@gmail.com";
        String host="smtp.gmail.com";
        Properties properties = System.getProperties();
        System.out.println("PROPERTIES" +properties);
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        Session session=Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication(){
                return new PasswordAuthentication("roopeshrokade4@gmail.com","bjqk ercx vkto wchg");
            }
        });
        session.setDebug(true);
        MimeMessage m = new MimeMessage(session);
        try{
            m.setFrom(from);
            m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            m.setSubject(subject);
            m.setText(message);
            Transport.send(m);
            System.out.println("sent success........");
            success = true;

        }catch (Exception e){
            e.printStackTrace();
        }
        return success;



    }
}
