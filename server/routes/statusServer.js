const router = require('express').Router();
const dynamoDb = require('../../db/dynamodb')

router.get('/', (_, res) => res.status(200).send({ res: `Service running - ${new Date()}.` }));
router.get('/status', (_, res) => res.status(200).send({ res: `Service running - ${new Date()}.` }));

const USERS_TABLE = process.env.USERS_TABLE;
// const USERS_TABLE = 'users-tables-dev'

router.post('/users', async function (req, res) {
  try {
    const { guid, name } = req.body;
    const params = {
      TableName: USERS_TABLE,
      Item: {
        ...req.body
      },
    };

    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json(USERS_TABLE);
      }
      res.json(params);
    });
  } catch (err) {
    console.log(err)
    return res.json(err.message ? err.message : err);
  }
})

router.get('/users/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }
dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not get user ${userId}` });
    }
    if (result.Item) {
      const {userId, name} = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: `User ${userId} not found` });
    }
  });
})

module.exports = router;
