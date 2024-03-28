const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
// find all tags
// be sure to include its associated Product data
  try {
    console.log("==Get all Tags and linked Product==");
    const tagData = await Tag.findAll({
      order: [ "id" ],
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
    console.log("==Get single Tag and linked Product==");
    const tagData = await Tag.findByPk(req.params.id, { 
      include: [ { model: Product, attributes: ["id", "product_name", "price", "stock"], order: [ "id" ] } ]
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
  try {
    console.log("==Create a New Tag==");
    const tagData = Tag.create({ 
      tag_name: req.body.tag_name
    });
    res.status(200)
       .json([tagData, { message: "Tag has been added." }]);
  }
  catch {
    console.log(err)
    res.status(500)
       .json(err)
  };
});

router.put("/:id", async (req, res) => {
  // update a tag by its `id` value
  try {
    console.log("==Update an existing Tag==");
    const tagData = await Tag.update(req.body.tag_name, { 
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404)
         .json({ message: "No Tag with that id is found." });
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

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    console.log("==Delete Tag==");
    const tagData = await Tag.destroy({ 
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404)
         .json({ message: "No Category with that id is found." });
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

module.exports = router;
