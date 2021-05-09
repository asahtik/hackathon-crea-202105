var address = process.env.BITCOIN_ADDRESS || "mwKaUWSirv4H5n8J1BqiycnFDpATnK9473";
var outAddress = process.env.BITCOIN_OUTADDRESS || "myMLjcmLTq1QSqJn7Mbeo65HER3HyJxaZm";
var username = "user";
var pass = "password";
var port = process.env.BITCOIND_PORT || 18332;

const getAddress = () => {
  return address;
}

const getOutAddress = () => {
  return outAddress;
}

const getUsername = () => {
  return username;
}

const getPassword = () => {
  return pass;
}

const getPort = () => {
  return port;
}

module.exports = {
  getAddress,
  getOutAddress,
  getPort,
  getUsername,
  getPassword
}