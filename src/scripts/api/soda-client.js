'use strict';

function createXhr(method, uri, headers, username, password) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, uri, false, username, password);
  for (var key in headers) {
    if (headers.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }
  if (username) {
    xhr.withCredentials = true;
  }
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
  if (resource.charAt(0) !== '/') {
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
      'Accept':'application/json'
    };

  if (config.appToken) {
      headers['X-App-Token'] = config.appToken;
  }

  if (body != null) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }
  var xhr = createXhr(method, uri, headers, config.username, config.password);
  xhr.onerror = function (error) {
    xhr.onload = null;
    callback(error);
  };
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

  get: function (resource, params, callback) {
    connection(this.config, 'GET', resource, null, params, callback);
  },

  post: function (resource, body, params, callback) {
    connection(this.config, 'POST', resource, body, params, callback);
  },

  put: function (resource, body, params, callback) {
    connection(this.config, 'PUT', resource, body, params, callback);
  },

  delete: function (resource, params, callback) {
    connection(this.config, 'DELETE', resource, params, callback);
  }

};

module.exports = SODAClient;
