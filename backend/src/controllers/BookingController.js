const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spa_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spa: spa_id,
      date,
    });

    await booking.populate('spa').populate('user').execPopulate();

    const ownerSocket = req.connectedUsers[booking.spa.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('booking_request', booking);
    }

    return res.json(booking);
  }
};