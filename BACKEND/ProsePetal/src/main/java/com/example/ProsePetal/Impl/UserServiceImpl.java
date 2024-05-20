package com.example.ProsePetal.Impl;

import com.example.ProsePetal.Payloads.UserDTO;
import com.example.ProsePetal.Repositories.UserRepo;
import com.example.ProsePetal.Services.UserService;
import com.example.ProsePetal.Entity.User;
import com.example.ProsePetal.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepo userRepo;

    @Autowired
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDTO getProfileDetails(Integer userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return mapToDTO(user);
    }

    private UserDTO mapToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setAbout(user.getAbout());
        return userDTO;
    }

    @Override
    public void deleteUser(Integer userId) throws Exception {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        userRepo.delete(user);
    }
    @Override
    public UserDTO updateUser(Integer userId, UserDTO userDTO) throws Exception {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (userDTO.getName() != null) {
            user.setName(userDTO.getName());
        }
        if (userDTO.getEmail() != null) {
            user.setEmail(userDTO.getEmail());
        }
        if (userDTO.getAbout() != null) {
            user.setAbout(userDTO.getAbout());
        }

        User updatedUser = userRepo.save(user);
        return mapToDTO(updatedUser);
    }
}
