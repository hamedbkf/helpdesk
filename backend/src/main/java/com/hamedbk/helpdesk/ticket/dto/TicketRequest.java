package com.hamedbk.helpdesk.ticket.dto;

import com.hamedbk.helpdesk.ticket.enums.TicketPriority;
import com.hamedbk.helpdesk.ticket.enums.TicketStatus;

public record TicketRequest(
    String title,
    String description,

    TicketPriority priority,

    String user,

    String assignee
) {
}
