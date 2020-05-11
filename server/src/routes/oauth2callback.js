const oauth2callback = async (req, res) => {
  console.info(req);
  res.send("{healthy:'OK'")
};

module.exports = {
  oauth2callback
};