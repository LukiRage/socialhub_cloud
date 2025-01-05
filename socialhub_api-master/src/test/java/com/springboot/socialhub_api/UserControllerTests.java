package com.springboot.socialhub_api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.socialhub_api.api.config.FileUploadProperties;
import com.springboot.socialhub_api.api.controller.UserController;
import com.springboot.socialhub_api.api.model.User;
import com.springboot.socialhub_api.api.repositories.UserRepository;
import com.springboot.socialhub_api.api.service.AuthService;
import org.apache.commons.codec.digest.DigestUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(UserController.class)
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private AuthService authService;

    @MockBean
    private FileUploadProperties fileUploadProperties;

    private ObjectMapper objectMapper = new ObjectMapper();
    private User testUser;

    @BeforeEach
    public void setUp() {
        testUser = new User(
            "Jan",
            "Kowalski",
            "jan@mail.com",
            DigestUtils.sha256Hex("kowalski"),
            "profile1.jpg",
            "test account",
            true,
            new Date()
        );
        
        // Common mock behavior
        Mockito.when(authService.isLoggedIn(Mockito.anyString())).thenReturn(true);
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.of(testUser));
    }

    @Test
    public void getAllUsersTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/all")
                .header("Authorization", "auth_token")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    public void getSpecificUserTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/1")
                .header("Authorization", "auth_token")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void createNewUserTest() throws Exception {
        String newUserJson = objectMapper.writeValueAsString(testUser);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                .header("Authorization", "auth_token")
                .content(newUserJson)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void uploadPictureTest() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
            "profile_picture",
            "test-image.jpg",
            "image/jpeg",
            "image content".getBytes()
        );

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/user/picture")
                .file(file)
                .header("Authorization", "auth_token")
                .param("userId", "1"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testUpdate() throws Exception {
        User updateUser = new User();
        updateUser.setId(1);
        updateUser.setName("Test");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user")
                .header("Authorization", "auth_token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateUser)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/user/1")
                .header("Authorization", "auth_token")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}

