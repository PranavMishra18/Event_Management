package com.Project.Event_Management.Service;

import com.Project.Event_Management.Entities.User;
import com.Project.Event_Management.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User getUserById(Long id){

        return userRepository.findById(id).get();

    }

    public List<User> getUsers(){

        return userRepository.findAll();

    }



}
