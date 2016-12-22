const BookApiUtil = {
  fetchAllBooks(cb) {
    $.ajax({
      url: 'https://api.myjson.com/bins/ho58r',
      type: 'GET',
      dataType: 'json',
      success(resp) {
        // console.log(resp);
        window.resp = resp;
        cb(resp);
      }
    });
  }
};

export default BookApiUtil;
