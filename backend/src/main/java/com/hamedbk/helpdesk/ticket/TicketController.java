package com.hamedbk.helpdesk.ticket;

import com.hamedbk.helpdesk.ticket.dto.TicketMapper;
import com.hamedbk.helpdesk.ticket.dto.TicketRequest;
import com.hamedbk.helpdesk.ticket.dto.TicketResponse;
import com.hamedbk.helpdesk.user.Role;
import com.hamedbk.helpdesk.user.User;
import com.hamedbk.helpdesk.user.UserService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;
    private final UserService userService;
    private final TicketMapper ticketMapper;

    public TicketController (TicketService ticketService, UserService userService, TicketMapper ticketMapper) {
        this.ticketService = ticketService;
        this.userService = userService;
        this.ticketMapper = ticketMapper;
    }


    @GetMapping
    @PreAuthorize("hasAnyRole('USER','SUPPORT')")
    public ResponseEntity<List<TicketResponse>> getTickets (@AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByUsername(userDetails.getUsername());
        List<TicketResponse> tickets = ticketService.getTicketsForRole(currentUser)
                                        .stream()
                                        .map(ticketMapper::toResponse)
                                        .toList();
        return ResponseEntity.ok(tickets);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','SUPPORT')")
    public ResponseEntity<TicketResponse> getTicketById(@PathVariable Long id,
                                                @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByUsername(userDetails.getUsername());

        Ticket ticket = ticketService.getTicket(id);
        boolean isOwner = ticket.getUser().getId().equals(currentUser.getId());
        if (!isOwner) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(ticketMapper.toResponse(ticket));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','SUPPORT')")
    public ResponseEntity<Void> createTicket(@RequestBody TicketRequest ticketRequest,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByUsername(userDetails.getUsername());

        Ticket ticket = ticketMapper.toEntity(ticketRequest);
        ticket.setUser(currentUser);

        ticketService.insertTicket(ticket);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','SUPPORT')")
    public ResponseEntity<Void> updateTicketById(@PathVariable Long id, @RequestBody TicketRequest ticketRequest,
                                                 @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByUsername(userDetails.getUsername());

        Ticket ticket = ticketMapper.toEntity(ticketRequest);
        ticket.setUser(currentUser);

        Ticket existing =  ticketService.getTicket(id);
        boolean isOwner = existing.getUser().getId().equals(currentUser.getId());
        if (currentUser.getRole() == Role.USER && !isOwner) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ticketService.updateTicket(id, ticket, currentUser);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER','SUPPORT')")
    public ResponseEntity<Void> deleteTicketById(@PathVariable Long id,
                                                 @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByUsername(userDetails.getUsername());

        Ticket ticket = ticketService.getTicket(id);
        boolean isOwner = ticket.getUser().getId().equals(currentUser.getId());
        if (!isOwner) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/sort")
    public ResponseEntity<List<TicketResponse>> getSort(@RequestParam String sortDir, @RequestParam String sortBy) {
        List<TicketResponse> tickets = ticketService.getSort(sortDir, sortBy)
                                        .stream()
                                        .map(ticketMapper::toResponse)
                                        .toList();
        return ResponseEntity.ok(tickets);
    }

}