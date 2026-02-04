package com.hamedbk.helpdesk.user.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    
    private String token;
    private String username;
    private String role;
    
}