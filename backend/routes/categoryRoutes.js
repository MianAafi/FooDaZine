const mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router(),
  auth = require('../middleware/auth'),
  app = express();

const { response } = require('express');
const Category = require('../models/categorymodel');
const ItemModal = require('../models/itemsmodel');
const User = require('../models/userModel');
const Setting = require('../models/setting');

const correctAsync500ms = (user) => {
  return new Promise(async (resolve) => {
    const products = await ItemModal.find({
      user_id: user,
    });
    resolve(products);
  });
};

const correctAsync100ms = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 100, 'correct100msResult');
  });
};

router.route('/api/category').post(auth, (req, res, next) => {
  const { user_id } = req.user;
  const { Category_name } = req.body;
  Category.create({ Category_name, user_id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ
router.route('/api/category').get(auth, async (req, res) => {
  try {
    const itemsproduct = await correctAsync500ms(req.user.user_id);
    const categories = await Category.find({
      user_id: req.user.user_id,
    });
    const allitems = [];
    categories.forEach((element) => {
      let pusitem = {
        Category_name: element.Category_name,
        _id: element._id,
        disable: element.disable,
        items: [],
      };
      itemsproduct.forEach((element1) => {
        if (element1.category_id.equals(element._id)) {
          pusitem.items.push(element1);
        }
      });
      allitems.push(pusitem);
      pusitem = {
        Category_name: element.Category_name,
        items: [],
      };
    });
    res.send(allitems);
  } catch (error) {
    res.send(error);
  }
});

router.route('/api/category/:id').get((req, res) => {
  Category.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route('/api/category/:id').put((req, res, next) => {
  console.log(req.body);
  Category.findByIdAndUpdate(
    req.params.id,
    {
      Category_name: req.body.Category_name,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log('Item updated successfully !');
      }
    }
  );
});

router.route('/api/category/disable/:id').put(async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    let category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const isDisabled = category.disable ? !category.disable : true;

    const categoryDis = await Category.updateOne(
      { _id: categoryId },
      { disable: isDisabled }
    );
    category = await Category.findById(categoryId);

    return res
      .status(200)
      .json({ message: 'Category updated successfully', category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.route('/api/:slug').get(async (req, res) => {
  try {
    const slug = req.params.slug;

    const allModel = await User.findOne({
      slug: slug,
    });

    const allCategories = await Category.find({
      user_id: allModel._id,
      disable: false,
    });

    const allSetting = await Setting.findOne({
      user_id: allModel._id,
    });

    const itemsproduct = await correctAsync500ms(allModel._id);
    const allitems = [];
    allCategories.forEach((element) => {
      let pusitem = {
        Category_name: element.Category_name,
        _id: element._id,
        disable: element.disable,
        items: [],
      };

      itemsproduct.forEach((element1) => {
        if (element1.category_id.equals(element._id)) {
          pusitem.items.push(element1);
        }
      });
      allitems.push(pusitem);
      pusitem = {
        Category_name: element.Category_name,
        items: [],
      };
    });
    res.send({ allitems, user: allModel, settings: allSetting });
  } catch (error) {
    res.send(error);
  }
});

router.route('/api/category/:id').delete(async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const items = await ItemModal.deleteMany({ category_id: categoryId });
    await Category.deleteOne({ _id: categoryId });
    return res.send({ status: true, msg: 'successfully deleted' });
  } catch (error) {
    return res.send({ status: false, msg: 'something bad happened' });
  }
});

module.exports = router;
