export function removeEmptyValues(data) {
  Object.keys(data).forEach((key) => {
    if (data[key] === "" || data[key] == null) {
      delete data[key];
    }
  });
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
