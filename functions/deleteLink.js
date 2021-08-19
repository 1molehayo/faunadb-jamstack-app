const formattedResponse = require("./utils/formattedResponse");
const { DELETE_LINK } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");

exports.handler = async (event) => {
  if (event.httpMethod !== "DELETE") {
    return formattedResponse(405, { err: "Method not supported" });
  }

  const { id } = JSON.parse(event.body);

  try {
    const { deleteLink: deletedLink } = await sendQuery(DELETE_LINK, { id });

    return formattedResponse(200, deletedLink);
  } catch (error) {
    console.error(error);

    return formattedResponse(500, { err: "Something went wrong" });
  }
};
