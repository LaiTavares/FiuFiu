const Spa = require('../models/Spa');

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;

    const spas = await Spa.find({ user: user_id });

    return res.json(spas);
  }
}