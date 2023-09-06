const { StatusCodes } = require("http-status-codes");

const { Booking } = require("../models/index");
const { ValidationError, AppError } = require("../utils/Errors/index");

class BookingRepository {
  async createBooking(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.anem == "SequelizeValidationError") {
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
}
