package com.springboot.socialhub_api.api.controller;


import com.springboot.socialhub_api.api.model.Followings;
import com.springboot.socialhub_api.api.model.User;
import com.springboot.socialhub_api.api.repositories.FollowingsRepository;
import com.springboot.socialhub_api.api.repositories.UserRepository;
import com.springboot.socialhub_api.api.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.nio.file.ProviderNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

import com.springboot.socialhub_api.api.dto.FollowingDTO;

@RestController
@RequestMapping("api/followings")
public class FollowingsController {

    private final FollowingsRepository repository;
    private final UserRepository user_repository;
    private final AuthService authService;

    public FollowingsController(FollowingsRepository repository,UserRepository user_repository,AuthService authService) {
        this.repository = repository;
        this.user_repository=user_repository;
        this.authService = authService;
    }

    private FollowingDTO convertToDTO(Followings following) {
        FollowingDTO dto = new FollowingDTO();
        dto.setId(following.getId());

        FollowingDTO.UserDTO userDTO = new FollowingDTO.UserDTO();
        userDTO.setId(following.getUser().getId());
        userDTO.setName(following.getUser().getName());
        userDTO.setEmail(following.getUser().getEmail());
        dto.setUser(userDTO);

        FollowingDTO.UserDTO followedDTO = new FollowingDTO.UserDTO();
        followedDTO.setId(following.getFollowed_user().getId());
        followedDTO.setName(following.getFollowed_user().getName());
        followedDTO.setEmail(following.getFollowed_user().getEmail());
        dto.setFollowed_user(followedDTO);

        return dto;
    }

    //get the following list for the user
    @GetMapping("/{user_id}")
    public List<FollowingDTO> select_all_followings(@RequestHeader("Authorization")String token,@PathVariable("user_id")int id){
        if(authService.isLoggedIn(token)){
            return repository.findByUserId(id)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        }else{
            return new ArrayList<>();
        }
    }

    //get the followers list for the user
    @GetMapping("/{user_id}/followers")
    public List<FollowingDTO> select_all_followers(@RequestHeader("Authorization")String token, @PathVariable("user_id")int id){
        if(authService.isLoggedIn(token)){
            return repository.findByFollowedUserId(id)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        }else{
            return new ArrayList<>();
        }
    }

    //following the another user
    @PostMapping("/{user_id}/{followed_user_id}")
    public ResponseEntity<?> follow_user(
            @RequestHeader("Authorization") String token,
            @PathVariable("user_id") int user_id,
            @PathVariable("followed_user_id") int followed_user_id) {
        
        if (!authService.isLoggedIn(token)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        try {
            // Check if users exist
            User user = user_repository.findById(user_id)
                .orElseThrow(() -> new NoSuchElementException("Following user not found"));
            User userToFollow = user_repository.findById(followed_user_id)
                .orElseThrow(() -> new NoSuchElementException("User to follow not found"));

            // Check if already following
            Optional<Followings> existingFollow = repository
                .findByUserIdAndFollowedUserId(user_id, followed_user_id);
            
            if (existingFollow.isPresent()) {
                return ResponseEntity.badRequest().body("Already following this user");
            }

            // Create new following relationship
            Followings followings = new Followings(user, userToFollow);
            Followings saved = repository.save(followings);
            return ResponseEntity.ok(convertToDTO(saved));

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating following relationship: " + e.getMessage());
        }
    }

    //unfollowing the another user
    @DeleteMapping("/{user_id}/{followed_user_id}")
    public ResponseEntity<Followings> unfollow_user(@RequestHeader("Authorization")String token,@PathVariable("user_id")int user_id,@PathVariable("followed_user_id")int followed_user_id){
        try{
            Optional<User> user_1 = user_repository.findById(user_id);
            Optional<User> user_2 = user_repository.findById(followed_user_id);
            Optional<Followings> following = repository.findByUserIdAndFollowedUserId(user_1.get().getId(),user_2.get().getId());
            repository.delete(following.get());
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}

//https://www.baeldung.com/spring-response-status-exception