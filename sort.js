import { criteriaTypes, sortOrderTypes } from "./constants.js";

function reverseComparator(comparator) {
  return (a, b) => -comparator(a, b);
}

function compareStrings(a, b) {
  if (!a && b) {
    return 1;
  } else if (a && !b) {
    return -1;
  } else if (!a && !b) {
    return 0;
  } else {
    return a.localeCompare(b);
  }
}

export const sort = (contacts, sortOrder, sortBy) => {
  const comparator = (a, b) => {
    if (sortBy === criteriaTypes.surname) {
      return compareStrings(a.surname, b.surname);
    } else if (sortBy === criteriaTypes.phoneNumberCode) {
      const aFirstThree = a.number.slice(0, 3);
      const bFirstThree = b.number.slice(0, 3);
      if (aFirstThree < bFirstThree) {
        return -1;
      } else if (aFirstThree > bFirstThree) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return a.name.localeCompare(b.name);
    }
  };
  contacts.sort(
    sortOrder === sortOrderTypes.ascending
      ? comparator
      : reverseComparator(comparator)
  );
  return contacts;
};
