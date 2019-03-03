const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, callback) {
    //..
  }
});
