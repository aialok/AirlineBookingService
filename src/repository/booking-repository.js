const { StatusCodes } = require("http-status-codes");

const { Booking } = require("../models/index");
const { ValidationError, AppError } = require("../utils/Errors/index");

class BookingRepository {
  async createBooking(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      console.log(error);
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError();
      }

      throw new AppError(
        "RepositoryError",
        "cannot create Booking",
        "There was some issue creating a booking, try some moment later ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateBooking(bookingId, data) {
    try {
      const response = await Booking.update(data, {
        where: {
          id: bookingId,
        },
      });
      return response;
    } catch (error) {}
  }
}

module.exports = BookingRepository;
