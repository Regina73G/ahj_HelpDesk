/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor(ticket = null) {
    this.ticket = ticket;
    this.container = document.querySelector('body');
    this.form = null;

    this.createForm(ticket);
  }

  createForm(ticket = null) {
    this.form = document.createElement('form');
    this.form.classList.add('form');
    
    const title = document.createElement('h3');
    title.classList.add('form_title');
    title.textContent = ticket ? 'Редактировать тикет' : 'Новый тикет';

    // заголовок тикета
    const ticketTitleLabel = document.createElement('label');
    const ticketTitle = document.createElement('input');
    ticketTitle.classList.add('form_ticket-title');
    ticketTitle.type = 'text';
    ticketTitle.name = 'name';
    ticketTitle.required = true;
    ticketTitle.value = ticket ? ticket.name : '';
    ticketTitleLabel.append(ticketTitle);


    // описание тикета
    const ticketDescriptionLabel = document.createElement('label');
    const ticketDescription = document.createElement('textarea');
    ticketDescription.classList.add('form_ticket-description');
    ticketDescription.name = 'description';
    ticketDescription.value = ticket ? ticket.description : '';
    ticketDescriptionLabel.append(ticketDescription);

    // кнопки
    const buttons = document.createElement('div');
    buttons.classList.add('form_buttons');

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('form_btn-cancel');
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Отмена';

    const savelBtn = document.createElement('button');
    savelBtn.classList.add('form_btn-save');
    savelBtn.type = 'submit';
    savelBtn.textContent = 'Ок';

    buttons.append(cancelBtn, savelBtn);

    this.form.append(title, ticketTitleLabel, ticketDescriptionLabel, buttons);
    this.container.append(this.form);
  }

  onSubmit(callback) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(this.form);
      callback({
        name: formData.get('name'),
        description: formData.get('description'),
      });
    });
  }

  onCancel(callback) {
    const cancelBtn = this.form.querySelector('.form_btn-cancel');
    cancelBtn.addEventListener('click', () => {
      callback();
      this.form.remove();
    });
  }
}