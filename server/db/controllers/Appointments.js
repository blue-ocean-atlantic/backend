const { Appointments } = require('../model');

const getAppointments = (user_id) => {
  return Appointments.find({ $or: [ { donor_id: user_id }, { receiver_id: user_id } ] }, '-_id -__v -createdAt -updatedAt').exec();
};

const createNewAppointment = (params) => {
  return Appointments.create(params);
};

const getNextAppointmentId = () => {
  return Appointments.findOne({}, 'appointment_id').sort({appointment_id: -1}).exec();
}

const updateAppointment = (appointment_id, updateParams) => {
  return Appointments.findOneAndUpdate({appointment_id}, updateParams).exec();
};

module.exports = {
  getAppointments,
  createNewAppointment ,
  getNextAppointmentId,
  updateAppointment
};
