const healthCheck = async (req, res) => {
  res.send("{healthy:'OK'")
};

module.exports = {
    healthCheck
};