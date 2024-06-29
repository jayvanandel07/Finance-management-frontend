export function removeEmptyValues(data) {
  Object.keys(data).forEach((key) => {
    if (data[key] === "" || data[key] == null) {
      delete data[key];
    }
  });
}

export function convertDate(dateString) {
  // Create a new Date object from the dateString
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = date.getFullYear(); // Get last two digits of the year

  // Pad day and month with leading zeros if needed
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedYear = year.toString().padStart(2, "0");

  // Return formatted date in DD/MM/YY format
  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}

export const formatDateFromData = (data, dataModel) => {
  return Object.keys(data).reduce((acc, key) => {
    if (dataModel[key]?.type === "date") {
      const date = new Date(data[key]);
      const formattedDate = `${date.getFullYear()}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
      acc[key] = formattedDate;
    } else {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};

export function processLoanData(data) {
  data.transactions = Object.keys(data).reduce((acc, item) => {
    if (item.includes("account_no")) {
      const index = item.match(/\d+/)[0];
      acc.push({
        account_no: data[item],
        amount: data[`amount${index}`],
      });
    }
    return acc;
  }, []);
}
