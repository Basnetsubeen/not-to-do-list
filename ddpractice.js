let entryList = [];
let badList = [];

const handleOnSubmit = (e) => {
  const data = new FormData(e);
  const task = data.get("task");
  const hr = +data.get("hr");

  const obj = { task, hr };
  entryList.push(obj);
  display(entryList);
};

const display = (displayArg) => {
  let str = " ";
  displayArg.map((item, i) => {
    str += `<tr>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button onClick = "deleteEntryList(${i})" class="btn btn-danger">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <button onClick = "switchToBadList(${i})" class="btn btn-success">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>
    `;
  });
  document.getElementById("entryList").innerHTML = str;
};

const deleteEntryList = (i) => {
  if (!confirm("Are you sure, you want to delete this?")) return;
  const filterArray = entryList.filter((item, index) => index !== i);
  entryList = filterArray;
  display(entryList);
};

const displayBadList = (arg) => {
  let str = " ";
  arg.map((item, i) => {
    str += `<tr>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
    <button class="btn btn-warning">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
      <button onClick = "deleteEntryList(${i})" class="btn btn-danger">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    
    </td>
  </tr>
    `;
  });
  document.getElementById("badList").innerHTML = str;
};
const switchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);
  badList.push(itemToBeSwitched[0]);
  display(entryList);
  displayBadList(badList);
};

const deleteBadList = () => {};
