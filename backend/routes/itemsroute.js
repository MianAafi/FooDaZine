const { response, json } = require('express');
const mongoose = require('mongoose'),
  express = require('express'),
  auth = require('../middleware/auth');
router = express.Router();
const cloudinary = require('cloudinary').v2;
var ObjectID = require('mongodb').ObjectId;

const Items = require('../models/itemsmodel');

router.route('/api/image').post(auth, (req, res, next) => {
  const file = req.files.image;
  const { user_id } = req.user;
  const image = cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'gallery',
  });
  image.then(async (data) => {
    const img = { public_id: data.public_id, url: data.url };

    return res.send(img);
  });
});
// router.route('/api/image/delete').post(async (req, res, next) => {
//   const { public_id, items_id } = req.body;
//   const item = await Items.findOne({ _id: items_id });
//   const value = item.gallery.filter((item) => item[0].public_id !== public_id);
//   console.log(value);
//   console.log(item);

//   console.log(public_id, items_id);
//   const publicId = `gallery/${public_id}`;
//   cloudinary.uploader.destroy(publicId, function (error, result) {
//     console.log(result, error);
//   });
// });
router.route('/api/image/delete').post(async (req, res, next) => {
  const { public_id, items_id } = req.body;
  const item = await Items.findOne({ _id: items_id });
  const publicId = `gallery/${public_id}`;
  cloudinary.uploader.destroy(publicId, function (error, result) {
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Failed to delete image from Cloudinary' });
    }
    const updatedGallery = item.gallery.filter(
      (item) => item[0].public_id !== public_id
    );
    Items.updateOne(
      { _id: items_id },
      { gallery: updatedGallery },
      async function (err, result) {
        const item = await Items.findOne({ _id: items_id });
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ message: 'Failed to delete image from database' });
        }
        res.json(item);
      }
    );
  });
});

router.route('/api/items').post(auth, (req, res, next) => {
  try {
    const file = req.files.image;

    const { Name, price, category_id, ingredients, description, gallery } =
      req.body;

    const { user_id } = req.user;
    const featuredImage = cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'test',
    });
    featuredImage.then(async (gfeaturedImage) => {
      const img = {
        public_id: gfeaturedImage.public_id,
        url: gfeaturedImage.url,
      };
      const createItem = await Items.create({
        user_id,
        gfeaturedImage,
        Name,
        price,
        ingredients,
        description,
        image: img,
        gallery: JSON.parse(gallery),
        category_id,
      });
      return res.send(createItem);
    });
    // const featuredImage = cloudinary.uploader.upload(file.tempFilePath, {
    //   folder: 'test',
    // });
    // featuredImage.then(async (gfeaturedImage) => {
    //   const img = {
    //     public_id: gfeaturedImage.public_id,
    //     url: gfeaturedImage.url,
    //   };
    //   let imagesBuffer = [];
    //   for (let i = 0; i < images.length; i++) {
    //     const result = cloudinary.uploader.upload(images[i], {
    //       folder: 'gallery',
    //       width: 500,
    //       crop: 'scale',
    //     });

    //     imagesBuffer.push(result);
    //   }
    //   Promise.all(imagesBuffer)
    //     .then(async (data) => {
    //       const uploadimages = [];
    //       data.forEach((image) => {
    //         uploadimages.push({ public_id: image.public_id, url: image.url });
    //       });
    //       const createItem = await Items.create({
    //         user_id,
    //         gfeaturedImage,
    //         Name,
    //         price,
    //         ingredients,
    //         description,
    //         image: img,
    //         gallery: uploadimages,
    //         category_id,
    //       });
    //       return res.send(createItem);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });
  } catch (error) {}
});

// READ Students
router.route('/api/items').get((req, res) => {
  Items.find((error, data) => {
    if (error) {
      console.log('error');
      return next(error);
    } else {
      res.json(data);
      console.log('resp');
    }
  });
});

router.route('/api/items/:id').get((req, res) => {
  Items.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// router.route('/api/items/:id').put((req, res, next) => {
//   console.log(req.body);
//   Items.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body,
//     },
//     (error, data) => {
//       if (error) {
//         return next(error);
//         console.log(error);
//       } else {
//         res.json(data);
//         console.log('Item updated successfully !');
//       }
//     }
//   );
// });

router.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      price,
      image,
      image_id,
      ingredients,
      description,
      category_id,
      gallery,
    } = req.body;
    const parsedGallery = JSON.parse(gallery);
    console.log(parsedGallery.length);
    const item = await Items.findOneAndUpdate(
      { _id: id },
      {
        Name,
        price,
        image: { url: image, public_id: image_id },
        ingredients,
        description,
        category_id,
        gallery: parsedGallery,
      },
      { new: true }
    );
    res.json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.route('/api/items/:id').delete(async (req, res, next) => {
  console.log(req.params.id);
  Items.findOneAndDelete(new ObjectID(req.params.id), (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
module.exports = router;
