/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(ticket, { onEdit, onDelete, onToggle, onOpenDescription }) {
    this.ticket = ticket;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
    this.onToggle = onToggle;
  }

  render() {
    // тикет
    const ticket = document.createElement('div');
    ticket.classList.add('ticket');
    ticket.dataset.id = this.ticket.id;
    
    // чекбокс
    const status = document.createElement('input');
    status.type = 'checkbox';
    status.name = 'status-checkbox';
    status.checked = this.ticket.status;
    status.classList.add('ticket-status');

    // название
    const title = document.createElement('p');
    title.classList.add('ticket-title');
    title.textContent = this.ticket.name;

    // дата
    const created = document.createElement('span');
    created.classList.add('ticket-date');
    created.textContent = new Date(this.ticket.created).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(',', '');

    // кнопка редактировать
    const editBtn = document.createElement('button');
    editBtn.classList.add('ticket-edit');
    editBtn.textContent = '✎';

    // кнопка удалить
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('ticket-delete');
    deleteBtn.textContent = 'X';

    // описание
    const description = document.createElement('p');
    description.classList.add('ticket-description');
    description.textContent = this.ticket.description;

    // события
    status.addEventListener('change', () => this.onToggle(this.ticket, status.checked));
    editBtn.addEventListener('click', () => this.onEdit(this.ticket));
    deleteBtn.addEventListener('click', () => this.onDelete(this.ticket));
    ticket.addEventListener('click', (e) => {
      if (e.target.closest('.ticket-edit') || e.target.closest('.ticket-delete') || e.target.closest('.ticket-status')) {
        return;
      }

      if(description.textContent === '') {
        return
      }

      description.classList.toggle('openned');
    });

    ticket.append(status, title, created, editBtn, deleteBtn, description);
    return ticket;
  }
}
