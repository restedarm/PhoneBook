import fs from "fs";

import contact from "./contact.js";
import { sort } from "./sort.js";
import { getInput } from "./input.js";

const { order, criteria, filePath } = getInput();

const text = fs.readFileSync(filePath, "utf-8");

const lines = text.split(/\r?\n/);

const contacts = contact.getValidatedContacts(lines);

const sortedContacts = sort(contacts, order, criteria);

contact.logContacts(sortedContacts);
