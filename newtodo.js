let items = [];
display();
let form = document.getElementById("form");
form.addEventListener("submit", addItem, false);

let errMsg = document.getElementById("err-msg");
function addItem(e) {
  e.preventDefault();

  let nameElement = document.getElementById("name");

  let name = nameElement.value.trim();
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  if (name == "" || date == "" || category == "") {
    errMsg.setAttribute("class", "alert alert-danger  text-center");
    errMsg.innerHTML = "Please Fill All Fields";
    return;
  } else {
    let item = {
      id: Date.now(),
      name,
      date,
      category
    };

    items.push(item);

    form.reset();

    localStorage.setItem("items", JSON.stringify(items));
    // let lsStorage = localStorage.getItem('items');
    // console.log(lsStorage)
    // lsStorage.push(item);

    errMsg.setAttribute("class", "alert alert-success  text-center");
    errMsg.innerHTML = "Todo Item saved successfully";

    nameElement.focus();
    list.innerHTML = "";
    display();
  }
}
let html = "";
function display() {
  let list = document.getElementById("list");
  let item;
  let newItems = JSON.parse(localStorage.getItem("items"));
  if (newItems != null) {
    console.log(newItems);
    for (x = 0; x < newItems.length; x++) {
      item = newItems[x];
      console.log(item);

      list.insertAdjacentHTML(
        "beforeend",
        `<p id = ${item.id} class = 'items'><i class="fa fa-thumb-tack" aria-hidden="true"></i>  &nbsp ${item.name}
        (${item.category}) is due for ${item.date} <span onclick = 'delItem(${item.id})' 
        class = 'del' id = ${item.id}><i class = 'fas fa-trash' id = 'del'><i></span</p>`
      );
    }
  }
}


function delItem(item) {
  console.log(typeof item)
  
  let itemIndex = items.findIndex(i => i.id === item);
  items.splice(itemIndex, 1)
  errMsg.setAttribute('class', 'alert alert-danger  text-center')
  errMsg.innerHTML = 'deleted Todo';
 
  localStorage.setItem('items', JSON.stringify(items));

  let listItem = document.getElementById(item);
let ul = listItem.parentNode;
  
      ul.removeChild(listItem)
      list.innerHTML = "";
      display();
}
