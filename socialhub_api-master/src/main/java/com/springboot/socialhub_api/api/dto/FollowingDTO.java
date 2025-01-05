package com.springboot.socialhub_api.api.dto;

import lombok.Data;

@Data
public class FollowingDTO {
    private int id;
    private UserDTO user;
    private UserDTO followed_user;

    @Data
    public static class UserDTO {
        private int id;
        private String name;
        private String email;
    }
}
