const { BookingServices } = require("../services/index");
const { StatusCodes } = require("http-status-codes");

const bookingServices = new BookingServices();

const create = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const response = await bookingServices.createBooking(data);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully Flight is booked !",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "There is error in booking data",
      success: false,
      data: {},
      err: { error },
    });
  }
};

module.exports = {
  create,
};
