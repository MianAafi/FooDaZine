require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/userModel.js');
const AdminModel = require('./models/AdminModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const itemsModal = require('./models/itemsmodel');
const itemRoutes = require('./routes/itemsroute');
const categoryRoutes = require('./routes/categoryRoutes');
const settingRoutes = require('./routes/settingRoutes');
const auth = require('./middleware/auth');
const fileUpload = require('express-fileupload');

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.API_SECRET,
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());

app.use(bodyParser.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);
app.use('/items', itemRoutes);
app.use('/category', categoryRoutes);
app.use('/setting', settingRoutes);

const generateTokens = async (user) => {
  try {
    const payload = {
      user_id: user._id,
      email: user.email,
      name: user.name,
      companyDescription: user.companyDescription,
    };
    const accessToken = jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: '2d',
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVATE_KEY, {
      expiresIn: '30d',
    });

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

// app.get('/api/category'),
//   async (req, res) => {
//     try {
//       const { image } = req.body;
//     } catch (e) {
//       console.log(err);
//     }
//   };
const slugify = require('slugify');
app.post('/api/register', async (req, res) => {
  try {
    // console.log(req.body);
    const {
      name,
      email,
      password,
      address1,
      address2,
      address3,
      mobile,
      telephone,
      companyDescription,
    } = req.body;

    if (!(name && email && password && mobile)) {
      return res.status(400).send('All input is required');
    }
    // res.send(req.body);
    const oldUserEmail = await User.findOne({ email });
    const oldUserName = await User.findOne({ name });

    if (oldUserEmail && oldUserName) {
      return res
        .status(409)
        .send(
          'User with this email and name already exists. Please use a different email and/or name.'
        );
    } else if (oldUserEmail) {
      return res
        .status(409)
        .send(
          'User with this email already exists. Please use a different email.'
        );
    } else if (oldUserName) {
      return res
        .status(409)
        .send(
          'User with this name already exists. Please use a different name.'
        );
    }

    const slug = slugify(name, { lower: true });
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      address1,
      address2,
      address3,
      mobile,
      telephone,
      companyDescription,
      slug,
    });
    return res.send(user);
  } catch (err) {
    console.log(err);
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send('All input is required');
    }
    const user = await User.findOne({
      email: email,
    });
    const checkpassword = await bcrypt.compare(password, user.password);
    if (user && checkpassword) {
      const { accessToken, refreshToken } = await generateTokens(user);
      return res.json({
        status: 'ok',
        user: {
          name: user.name,
          email: user.email,
          companyDescription: user.companyDescription,
          slug: user.slug,
          token: accessToken,
          disable: user.disable,

          refreshToken,
        },
      });
    } else {
      return res.json({ error: 'invalid credentials' });
    }
  } catch (error) {
    res.json({ status: 'error', user: false });
  }
});

app.post('/admin/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return res.status(400).send('All input is required');
    }

    const oldAdminEmail = await AdminModel.findOne({ email });

    if (oldAdminEmail) {
      return res.status(409).send('Email already exists');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    return res.status(201).json({
      status: 'ok',
      user: {
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send('All input is required');
    }
    const admin = await AdminModel.findOne({ email });

    if (admin) {
      const checkPassword = await bcrypt.compare(password, admin.password);
      if (checkPassword) {
        const { accessToken, refreshToken } = await generateTokens(admin);

        return res.json({
          status: 'ok',
          user: {
            name: admin.name,
            email: admin.email,
            token: accessToken,
            refreshToken,
          },
        });
      } else {
        return res.json({ error: 'invalid credentials' });
      }
    } else {
      return res.json({ error: 'invalid credentials' });
    }
  } catch (error) {
    res.json({ status: 'error', user: false });
  }
});

// app.post('/admin/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // console.log(req.body);
//     if (!(email && password)) {
//       return res.status(400).send('All input is required');
//     }
//     const user = await AdminModel.findOne({
//       email: email,
//     });

//     if (user) {
//       const { accessToken, refreshToken } = await generateTokens(user);

//       return res.json({
//         status: 'ok',
//         user: {
//           name: user.name,
//           email: user.email,
//           token: accessToken,

//           refreshToken,
//         },
//       });
//     } else {
//       return res.json({ error: 'invalid credentials' });
//     }
//   } catch (error) {
//     res.json({ status: 'error', user: false });
//   }
// });

app.get('/admin/restaurant', async (req, res) => {
  try {
    const user = await User.find();
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/restaurant/disable/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    const isDisabled = user.disable ? !user.disable : true;

    const userDis = await User.updateOne(
      { _id: userId },
      { disable: isDisabled }
    );

    user = await User.findById(userId);

    return res
      .status(200)
      .json({ message: 'Restaurant updated successfully', user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // Step 2:
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server started on 5000');
});
