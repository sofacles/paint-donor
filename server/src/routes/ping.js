const postPing = async (req, res) => {
  res.send({ pingReceived: true });
};

module.exports = {
  postPing,
};
