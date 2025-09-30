const createRequest = async (options = {}, callback = () => {}) => {
  const { url, method = 'GET', data } = options;
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    setTimeout(() => {
      // чтобы увидеть иконку загрузки
      if (xhr.status >= 200 && xhr.status < 300) {
        let response = null;
        try {
          response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Ошибка парсинга JSON', err);
        }
        callback(response);
      } else {
        // eslint-disable-next-line no-console
        console.error(`Ошибка запроса: ${xhr.status}`);
        callback(null);
      }
    }, 500);
  };

  xhr.onerror = () => {
    // eslint-disable-next-line no-console
    console.error('Ошибка сети');
    callback(null);
  };

  xhr.open(method, url);

  if (data) {
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }
};

export default createRequest;
