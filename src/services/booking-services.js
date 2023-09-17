const axios = require("axios");
const BookingRepository = require("../repository/booking-repository");
const ServiceError = require("../utils/Errors/service-error");

class BookingServices {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const URI = `http://localhost:3000/api/v1/flights/${flightId}`;
      const response = await axios.get(URI);

      const flightData = response.data.data;

      const priceOfTheFlight = flightData.price;
      console.log(priceOfTheFlight);

      if (data.noOfSeats > flightData.totalSeat) {
        throw new ServiceError(
          "Something went wrong in booking process",
          "Insufficient seats"
        );
      }

      const totalCost = priceOfTheFlight * data.noOfSeats;

      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.createBooking(
        bookingPayload
      );

      const result = await axios.patch(URI, {
        totalSeat: flightData.totalSeat - booking.noOfSeats,
      });
      console.log(result);

      await this.bookingRepository.updateBooking(booking.id, {
        status: "Booked",
      });

      return booking;
    } catch (error) {
      console.log(error);
      if (
        error.name == "RepositoryError" ||
        error.name == "SequelizeValidationError"
      ) {
        throw error;
      }

      console.log(error);
      throw new ServiceError();
    }
  }
}

module.exports = BookingServices;
