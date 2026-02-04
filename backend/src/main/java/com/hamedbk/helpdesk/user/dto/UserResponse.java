package com.hamedbk.helpdesk.user.dto;

import com.hamedbk.helpdesk.user.Role;

public record UserResponse(
        String username,
        String email,
        Role role
) {
}
