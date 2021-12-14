export const smallestToBiggest = (a, b) => {
  return new Date(a.publishDate) - new Date(b.publishDate);
}

export const biggestToSmallest = (a, b) => {
  return new Date(b.publishDate) - new Date(a.publishDate);
}
  
export const handleFormatFilterDate = (date) => {
  const d = new Date(date * 1000);
  var date =
    ("0" + d.getDate()).slice(-2) +
    "." +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "." +
    d.getFullYear();
  var dateWithTimeFilter = date + " " + "03:00:00";
  var splitedDate = dateWithTimeFilter.split(".");
  var numberFilterDate = new Date([splitedDate[1], splitedDate[0], splitedDate[2]]) * 1;
  return numberFilterDate;
};

export const filterNews = (list, filter) => list.filter((value) => {
  if (filter.filterEvent != null && !isNaN(filter.filteredDate)) {
    var date = handleFormatFilterDate(value.publishDate);
    var isFaund =
      String(value.newsCategoryId).includes(filter.filterEvent) &&
      String(date).includes(filter.filteredDate);
    return isFaund;
  }
  if (filter.filterEvent != null) {
    return String(value.newsCategoryId).includes(filter.filterEvent);
  }
  var date = handleFormatFilterDate(value.publishDate);
  return String(date).includes(filter.filteredDate);
});
