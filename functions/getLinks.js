const axios = require("axios");
require("dotenv").config();

exports.handler = async (event) => {
  const GET_LINKS = `
            query {
                allLinks {
                    data {
                    name
                    url
                    description
                    _id
                    archieved
                    }
                }
            }       
    `;

  const { data } = await axios({
    method: "POST",
    url: "https://graphql.fauna.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
    },
    data: {
      query: GET_LINKS,
      variables: {},
    },
  });

  console.log(data);

  return {
      statusCode: 200,
      body: JSON.stringify(data)
  }
};
