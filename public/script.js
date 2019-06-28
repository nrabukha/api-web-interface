class AjaxRequests {

  constructor(url, collection) {
    this.url = url;
    this.collection = collection;
  }

  ajaxGetRequest(cb) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', `${this.url}?collection=${this.collection}`, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        cb(xhttp);
      }
    };
  };

  ajaxPostRequest(reqBody) {
    const xhttp = new XMLHttpRequest();
    if (this.collection === '' || !this.collection) {
      console.log('Collection not found');
      return;
    }
    xhttp.open('POST', `${this.url}?collection=${this.collection}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState != 4 && xhttp.status != 200) return;
      console.log('Request sended');
    };

    xhttp.send(JSON.stringify(reqBody));
  };

  ajaxDeleteRequest(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', `${this.url}/${id}?collection=${this.collection}`, true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState != 4 && xhttp.status != 200) return;
      console.log('Request sended');
    };
    xhttp.send();
  };

  ajaxUpdateRequest(reqBody) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('PUT', `${this.url}/${reqBody.id}?collection=${this.collection}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState != 4) return;
      console.log('Request sended');
    };

    xhttp.send(JSON.stringify(reqBody));
  };
}

// let currentCollectionName = sessionStorage.getItem('collection');
const database = new AjaxRequests('database', '');
const dataSection = document.getElementById('data');

database.getData = function () {
  const listCollection = document.getElementById('list-collection');
  if (!listCollection[0]) {
    alert('Create new collection');
    return;
  }
  const id = listCollection[listCollection.selectedIndex].value;
  this.collection = id;
  const ajaxGetRequest = this.ajaxGetRequest.bind(this, (xhttp) => {
    dataSection.innerHTML = databaseHtmlFormat(JSON.parse(xhttp.response));
  });
  setTimeout(ajaxGetRequest, 450);
};

database.addData = function (buttonEvent) {
  const button = buttonEvent.target;
  button.src = 'images/add-active.png';
  setTimeout(() => {
    button.src = 'images/add.png';
  }, 450);

  this.ajaxPostRequest({
    title: '',
    content: '',
    category: 'nd'
  });
  return this;
};

database.updateData = function (buttonEvent) {
  const button = buttonEvent.target;
  button.src = 'images/edit-active.png';
  setTimeout(() => {
    button.src = 'images/edit.png';
  }, 450);

  const id = button.value;
  const category = document.getElementById(`category-${id}`);

  this.ajaxUpdateRequest({
    id: id,
    title: document.getElementById(`title-${id}`).value,
    content: document.getElementById(`content-${id}`).value,
    category: category[category.selectedIndex].value
  });
  return this;
};

database.deleteData = function (buttonEvent) {
  const button = buttonEvent.target;
  button.src = 'images/remove-active.png';

  const id = buttonEvent.target.value;
  this.ajaxDeleteRequest(id);
  return this;
};

addEventListener('load', () => {
  const attentionLine = document.createElement('DIV');
  const p = document.createElement('P');
  const attentionText = document.createTextNode('Select and load a required collection');
  p.appendChild(attentionText);
  attentionLine.className = 'attention-line';
  attentionLine.appendChild(p);
  dataSection.appendChild(attentionLine);
});

const collections = new AjaxRequests('collections', 'collectionList');

collections.getCollection = function () {
  const listCollection = document.getElementById('list-collection');
  this.ajaxGetRequest((xhttp) => {
    listCollection.innerHTML = collectionHtmlFormat(JSON.parse(xhttp.responseText));
    listCollection.selectedIndex = sessionStorage.getItem('listIndex');
  });
};

collections.getCollectionById = function (id, cb) {
  this.selectedId = id;
  let currentCollection;
  this.ajaxGetRequest((xhttp) => {
    const recievedObj = JSON.parse(xhttp.responseText);
    currentCollection = recievedObj.find((obj) => {
      return obj._id === id;
    });
    if (cb) cb(currentCollection);
  });
  return this;
};

collections.addCollection = function (cb) {
  this.ajaxPostRequest({
    name: document.getElementById('name-create').value,
    description: document.getElementById('description-create').value
  });
  if (cb) cb();
  return this;
};

collections.updateCollection = function (cb) {
  const id = this.selectedId;
  this.collection = 'collectionList';
  this.ajaxUpdateRequest({
    id: id,
    name: document.getElementById('name-update').value,
    description: document.getElementById('description-update').value
  });
  if (cb) cb();
  return this;
};

collections.deleteCollection = function (buttonEvent) {
  this.collection = 'collectionList';
  const listCollection = document.getElementById('list-collection');
  if (!listCollection[0]) {
    alert('Create new collection');
    return;
  }
  const id = listCollection[listCollection.selectedIndex].value;
  this.ajaxDeleteRequest(id);
  database.getData();
  return this;
};

addEventListener('load', collections.getCollection.bind(collections));

const testFunc = (id) => {
  collections.getCollectionById(id, (currentCollection) => {
    document.getElementById('name-update').value = currentCollection.name;
    document.getElementById('description-update').value = currentCollection.description;
  });
};

const selectPanel = document.getElementsByTagName('header')[0].firstElementChild;

const createPanel = document.getElementsByTagName('header')[0].lastElementChild;

const setPanelView = (element, htmlText, cb) => {
  const listCollection = document.getElementById('list-collection');
  if (listCollection && listCollection[0]) {
    const id = listCollection[listCollection.selectedIndex].value;
    element.innerHTML = htmlText;
    if (cb) cb(id);
    sessionStorage.setItem('listIndex', listCollection.selectedIndex);
  } else {
    element.innerHTML = htmlText;
    if (cb) cb();
  }
};

let changeColor = (selectedElement) => {
  let liStyle = selectedElement.parentNode.parentNode.parentNode.parentNode.parentNode;

  switch (selectedElement.value) {
    case 'mc':
      liStyle.setAttribute('class', 'mc');
      break
    case 'smc':
      liStyle.setAttribute('class', 'smc');
      break
    case 'c':
      liStyle.setAttribute('class', 'c');
      break
    case 'sc':
      liStyle.setAttribute('class', 'sc');
      break
    case 'nd':
      liStyle.setAttribute('class', 'nd');
      break
  }
}