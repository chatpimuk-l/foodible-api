const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const recipeService = require("../services/recipe-service");
const ingredientService = require("../services/ingredient-service");
const infoService = require("../services/info-service");
const instructionService = require("../services/instruction-service");
const uploadService = require("../services/upload-service");

exports.createRecipe = catchError(async (req, res, err) => {
  console.log("**********tt**", req.body);
  const {
    name,
    description,
    prepTime,
    cookTime,
    serving,
    tip,
    ingredients,
    instructions,
  } = req.body;

  const recipeData = { userId: req.user.id, name: name };
  await recipeService.createRecipe(recipeData);

  const { id } = await recipeService.findRecipeByUserIdAndName(
    req.user.id,
    req.body.name
  );
  console.log("id", id);

  const infoData = {
    recipeId: id,
    description,
    prepTime: +prepTime,
    cookTime: +cookTime,
    serving: +serving,
    tip,
  };
  console.log("***********yyyy");
  if (req.files) {
    console.log("***********");
    console.log("req.file", req.files);
    infoData.image = await uploadService.upload(
      req.files?.recipeImage?.[0].path
    );
  }
  console.log("infoData", infoData);
  await infoService.createInfo(infoData);

  const parsedIngredients = JSON.parse(ingredients);
  for (el of parsedIngredients) {
    console.log("el", el);
    await ingredientService.createIngredient({
      recipeId: id,
      ingredient: el.ingredient,
      amount: +el.amount,
      unit: el.unit,
    });
  }
  console.log("o666o6o66ew6eo66oe666");

  const parsedInstructions = JSON.parse(instructions);
  let count = 0;
  for (el of parsedInstructions) {
    console.log("sdlkfsdel", el);
    if (el.image) {
      console.log("in image el", el.image);
      console.log("req.files.instructionImage?.[count].path", req.files);
      const image = await uploadService.upload(
        req.files.instructionImage?.[count].path
      );
      console.log("777777777");
      await instructionService.createInstruction({
        recipeId: id,
        instruction: el.instruction,
        image: image,
      });
      count += 1;
    } else {
      await instructionService.createInstruction({
        recipeId: id,
        instruction: el.instruction,
      });
    }
  }

  res.status(200).json({ recipe: { id, ...req.body } });
});
