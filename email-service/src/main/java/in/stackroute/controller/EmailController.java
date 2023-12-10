package in.stackroute.controller;

import in.stackroute.model.EmailRequest;
import in.stackroute.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

//    @RequestMapping("/welcome")
//    public String welcome()
//    {
//        return "hello this is my email api";
//    }
    @RequestMapping(value = "/api/v1/email", method = RequestMethod.POST)
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request) {

        System.out.println(request);
//        return ResponseEntity.ok("done...");
        boolean result = this.emailService.sendEmail(request.getSubject(), request.getMessage(), request.getTo());
        if (result) {
            return ResponseEntity.ok("Email is sent successfully....");
        } else
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("email not sent");
        }

    }
}
