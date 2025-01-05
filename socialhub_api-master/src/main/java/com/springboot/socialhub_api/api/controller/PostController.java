package com.springboot.socialhub_api.api.controller;

import com.springboot.socialhub_api.api.config.FileUploadProperties;
import com.springboot.socialhub_api.api.model.User;
import com.springboot.socialhub_api.api.model.Comment;
import com.springboot.socialhub_api.api.model.Post;
import com.springboot.socialhub_api.api.repositories.PostRepository;
import com.springboot.socialhub_api.api.repositories.UserRepository;

import com.springboot.socialhub_api.api.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
import java.io.File;
import java.nio.file.Files;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/post")
public class PostController {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    private final AuthService authService;
    @Autowired
    private FileUploadProperties fileUploadProperties;

    public PostController(PostRepository postRepository, UserRepository userRepository,AuthService authService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    //get the post
    @GetMapping("/{post_id}")
    public ResponseEntity<?> select_post(@RequestHeader("Authorization") String token, @PathVariable("post_id") int id) {
        if (authService.isLoggedIn(token)) {
            Optional<Post> post = postRepository.findById(id);
            if (post.isPresent()) {
                return ResponseEntity.ok(post.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied"); // Return 403 Forbidden for unauthenticated requests
        }
    }


    //get all post for user's feed
    @GetMapping("/all/{user_id}")
    public ResponseEntity<?> all_posts(@RequestHeader("Authorization") String token, @PathVariable("user_id") int id) {
        if (authService.isLoggedIn(token)) {
            List<Post> posts = postRepository.findAllByUserId(id);
            return ResponseEntity.ok(posts);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }


    //create new post on user's feed
    @PostMapping("/create/{user_id}")
    public ResponseEntity<?> createPost(@RequestHeader("Authorization") String token, @PathVariable("user_id") int id, @RequestBody Post newPost) {
        if (authService.isLoggedIn(token)) {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID: " + id));
            newPost.setUser(user);
            Post savedPost = postRepository.save(newPost);
            return ResponseEntity.ok(savedPost);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }

    //upload image to post
    @PostMapping(path="/image",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@RequestHeader("Authorization")String token,@RequestParam("postId") int post_id ,@RequestParam("image") MultipartFile file) {
        if (authService.isLoggedIn(token)) {
            Optional<Post> post_query = postRepository.findById(post_id);
            if (post_query.isPresent()) {
                Post post = post_query.get();
                String filePath = fileUploadProperties.getPath();

                String originalFilename = file.getOriginalFilename();
                String fileExtension = StringUtils.getFilenameExtension(originalFilename);
                String randomFileName = UUID.randomUUID().toString() + "." + fileExtension;

                try {
                    file.transferTo(new File(filePath + randomFileName));
                    System.out.println(filePath + randomFileName);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }

                post.setImage(randomFileName);
                Post saved_post = postRepository.save(post);
                return ResponseEntity.status(HttpStatus.OK).body(saved_post);
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found in DB");
            }
        }return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized");
    }

    //get the post image
    @GetMapping(path="/image/{image}",produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<?> downloadImage(@PathVariable("image") String image_name){
        Optional<Post> post_query = postRepository.findByImageName(image_name);
        String location = fileUploadProperties.getPath();
        if(post_query.isPresent()){
            String file_path = location+post_query.get().getImage();
            try{
                byte[] image = Files.readAllBytes(new File(file_path).toPath());
                //return image;
                return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/jpg")).body(image);
            }catch(Exception e) {
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Image reading error");
            }
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error fetching image resource");
        }
    }

    //update the post
    @PutMapping
    public ResponseEntity<?> update(@RequestHeader("Authorization")String token,@RequestBody Post updatePost) {
        if (authService.isLoggedIn(token)) {
            Optional<Post> postFromDatabase = postRepository.findById(updatePost.getId());
            if (postFromDatabase.isPresent()) {

                int currentUserId = authService.getUserIdFromToken(token);

                // Check if current user is the owner
                if (postFromDatabase.get().getUser().getId() != currentUserId) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not the owner of this post");
                }

                String description = updatePost.getDescription();
                String image = updatePost.getImage();
                Date creation_date = updatePost.getCreation_date();

                if (description != null) {
                    postFromDatabase.get().setDescription(description);
                }
                if (image != null) {
                    postFromDatabase.get().setImage(image);
                }
                if (creation_date != null) {
                    postFromDatabase.get().setCreation_date(creation_date);
                }

                return ResponseEntity.ok(postRepository.save(postFromDatabase.get()));
            } else {
                return ResponseEntity.notFound().build();
            }
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }

    //delete the post
    @DeleteMapping("/{post_id}")
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token, @PathVariable("post_id") int id) {
        if (authService.isLoggedIn(token)) {
            Optional<Post> postFromDatabase = postRepository.findById(id);
            if (postFromDatabase.isPresent()) {
            int currentUserId = authService.getUserIdFromToken(token);

                // Check if current user is the owner
                if (postFromDatabase.get().getUser().getId() != currentUserId) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not the owner of this post");
                }
                
            postRepository.deleteById(id);
            return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }
}

