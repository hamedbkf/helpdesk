package com.hamedbk.helpdesk.ticket.dto;

import com.hamedbk.helpdesk.ticket.enums.TicketPriority;
import com.hamedbk.helpdesk.ticket.enums.TicketStatus;

import java.time.LocalDateTime;

public record TicketResponse(
    Long id,
    String title,
    String description,

    TicketPriority priority,
    TicketStatus status,

    String user,
    String assignee,

    LocalDateTime creationDate,
    LocalDateTime lastUpdateDate
)
{
}
