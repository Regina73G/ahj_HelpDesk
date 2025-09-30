/**
 *  Основной класс приложения
 * */
import TicketView from './TicketView';
import TicketForm from './TicketForm';
import DeleteModal from './Modal';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;

    this.element = document.createElement('div');
    this.element.classList.add('help-desk');
  }

  init() {
    this.renderTickets();

    const addBtn = document.createElement('button');
    addBtn.classList.add('new-ticket-btn');
    addBtn.textContent = 'Добавить тикет';
    addBtn.addEventListener('click', () => this.openCreateForm());

    this.container.append(addBtn, this.element);
  }

  renderTickets() {
    this.ticketService.list((tickets) => {
      this.element.innerHTML = '';
      tickets.forEach((ticket) => {
        const view = new TicketView(ticket, {
          onEdit: (t) => this.openEditForm(t),
          onDelete: (t) => this.deleteTicket(t),
          onToggle: (t, status) => this.toggleStatus(t, status),
        });
        this.element.append(view.render());
      });
    });
  }

  openCreateForm() {
    const form = new TicketForm(null);

    form.onSubmit((data) => {
      this.ticketService.create(data, () => {
        this.renderTickets();
        form.form.remove();
      });
    });

    form.onCancel(() => {
      form.form.remove();
    });
  }

  openEditForm(ticket) {
    const form = new TicketForm(ticket);

    form.onSubmit((data) => {
      this.ticketService.update(ticket.id, data, () => {
        this.renderTickets();
        form.form.remove();
      });
    });

    form.onCancel(() => {
      form.form.remove();
    });
  }

  deleteTicket(ticket) {
    const modal = new DeleteModal('Удалить тикет', 'Вы уверены, что хотите удалить тикет? Это действие необратимо.');

    modal.onConfirm(() => {
      this.ticketService.delete(ticket.id, () => this.renderTickets());
      modal.modal.remove();
    });

    modal.onCancel(() => {
      modal.modal.remove();
    });
  }

  toggleStatus(ticket, status) {
    this.ticketService.update(ticket.id, { status }, () => this.renderTickets());
  }
}
