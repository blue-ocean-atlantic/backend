const calculateDistance = (lat1, lon1, lat2, lon2) => {
  return 3958.75 * Math.acos(
    Math.sin(lat1/57.2958) *
    Math.sin(lat2/57.2958) +
    Math.cos(lat1/57.2958) *
    Math.cos(lat2/57.2958) *
    Math.cos(lon2/57.2958 - lon1/57.2958));
};

module.exports = {
  calculateDistance
};