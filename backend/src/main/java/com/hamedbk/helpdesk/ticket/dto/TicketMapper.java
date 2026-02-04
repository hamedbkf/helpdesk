package com.hamedbk.helpdesk.ticket.dto;

import com.hamedbk.helpdesk.ticket.Ticket;
import com.hamedbk.helpdesk.user.User;
import com.hamedbk.helpdesk.user.UserService;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {
    public final UserService userService;

    public TicketMapper(UserService userService) {
        this.userService = userService;
    }

    public TicketResponse toResponse(Ticket ticket) {
       return new TicketResponse(
               ticket.getId(),
               ticket.getTitle(),
               ticket.getDescription(),
               ticket.getPriority(),
               ticket.getStatus(),
               ticket.getUser().getUsername(),
               ticket.getAssignee() != null ? ticket.getAssignee().getUsername() : null,
               ticket.getCreationDate(),
               ticket.getLastUpdateDate()
       );
    }

    public Ticket toEntity(TicketRequest ticketRequest) {
        Ticket ticket = new Ticket();
        ticket.setTitle(ticketRequest.title());
        ticket.setDescription(ticketRequest.description());
        ticket.setPriority(ticketRequest.priority());

        // user will be based on JWT user. manually done outside of mapper. can be done better
        ticket.setUser(null);

        User assignee = null;
        if (ticketRequest.assignee() != null)
            assignee =  userService.findByUsername(ticketRequest.assignee());
        ticket.setAssignee(assignee);

        return ticket;
    }
}
