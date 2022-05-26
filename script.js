// let entryList = [{ task: "sample data", hr: 0 }];
let entryList = [];
let badList = [];
const weekHours = 7 * 24;

// get the data on form submit
const handleOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");

  const obj = { task, hr };

  // are we allow to add new entry
  const ttlHrs = getTotalHours();
  console.log(ttlHrs);

  if (ttlHrs + hr > weekHours) {
    return alert("you have exceeded the weekly hours, can not add this");
  }

  entryList.push(obj);
  display(entryList);
  getTotalHours();
};

// display item on the DOM
const display = (taskArg) => {
  let str = " ";
  taskArg.map((item, i) => {
    str += `<tr>
  <td>${item.task}</td>
  <td>${item.hr}</td>
  <td class = "text-end">
  <button onClick= "handleOnDeleteEntryList(${i})" class="btn btn-danger">
  <i class="fa-solid fa-trash-can"></i>
  </button>
 
  <button onClick = "switchToBadList(${i})" class="btn btn-success">
  <i class="fa-solid fa-arrow-right"></i>
  </button>
   
  </td>
</tr>`;
  });
  document.getElementById("entryList").innerHTML = str;
  getTotalHours();
};

// display bad list on the dom
const badListDisplay = (arg) => {
  let str = " ";
  arg.map((item, i) => {
    str += `<tr>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class = "text-end">
    <button onClick = "switchToEntryList(${i})" class="btn btn-warning">
    <i class="fa-solid fa-arrow-left"></i>
    </button>
    <button onClick= "handleOnDeleteBadList(${i})"  class="btn btn-danger">
    <i class="fa-solid fa-trash-can"></i>
    </button>
    </td>
  </tr>`;
  });
  document.getElementById("badList").innerHTML = str;
  badTotalHours();
  getTotalHours();
};
// delete the item form the list
const handleOnDeleteEntryList = (i) => {
  if (!confirm("Are you sure you want to delete")) return;
  const filterArray = entryList.filter((item, index) => index !== i);
  entryList = filterArray;
  display(entryList);
};

// switch data form bad list to entry list
const switchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);
  badList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};
// switch data form bad list to entry list
const switchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1);
  entryList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};

// delete the item form the badlist
const handleOnDeleteBadList = (i) => {
  if (!confirm("Are you sure you want to delete")) return;
  const filterArray = badList.filter((item, index) => index !== i); //5! ==5
  badList = filterArray;
  badListDisplay(badList);
};
const getTotalHours = () => {
  const ttlEntryList = entryList.reduce((acc, item) => acc + item.hr, 0);
  const ttlBadList = entryList.reduce((acc, item) => acc + item.hr, 0);

  const total = ttlEntryList + ttlBadList;
  document.getElementById("totalHours").innerText = total;
  return total;
};

const badTotalHours = () => {
  const ttlBadList = badList.reduce((acc, item) => acc + item.hr, 0);
  document.getElementById("badTtlHr").innerText = ttlBadList;
};
