package com.hamedbk.helpdesk.user;

import com.hamedbk.helpdesk.user.dto.UserMapper;
import com.hamedbk.helpdesk.user.dto.UserResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPPORT')")
    public ResponseEntity<List<UserResponse>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers()
                                    .stream()
                                    .map(userMapper::toResponse)
                                    .toList());
    }

    @GetMapping("/support")
    @PreAuthorize("hasAnyRole('USER','SUPPORT')")
    public ResponseEntity<List<UserResponse>> getSupportUsers() {
        return ResponseEntity.ok(userService.getAllUsersByRole("SUPPORT")
                .stream()
                .map(userMapper::toResponse)
                .toList());
    }

    @GetMapping("/self")
    @PreAuthorize("hasAnyRole('USER','SUPPORT')")
    public ResponseEntity<UserResponse> getUserSelf(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());

        return ResponseEntity.ok(userMapper.toResponse(user));
    }


}