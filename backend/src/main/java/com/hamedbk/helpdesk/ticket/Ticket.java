package com.hamedbk.helpdesk.ticket;

import com.hamedbk.helpdesk.user.User;
import com.hamedbk.helpdesk.ticket.enums.TicketPriority;
import com.hamedbk.helpdesk.ticket.enums.TicketStatus;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TicketPriority priority;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = true)
    @JoinColumn(name = "assignee_id", nullable = true)
    private User assignee;

    @CreationTimestamp
    @Column(name = "creation_date", updatable = false)
    private LocalDateTime creationDate;

    @UpdateTimestamp
    @Column(name = "last_update_date")
    private LocalDateTime lastUpdateDate;

}
