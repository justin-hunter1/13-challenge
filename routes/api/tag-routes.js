const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
// find all tags
// be sure to include its associated Product data
  try {
    console.log("==Get all Tag and linked Product==");
    const tagData = await Tag.findAll({
      include: [ { model: Product, attributes: ["id", "product_name", "price", "stock"] } ]
    });
    res.status(200)
       .json(tagData);
  }
  catch (err) {
      console.log(err);
      res.status(500)
         .json(err);
  };
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    console.log("==Get single Product and linked Category and Tag==");
      const tagData = await Product.findByPk(req.params.id, { 
        include: [ { model: Product, attributes: ["id", "product_name", "price", "stock"] } ]
      });
      if (!tagData) {
        res.status(404)
           .json({ message: "No Tags found with that id." });
        return;
      }
      res.status(200)
         .json(tagData);
    }
    catch (err) {
      console.log(err);
      res.status(500)
         .json(err);
    };
});

router.post("/", async (req, res) => {
  // create a new tag
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
