const User = require('../models/User');
const Spa = require('../models/Spa');

module.exports = {
  async index(req, res) {
    const { spaService } = req.query;

    const spas = await Spa.find({ spaServices: spaService });

    return res.json(spas);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, spaServices, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const spa = await Spa.create({
      user: user_id,
      thumbnail: filename,
      company,
      spaServices: spaServices.split(',').map(spaService => spaService.trim()),
      price
    })

    return res.json(spa)
  }
};