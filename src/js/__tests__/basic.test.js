/**
 * @jest-environment jsdom
 */

import HelpDesk from '../HelpDesk';

describe('HelpDesk basic functionality', () => {
  let container;
  let ticketServiceMock;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');

    ticketServiceMock = {
      list: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  });

  test('constructor throws error if container is not HTMLElement', () => {
    expect(() => new HelpDesk(null, ticketServiceMock)).toThrow('This is not HTML element!');
  });

  test('init adds add button and help-desk container', () => {
    const app = new HelpDesk(container, ticketServiceMock);
    app.init();

    expect(container.querySelector('.new-ticket-btn')).toBeTruthy();
    expect(container.querySelector('.help-desk')).toBeTruthy();
  });

  test('toggleStatus calls ticketService.update with new status', () => {
    const app = new HelpDesk(container, ticketServiceMock);
    const ticket = { id: '123' };

    app.toggleStatus(ticket, true);

    expect(ticketServiceMock.update).toHaveBeenCalledWith(ticket.id, { status: true }, expect.any(Function));
  });
});
