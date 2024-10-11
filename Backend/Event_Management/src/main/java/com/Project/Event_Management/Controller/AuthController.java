package com.Project.Event_Management.Controller;

import com.Project.Event_Management.DTO.EmailRequest;
import com.Project.Event_Management.DTO.ResetPasswordRequest;
import com.Project.Event_Management.DTO.VerifyOtpRequest;
import com.Project.Event_Management.Entities.AuthenticationResponse;
import com.Project.Event_Management.Entities.User;
import com.Project.Event_Management.Repository.UserRepository;
import com.Project.Event_Management.Service.AuthenticationService;
import com.Project.Event_Management.Service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtService jwtService;


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
    public ResponseEntity<AuthenticationResponse> verifyOtp(@RequestBody VerifyOtpRequest request) {
        boolean isValid = authenticationService.verifyOtp(request.getEmail(), request.getOtp());
        if (isValid) {
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
            String resetToken = jwtService.generatePasswordResetToken(user);  // Generate password reset token
            return ResponseEntity.ok(new AuthenticationResponse(resetToken)); // Return the reset token
        } else {
            return ResponseEntity.status(400).build();
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequest request,@RequestHeader("Authorization") String token) {
        if (jwtService.isPasswordResetTokenValid(token.substring(7))) {
            authenticationService.resetPassword(request.getEmail(), request.getNewPassword());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).build();
        }
    }


}
