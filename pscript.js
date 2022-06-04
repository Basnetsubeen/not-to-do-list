let entryList = [];
let badList = [];
const weekHours = 7 * 24;

// Creating the function that helps to get the data on a form submit
const handleOnSubmit = (e) => {
  const data = new FormData(e);
  const task = data.get("task");
  const hr = +data.get("hr");

  const obj = { task, hr };
  entryList.push(obj);

  const ttlHrs = getTotalHours();
  if (ttlHrs + hr > weekHours) {
    return alert("You have exceded the hrs limit.");
  }
  display(entryList);
  getTotalHours();
};

// Creating a display function for the inserted data
const display = (displayArg) => {
  let str = " ";
  displayArg.map((item, i) => {
    str += ` <tr>
<td>${item.task}</td>
<td>${item.hr}</td>
<td class="text-end">
  <button onClick = "deleteEntryList(${i})" class="btn btn-danger">
    <i class="fa-solid fa-trash-can"></i>
  </button>
  <button onClick = " switchToBadList(${i})" class="btn btn-success">
    <i class="fa-solid fa-arrow-right"></i>
  </button>
</td>
</tr>`;
  });
  // Inserting a entryList html which helps to map through each items.
  document.getElementById("entryList").innerHTML = str;

  getTotalHours();
};

// Creating a function that displays a badList
const displayBadList = (arg) => {
  let str = " ";
  arg.map((item, i) => {
    str += `  <tr>
  <td>${item.task}</td>
  <td>${item.hr}</td>
  <td class="text-end">
  <button onClick = " switchToEntryList(${i})" class="btn btn-warning">
  <i class="fa-solid fa-arrow-left"></i>
</button>
    <button onClick = "deleteBadList(${i})" class="btn btn-danger">
      <i class="fa-solid fa-trash-can"></i>
    </button> 
   
  </td>
</tr>`;
  });
  document.getElementById("badList").innerHTML = str;
  badTotalHours();
  getTotalHours();
};

// creating a function that that helps to delete the items form goodList
const deleteEntryList = (i) => {
  if (!confirm("Are you sure, You want to delete?")) return;
  const filterArray = entryList.filter((item, index) => index !== i); //5 !== 5
  entryList = filterArray;
  display(entryList);
};

// Switching form goodList to badlist
const switchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);
  badList.push(itemToBeSwitched[0]);
  display(entryList);
  displayBadList(badList);
};

// Creating a delete function to delete form badList
const deleteBadList = (i) => {
  if (!confirm("Are you sure, You want to delete?")) return;
  const filterArray = badList.filter((item, index) => index !== i); //5 !== 5
  badList = filterArray;
  displayBadList(badList);
};

// Switching form badList to EntryList
const switchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1);
  entryList.push(itemToBeSwitched[0]);
  displayBadList(badList);
  display(entryList);
};

// Calculating a total hrs by using reduce function
const getTotalHours = () => {
  const ttlEntryList = entryList.reduce((acc, item) => acc + item.hr, 0);
  const ttlBadList = badList.reduce((acc, item) => acc + item.hr, 0);
  const total = ttlEntryList + ttlBadList;

  document.getElementById("totalHours").innerText = total;
  return total;
};

//  Calculating the total bad hours
const badTotalHours = () => {
  const badTotallHr = badList.reduce((acc, item) => acc + item.hr, 0);
  document.getElementById("badTtlHr").innerText = badTotallHr;
};
