/**
 *  Класс для создания модального окна подтвержения действия
 * */
export default class Modal {
  constructor(title, message) {
    this.title = title;
    this.message = message;
    this.container = document.querySelector('body');
    this.modal = null;

    this.createModal();
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    const title = document.createElement('h3');
    title.classList.add('modal_title');
    title.textContent = this.title;

    const msg = document.createElement('p');
    msg.classList.add('modal_message');
    msg.textContent = this.message;

    // кнопки
    const buttons = document.createElement('div');
    buttons.classList.add('modal-buttons');

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('modal_btn-cancel');
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Отмена';

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('modal_btn-confirm');
    confirmBtn.type = 'button';
    confirmBtn.textContent = 'Ок';

    buttons.append(cancelBtn, confirmBtn);

    this.modal.append(title, msg, buttons);
    this.container.append(this.modal);

    this.cancelBtn = cancelBtn;
    this.confirmBtn = confirmBtn;

    document.body.classList.add('modal-open');
  }

  onCancel(callback) {
    this.cancelBtn.addEventListener('click', () => {
      callback();
      this.modal.remove();
      document.body.classList.remove('modal-open');
    });
  }

  onConfirm(callback) {
    this.confirmBtn.addEventListener('click', () => {
      callback();
      this.modal.remove();
      document.body.classList.remove('modal-open');
    });
  }
}
