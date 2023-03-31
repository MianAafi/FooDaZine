const mongoose = require('mongoose'),
  express = require('express'),
  auth = require('../middleware/auth');
router = express.Router();
const cloudinary = require('cloudinary').v2;
var ObjectID = require('mongodb').ObjectId;

const Setting = require('../models/setting');
const Company = require('../models/userModel');

router.route('/api/setting').post(auth, (req, res, next) => {
  const file = req.files.image;
  const { user_id } = req.user;
  const image = cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'test',
  });
  image
    .then(async (data) => {
      const img = { public_id: data.public_id, url: data.url };
      const userSetting = await Setting.findOne({ user_id });
      if (userSetting) {
        const update = { Coverimage: img };

        await userSetting.updateOne(update);
      } else {
        const createSetting = await Setting.create({
          user_id,
          Coverimage: img,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/api/setting/logo').post(auth, (req, res, next) => {
  const file = req.files.image;
  const { user_id } = req.user;
  const image = cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'test',
  });
  image
    .then(async (data) => {
      const img = { public_id: data.public_id, url: data.url };
      const userSetting = await Setting.findOne({ user_id });
      if (userSetting) {
        const update = { Logoimage: img };

        await userSetting.updateOne(update);
      } else {
        const createSetting = await Setting.create({
          user_id,
          Logoimage: img,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/api/setting/logo').get(auth, async (req, res, next) => {
  const { user_id } = req.user;
  console.log(user_id);
  try {
    const userSetting = await Setting.findOne({ user_id });
    return res.send(userSetting);
  } catch (error) {
    return res.send(error);
  }
});

router.route('/api/description').post(auth, async (req, res, next) => {
  const { user_id } = req.user;
  const { description } = req.body;
  // console.log(description);
  try {
    const userSetting = await Company.updateOne(
      {
        _id: user_id,
      },
      { companyDescription: description }
    );
    return res.send(userSetting);
  } catch (error) {
    return res.send(error);
  }
});

// router.route('/api/name').put(auth, async (req, res, next) => {
//   const { user_id } = req.user;
//   const { name } = req.body;
//   try {
//     const userSetting = await Company.updateOne(
//       {
//         _id: user_id,
//       },
//       { name: name }
//     );
//     return res.send(userSetting);
//   } catch (error) {
//     return res.send(error);
//   }
// });

const slugify = require('slugify');

router.route('/api/name').put(auth, async (req, res, next) => {
  const { user_id } = req.user;
  const { name } = req.body;
  try {
    // Retrieve the user's existing slug from the database
    const user = await Company.findById(user_id);
    let { slug } = user;

    // Generate a new slug based on the updated name
    const newSlug = slugify(name, { lower: true });
    if (newSlug !== slug) {
      // Only update the slug if it has changed
      slug = newSlug;
    }

    // Update the user's name and slug in the database
    const userSetting = await Company.updateOne(
      {
        _id: user_id,
      },
      { name: name, slug: slug }
    );
    return res.send(userSetting);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
