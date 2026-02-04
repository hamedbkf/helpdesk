export interface Ticket {
    id?: number;
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'CRITICAL';
    status: 'NEW' | 'PENDING' | 'SOLVED';
    user: string;
    assignee?: string | null;
    creationDate?: string;
    lastUpdateDate?: string;
}
