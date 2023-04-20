const { deleteById } = require("./delete-by-id");
const { getCertainFeedback } = require("./get-certain");
const { getListOfFeedBack } = require("./get-list-of-feedbacks");
const { sendFeedBack } = require("./send-feedback");

module.exports = {
  sendFeedBack,
  getListOfFeedBack,
  deleteById,
  getCertainFeedback,
};
