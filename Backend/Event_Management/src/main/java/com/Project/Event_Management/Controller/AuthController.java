package com.Project.Event_Management.Controller;

import com.Project.Event_Management.DTO.EmailRequest;
import com.Project.Event_Management.DTO.ResetPasswordRequest;
import com.Project.Event_Management.DTO.VerifyOtpRequest;
import com.Project.Event_Management.Entities.AuthenticationResponse;
import com.Project.Event_Management.Entities.User;
import com.Project.Event_Management.Service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User request){

        return ResponseEntity.ok(authenticationService.register(request));

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request){

        return ResponseEntity.ok(authenticationService.authenticate(request));

    }


    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody EmailRequest emailRequest) {
        String email = emailRequest.getEmail();
        authenticationService.sendOtp(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Void> verifyOtp(@RequestBody VerifyOtpRequest request) {
        boolean isValid = authenticationService.verifyOtp(request.getEmail(), request.getOtp());
        if (isValid) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(400).build();
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequest request) {
        authenticationService.resetPassword(request.getEmail(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }


}
