package com.Project.Event_Management.Service;

import com.Project.Event_Management.Entities.AuthenticationResponse;
import com.Project.Event_Management.Entities.User;
import com.Project.Event_Management.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthenticationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    @Autowired
    EmailSenderService emailSenderService;

    @Autowired
    AuthenticationManager authenticationManager;

    private final ConcurrentHashMap<String, String> otpStore = new ConcurrentHashMap<>();

    public AuthenticationResponse register(User request){
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(savedUser);

        return new AuthenticationResponse(token);


    }

    public AuthenticationResponse authenticate(User request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail()).get();

        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    public void sendOtp(String email) {

        String otp = String.valueOf(10000 + new Random().nextInt(90000));

        otpStore.put(email, otp);

        // Send OTP to user's email
        String emailBody = String.format(
                "Hello %s,\n\n" +
                        "A password reset request was sent for your account. " +
                        "If you did not make this request, please ignore this email.\n\n" +
                        "OTP code for resetting your password is: %s\n\n" +
                        "Please enter this code in the application to proceed with the password reset.\n\n" +
                        "If you have any questions or need further assistance, feel free to contact our support team.\n\n" +
                        "Thank you,\n" +
                        "The Event Management Team",
                email, otp
        );

        emailSenderService.sendEmail(email, "Password Reset Request", emailBody);
    }




    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otpStore.get(email);
        return storedOtp != null && storedOtp.equals(otp);
    }

    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        otpStore.remove(email);
    }



}
