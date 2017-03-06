const express = require('express');

const router = express.Router();

router.get('/clog/:id', async (request, response) => {
  const Episode = require('./cloud/graphql/models/Episode').Model;
  try {
    const { id } = request.params;
        // find Avaliable clog
    const result = await Episode.findById(id);
    if (result) {
      const { binary } = result.toObject().data;
          // parse buffer
      response.send(binary.toString('utf8'));
    } else {
      response.status(404).end();
    }
  } catch (e) {
    console.error(e);
    response.status(500).send('Invalid request').end();
  }
});

module.exports = router;
