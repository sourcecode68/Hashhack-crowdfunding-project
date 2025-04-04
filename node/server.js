const express = require('express');
const app = express();

app.use(express.json());

app.post('/admin_verification', (req, res) => {
  const { userid, password } = req.body;
  if (userid === 'admin' && password === 'password') {
    res.status(200).send({ message: 'Authenticated' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
