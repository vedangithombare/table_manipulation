document.addEventListener("DOMContentLoaded", function () {
  const inputName = document.getElementById("name");
  const inputAge = document.getElementById("age");
  const submitBtn = document.getElementById("submitBtn");
  const nameHeader = document.getElementById("nameHeader");
  const ageHeader = document.getElementById("ageHeader");

  const table = document
    .getElementById("tableContainer")
    .getElementsByTagName("tbody")[0];
  const arr = [];
  let name;
  let age;

  function handleName(event) {
    name = event.target.value.trim();
    console.log("name:", name);
  }

  function handleAge(event) {
    age = event.target.value.trim();
    console.log("age:", age);
  }

  // Create row
  function createRow(person) {
    console.log(`logging item: ${person.name}`);
    // making row
    const newRow = table.insertRow();
    // inserting 3 cells
    const nameCell = newRow.insertCell();
    const ageCell = newRow.insertCell();
    const modifyCell = newRow.insertCell();
    // naming cells
    nameCell.textContent = person.name;
    ageCell.textContent = person.age;

    // creating edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", (e) => {
      console.log(`editing row of ${person.name}`);

      // Replacing the name cell with new input text
      const nameCellInput = document.createElement("input");
      nameCellInput.type = "text";
      nameCellInput.value = nameCell.textContent;
      nameCell.textContent = "";
      nameCell.append(nameCellInput);

      // Replacing the age cell with new input text
      const ageCellInput = document.createElement("input");
      ageCellInput.type = "number";
      ageCellInput.value = ageCell.textContent;
      ageCell.textContent = "";
      ageCell.append(ageCellInput);

      function handleEnter(e) {
        if (e.key === "Enter") {
          const newName = nameCellInput.value;
          const newAge = ageCellInput.value;
          // updating the array data too
          person.name = newName;
          person.age = newAge;

          nameCell.textContent = newName;
          ageCell.textContent = newAge;
          console.log(`Updated row of ${person.name}: ${newName}, ${newAge}`);
        }
      }

      nameCellInput.addEventListener("keydown", handleEnter);
      ageCellInput.addEventListener("keydown", handleEnter);
    });

    // creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", () => {
      newRow.remove();

      console.log(`deleted row of ${person.name} `);
    });

    modifyCell.appendChild(editBtn);
    modifyCell.appendChild(deleteBtn);
  }

  // Handling submit (Add) button
  function handleFormSubmit(event) {
    event.preventDefault();

    if (!name || !age) {
      alert("Please fill out both fields");
      return;
    }
    if (age < 0) {
      alert("Please enter valid age");
      return;
    }

    const person = {
      name: name,
      age: age,
    };
    arr.push(person);
    createRow(person);

    inputName.value = "";
    inputAge.value = "";
    console.log("arr", arr);
  }

  // Sorting functions
  const ascending = () => [...arr].sort((a, b) => a.age - b.age);
  const descending = () => [...arr].sort((a, b) => b.age - a.age);
  const stringAscending = () =>
    [...arr].sort((a, b) => a.name.localeCompare(b.name));
  const stringDescending = () =>
    [...arr].sort((a, b) => b.name.localeCompare(a.name));

  // Alphabetical sorting
  nameHeader.addEventListener("click", (e) => {
    console.log(e.detail);
    if (e.detail === 1) {
      decideSorting = stringAscending();
    } else if (e.detail === 2) {
      decideSorting = stringDescending();
    } else {
      decideSorting = [...orignal];
    }
    handleArrayData(decideSorting);
    console.log("deciding sort: ", decideSorting);
  });

  // Age sorting
  ageHeader.addEventListener("click", (e) => {
    console.log(e.detail);
    if (e.detail === 1) {
      decideSorting = ascending();
    } else if (e.detail === 2) {
      decideSorting = descending();
    } else {
      decideSorting = [...orignal];
    }
    handleArrayData(decideSorting);
    console.log("deciding sort: ", decideSorting);
  });

  // Displaying the sorted arrays
  function handleArrayData(arr) {
    table.innerHTML = "";
    arr.forEach((item) => {
      createRow(item);
    });
  }

  inputName.addEventListener("input", (event) => handleName(event));
  inputAge.addEventListener("input", (event) => handleAge(event));
  submitBtn.addEventListener("click", (event) => handleFormSubmit(event));
});
