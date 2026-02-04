package com.hamedbk.helpdesk.user.dto;

import com.hamedbk.helpdesk.user.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }
}
