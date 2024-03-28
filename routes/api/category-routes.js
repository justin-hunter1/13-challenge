const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    console.log("==Get all Category and linked Product==");
    const catData = await Category.findAll({
      include: [ { model: Product, attributes: ["id", "product_name", "price", "stock"] } ]
    });
    res.status(200)
       .json(catData);
  }
  catch (err) {
      console.log(err);
      res.status(500)
         .json(err);
  };
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    console.log("==Get single Category and linked Category and Tag==");
      const catData = await Product.findByPk(req.params.id, { 
        include: [ { model: Product, attributes: ["id", "product_name", "price", "stock"] } ]
      });
      if (!catData) {
        res.status(404)
           .json({ message: "No Category found with that id." });
        return;
      }
      res.status(200)
         .json(catData);
    }
    catch (err) {
      console.log(err);
      res.status(500)
         .json(err);
    };
});

router.post("/", async (req, res) => {
  // create a new category
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    console.log("==Delete a Category==");
      const catData = await Product.destroy({ 
        where: { id: req.params.id }
      });
      if (!catData) {
        res.status(404)
           .json({ message: "No Category with that id is found." });
        return;
      }
      res.status(200)
         .json(catData);
    }
    catch (err) {
      console.log(err);
      res.status(500)
         .json(err);
    };
});

module.exports = router;