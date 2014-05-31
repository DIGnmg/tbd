'use strict';

function createXhr(method, uri, headers, username, password) {
  var xhr = new XMLHttpRequest();
  for (var key in headers) {
    if (headers.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }
  if (username) {
    xhr.withCredentials = true;
  }
  xhr.open(method, uri, false, username, password);
  return xhr;
}

function querystring(params) {
  var pairs = [];
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      pairs.push(key + '=' + params[key]);
    }
  }
  return pairs.length ? '?' + pairs.join('&') : '';
}

function resourcePath(resource) {
  if (!resource.indexOf('/')) {
    resource = '/resource/' + resource;
  }
  var extension = '.json',
    match = resource.match(/^(.+)(\.\w+)$/);
  if (match) {
    resource = match[0];
    extension = match[1];
  }
  return resource + extension;
}

function connection(config, method, resource, body, params, callback) {
  method = (method || 'GET').toUpperCase();
  var query = querystring(params),
    path = resourcePath(resource),
    uri = 'https://' + config.domain + path + query,
    headers = {
      'X-App-Token': config.appToken,
      'Accept':'application/json'
    };

  if (body != null) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }
  var xhr = createXhr(method, uri, headers, config.username, config.password);
  xhr.onload = function deleteResponse() {
    var error = null,
      data = null;
    if (xhr.status !== 200) {
      error = new Error('Error querying "' + uri + '": ' + xhr.responseText);
    } else {
      try {
        data = JSON.parse(xhr.responseText);
      } catch (err) {
        error = err;
      }
    }
    callback(error, data);
  };
  xhr.send(body);
}

function SODAClient(config) {
  this.config = config || {};
}

SODAClient.prototype = {

  get: function (resource, params) {
    connection(this.config, 'GET', resource, params);
  },

  post: function (resource, body, params) {
    connection(this.config, 'POST', resource, body, params);
  },

  put: function (resource, body, params) {
    connection(this.config, 'PUT', resource, body, params);
  },

  delete: function (resource, params) {
    connection(this.config, 'DELETE', resource, params);
  }

};

module.exports = SODAClient;
