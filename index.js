let readlineSync = require("readline-sync");
let fs = require("fs");

let contact = [];

// basic function
function loadData() {
  let data = fs.readFileSync("./contact.json");
  contact = JSON.parse(data);
}

function showMenu() {
  console.log("1. Add contact.");
  console.log("2. Edit contact.");
  console.log("3. Delete contact.");
  console.log("4. Search contact.");
  console.log("5. Save and Exit.");

  let option = readlineSync.question("> ");
  switch (option) {
    case "1":
      addContact();
      showMenu();
      break;
    case "2":
      editContact();
      showMenu();
      break;
    case "3":
      deleteContact();
      showMenu();
      break;
    case "4":
      findContact();
      showMenu();
      break;
    case "5":
      saveAndExit();
      break;
    default:
      break;
  }
}

// show contact function
function showContact() {
  console.log("---------------------------------------");
  for (let i = 0; i < contact.length; i++) {
    console.log(
      i +
        1 +
        ", Name: " +
        contact[i].name +
        ", Phone number: " +
        contact[i].phoneNumber
    );
  }
  console.log("---------------------------------------");
}

// option function
// option 1
function addContact() {
  let askName = readlineSync.question("Name: ");
  let askPhoneNumber = readlineSync.question("Phone number: ");
  if (askName !== "" && askPhoneNumber !== "") {
    let newContact = {
      name: askName,
      phoneNumber: askPhoneNumber,
    };
    contact.push(newContact);
  }
  showContact();
}

// option 2
function editContact() {
  showContact();
  let option = readlineSync.question(
    "Choose the number of the contact you want to make change: "
  );
  if (option >= 1 && option <= contact.length) {
    let askName = readlineSync.question("Name: ");
    let askPhoneNumber = readlineSync.question("Phone number: ");
    if (askName !== "" && askPhoneNumber !== "") {
      let editedContact = {
        name: askName,
        phoneNumber: askPhoneNumber,
      };
      contact[option - 1] = editedContact;
    }
    showContact();
  }
}

// option 3
function deleteContact() {
  showContact();
  let option = readlineSync.question(
    "Choose the number of the contact you want to delete: "
  );
  if (option >= 1 && option <= contact.length) {
    contact.splice(option - 1, 1);
  }
  showContact();
}

// option 4
function findContact() {
  let ask = readlineSync.question(
    "Fill in the info (name/a piece of phone number) of the contact you want to find: "
  );
  if (ask !== "") {
    for (let values of contact) {
      // name
      if (values.name.toLowerCase().indexOf(ask.toLowerCase()) >= 0)
        console.log(values);
      else if (values.phoneNumber.indexOf(ask) >= 0) console.log(values);
    }
    console.log("No one found!");
  }
}

// option 5
function saveAndExit() {
  let content = JSON.stringify(contact);
  fs.writeFileSync("./contact.json", content, { encoding: "utf8" });
}

function main() {
  let flag = true;
  loadData();
  showMenu();
}

main();
