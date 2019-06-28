
const collectionHtmlFormat = (collectionArr) => {
  let html = '';
  collectionArr.forEach((collection)=>{
    html += `<option value="${collection._id}">${collection.name}</option>`; 
  });

  return html;
};

const databaseHtmlFormat = (dataArr) => {
  let html = '';
  let category = '';
  let selectedCategory = 'mc';
  dataArr.forEach((data)=>{
    category = ['mc', 'smc', 'c', 'sc', 'nd'].map((option)=>{
      if(data.category === option){
        selectedCategory = option;
        return '<option value=' + option + ' selected>' + option + '</option>';}
        return '<option value=' + option + '>' + option + '</option>';
     });
     
    html += `<li class="${selectedCategory}">
         <table class="data-block">
       <thead>
         <tr>
           <th>
             <select onchange="changeColor(this);" id="category-${data._id}">${category.reduce((prevOptions, option)=>{
        return prevOptions + option;
    })}
             </select>
           </th>
           <th><textarea type="text" id="title-${data._id}">${data.title}</textarea></th>
           <th class="table-button">
             <input value="${data._id}" onclick="database.updateData(event)" type="image" src="images/edit.png">
<input value="${data._id}" onclick="database.deleteData(event).getData();" type="image" src="images/remove.png"></th>
         </tr>
      </thead>
       <tbody>
         <tr>
           <td>D:</td>
           <td colspan="2"><textarea type="text" id="content-${data._id}">${data.content}</textarea></td>
         </tr>
       </tbody>
         </table>
       </li></ul>
</section>`
 });

  return html + '</ul>';
};

const htmlElements = {};

htmlElements.selectPanel = `<div class="select-collection-panel">
  <span>Collections: </span>
  <select id="list-collection"></select>
  <button id="load-collection" onclick="database.getData();">Load</button>    <button id="edit-collection" onclick="setPanelView(selectPanel, htmlElements.editPanel, testFunc);">Edit</button>
  <button id="delete-collection" onclick="collections.deleteCollection().getCollection();">Delete</button>
  </div>`;

htmlElements.editPanel = `<div class="edit-collection-panel">
  <div class="name-collection"><span>Name: </span>
  <br><input id="name-update" style="width: 35%;"></div>
  <div class="description-collection">
  <span>Description:</span><br>
  <textarea id="description-update"></textarea></div>
  <button id="update-collection" onclick="collections.updateCollection(setPanelView.bind(null, selectPanel, htmlElements.selectPanel)).getCollection();">Update</button>
  <button id="cancel-update-collection" onclick="setPanelView(selectPanel, htmlElements.selectPanel, collections.getCollection.bind(collections));">Cancel</button>
  </div>`;

htmlElements.createPanel = `<div class="create-collection-panel">
  <div class="name-collection"><span>Name: </span>
  <br><input id="name-create" style="width: 35%;"></div>
  <div class="description-collection">
  <span>Description:</span><br>
  <textarea id="description-create"></textarea></div>
  <button id="create-collection" onclick="collections.addCollection(setPanelView.bind(null, createPanel, htmlElements.cancelCreatePanel)).getCollection();">Create</button>
  <button id="cancel-create-collection" onclick="setPanelView(createPanel, htmlElements.cancelCreatePanel);">Cancel</button>
  </div>`;

htmlElements.cancelCreatePanel = `<div class="open-collection-panel">
  <button onclick="setPanelView(createPanel, htmlElements.createPanel);">Create New</button>
  </div>`;
