const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const recipeService = require("../services/recipe-service");
const ingredientService = require("../services/ingredient-service");
const infoService = require("../services/info-service");
const instructionService = require("../services/instruction-service");
const uploadService = require("../services/upload-service");

exports.createRecipe = catchError(async (req, res, next) => {
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

  const infoData = {
    recipeId: id,
    description,
    prepTime: +prepTime,
    cookTime: +cookTime,
    serving: +serving,
    tip,
  };

  if (req.files) {
    infoData.image = await uploadService.upload(
      req.files?.recipeImage?.[0].path
    );
  }
  await infoService.createInfo(infoData);

  const parsedIngredients = JSON.parse(ingredients);
  for (el of parsedIngredients) {
    await ingredientService.createIngredient({
      recipeId: id,
      ingredient: el.ingredient,
      amount: +el.amount,
      unit: el.unit,
    });
  }

  const parsedInstructions = JSON.parse(instructions);
  let count = 0;
  for (el of parsedInstructions) {
    if (el.image) {
      const image = await uploadService.upload(
        req.files.instructionImage?.[count].path
      );
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

exports.getRecipes = catchError(async (req, res, next) => {
  const recipes = await recipeService.findRecipes();
  res.status(200).json({ recipes });
});

exports.getRecipeByRecipeId = catchError(async (req, res, next) => {
  const recipe = await recipeService.findRecipeByRecipeId(req.params.recipeId);
  res.status(200).json({ recipe });
});

exports.getRecipeByUserId = catchError(async (req, res, next) => {
  const recipes = await recipeService.findRecipesByUserId(req.params.userId);
  res.status(200).json({ recipes });
});
