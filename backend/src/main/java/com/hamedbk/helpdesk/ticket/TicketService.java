package com.hamedbk.helpdesk.ticket;

import com.hamedbk.helpdesk.ticket.enums.TicketStatus;
import com.hamedbk.helpdesk.user.Role;
import com.hamedbk.helpdesk.user.User;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Sort;

import java.nio.file.AccessDeniedException;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getTicketsForRole(User user) {
        // if it's a user give him only his own tickets
        if (user.getRole() == Role.USER) {
            return ticketRepository.findByUserId(user.getId());
        }
        return ticketRepository.findAll();
    }

    public Ticket getTicket(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow( () -> new IllegalStateException(id + " not found"));
    }

    @Transactional
    public void insertTicket(Ticket ticket) {
        // all new tickets are new and not assigned to anyone yet
        ticket.setStatus(TicketStatus.NEW);
        ticket.setAssignee(null);
        ticketRepository.save(ticket);
    }

    @Transactional
    public void updateTicket(Long id, Ticket updatedTicket, User user) {
        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow( () -> new IllegalStateException(id + " not found"));

        if (user.getRole() == Role.USER) {

            if (updatedTicket.getTitle() != null)
                existingTicket.setTitle(updatedTicket.getTitle());

            if (updatedTicket.getDescription() != null)
                existingTicket.setDescription(updatedTicket.getDescription());

            if (updatedTicket.getPriority() != null)
                existingTicket.setPriority(updatedTicket.getPriority());


        } else  if (user.getRole() == Role.SUPPORT){

            if (updatedTicket.getPriority() != null)
                existingTicket.setPriority(updatedTicket.getPriority());

            if (updatedTicket.getStatus() != null)
                existingTicket.setStatus(updatedTicket.getStatus());

            if (updatedTicket.getAssignee() != null)
                existingTicket.setAssignee(updatedTicket.getAssignee());


            if (existingTicket.getUser().getId().equals(user.getId())) {
                if (updatedTicket.getTitle() != null)
                    existingTicket.setTitle(updatedTicket.getTitle());

                if (updatedTicket.getDescription() != null)
                    existingTicket.setDescription(updatedTicket.getDescription());
            }

        }

        // saveAndFlush: triggers the timestamp update even if no fields change [?]
        ticketRepository.saveAndFlush(existingTicket);
    }

    @Transactional
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }


    // not sure when it's useful. in this app's case, sorting and filtering happens in the frontend
    public List<Ticket> getSort(String sortDir, String sortBy) {
        Sort.Direction direction = sortDir.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

        return ticketRepository.findAll(Sort.by(direction, sortBy));
    }

    // could be useful for higher privilege roles
    public List<Ticket> getTicketsByUserId(Long userId) {
        return ticketRepository.findByUserId(userId);
    }

}