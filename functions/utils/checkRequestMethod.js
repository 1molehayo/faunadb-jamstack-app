const formattedResponse = require("./formattedResponse");

const handleRequestCheck = (event, method) => {
  if (event.httpMethod !== method) {
    // console.log("there was an error");
    return formattedResponse(405, { err: "Method not supported" });
    // throw Error("there was an error");
  }

  console.log("method is really cool");
};

module.exports = {
  handleRequestCheck,
};
