import { Validator } from "./validator.js";

function parseContact(line) {
  const components = line.split(" ");
  let name;
  let surname;
  let separator;
  let number;

  if (components.length === 3) {
    name = components[0];
    surname = null;
    separator = components[1];
    number = components[2];
  } else if (components.length === 4) {
    name = components[0];
    surname = components[1];
    separator = components[2];
    number = components[3];
  } else {
    console.error("Invalid input format: " + line);
    return null;
  }
  return {
    name,
    surname,
    separator,
    number,
  };
}

class Contact {
  constructor(validator) {
    this.validator = validator;
  }
  getValidatedContacts(lines) {
    return lines
      .map(parseContact)
      .filter(Boolean)
      .map((contact) => ({
        ...contact,
        errors: this.validator.validate(contact),
      }));
  }

  logContacts(contacts) {
    contacts.forEach((contact, ind) => {
      console.log(
        `Line ${ind + 1} ${contact.name} ${
          contact.surname ? contact.surname + " " : ""
        }${contact.separator} ${contact.number}${
          contact.errors.length > 0 ? "\n" : ""
        }${contact.errors.join(", ")}`
      );
    });
  }
}

export default new Contact(new Validator());
