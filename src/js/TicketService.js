/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
import createRequest from './api/createRequest';

const baseUrl = 'http://localhost:7070';

export default class TicketService {
  list(callback) {
    createRequest({url: `${baseUrl}/?method=allTickets`}, callback);
  }

  get(id, callback) {
    createRequest({url: `${baseUrl}/?method=ticketById&id=${id}`}, callback);
  }

  create(data, callback) {
    createRequest({url: `${baseUrl}/?method=createTicket`, method: 'POST', data}, callback);
  }

  update(id, data, callback) {
    createRequest({url: `${baseUrl}/?method=updateById&id=${id}`, method: 'POST', data}, callback);
  }

  delete(id, callback) {
    createRequest({url: `${baseUrl}/?method=deleteById&id=${id}`}, callback);
  }
}
