const createRequest = async (options = {}, callback) => {
  const { url, method = 'GET', data } = options;
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = null;
      try {
        response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
      } catch (err) {
        console.error('Ошибка парсинга JSON', err);
      }
      callback(response);
    } else {
      console.error(`Ошибка запроса: ${xhr.status}`);
      callback(null);
    }
  };

  xhr.onerror = () => {
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