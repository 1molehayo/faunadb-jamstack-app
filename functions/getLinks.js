const formattedResponse = require("./utils/formattedResponse");
const { GET_LINKS } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return formattedResponse(405, { err: "Method not supported" });
  }

  try {
    const res = await sendQuery(GET_LINKS);
    const data = res.allLinks.data;

    return formattedResponse(200, data);
  } catch (error) {
    console.error(error);

    return formattedResponse(500, { err: "Something went wrong" });
  }
};
