const axios = require('axios');

async function getUser(id) {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return data;
}

module.exports = { getUser };
