const fs = require("fs/promises");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const recipeService = require("../services/recipe-service");
const ingredientService = require("../services/ingredient-service");
const infoService = require("../services/info-service");
const instructionService = require("../services/instruction-service");
const uploadService = require("../services/upload-service");
const validateRecipe = require("../utils/validations/validate-recipe");

exports.createRecipe = catchError(async (req, res, next) => {
  req.body = {
    ...req.body,
    prepTime: +req.body.prepTime,
    cookTime: +req.body.cookTime,
    serving: +req.body.serving,
    ingredients: JSON.parse(req.body.ingredients),
    instructions: JSON.parse(req.body.instructions),
    image: req.body.recipeImage || req.files?.recipeImage,
  };

  validateRecipe(req.body);

  const { name, description, prepTime, cookTime, serving, tip } = req.body;

  console.log("req.body", req.body);
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

  if (req.files?.recipeImage) {
    infoData.image = await uploadService.upload(
      req.files?.recipeImage?.[0].path
    );
  }
  await infoService.createInfo(infoData);

  for (el of req.body.ingredients) {
    await ingredientService.createIngredient({
      recipeId: id,
      ingredient: el.ingredient,
      amount: +el.amount,
      unit: el.unit,
    });
  }

  let count = 0;
  for (el of req.body.instructions) {
    let image = "";
    if (el.image) {
      if (typeof el.image === "string") {
        image = el.image;
      } else {
        image = await uploadService.upload(
          req.files.instructionImage?.[count].path
        );
        fs.unlink(req.files.instructionImage?.[count].path);
        count += 1;
      }

      await instructionService.createInstruction({
        recipeId: id,
        instruction: el.instruction,
        image: image,
      });
    } else {
      await instructionService.createInstruction({
        recipeId: id,
        instruction: el.instruction,
      });
    }
  }

  res.status(201).json({ recipe: { id, ...req.body } });
});

exports.updateRecipe = catchError(async (req, res, next) => {
  req.body = {
    ...req.body,
    prepTime: +req.body.prepTime,
    cookTime: +req.body.cookTime,
    serving: +req.body.serving,
    ingredients: JSON.parse(req.body.ingredients),
    instructions: JSON.parse(req.body.instructions),
    image: req.body.recipeImage || req.files?.recipeImage,
  };

  console.log(567);
  console.log("req.body", req.body);
  validateRecipe(req.body);
  console.log(890);

  const { name, description, prepTime, cookTime, serving, tip } = req.body;

  const recipeId = +req.params.recipeId;

  await recipeService.updateRecipe(recipeId, name);

  const infoData = {
    recipeId: recipeId,
    description,
    prepTime: +prepTime,
    cookTime: +cookTime,
    serving: +serving,
    tip,
  };

  console.log("req.files.recipeImage", req.files.recipeImage);
  console.log(111);
  if (req.files?.recipeImage) {
    console.log(222);
    infoData.image = await uploadService.upload(
      req.files?.recipeImage?.[0].path
    );
    fs.unlink(req.files?.recipeImage?.[0].path);
  }
  await infoService.updateInfo(recipeId, infoData);

  await ingredientService.deleteIngredient(recipeId);
  for (el of req.body.ingredients) {
    await ingredientService.createIngredient({
      recipeId: recipeId,
      ingredient: el.ingredient,
      amount: +el.amount,
      unit: el.unit,
    });
  }

  await instructionService.deleteInstruction(recipeId);
  let count = 0;
  for (el of req.body.instructions) {
    let image = "";
    if (el.image) {
      if (typeof el.image === "string") {
        image = el.image;
      } else {
        image = await uploadService.upload(
          req.files.instructionImage?.[count].path
        );
        fs.unlink(req.files.instructionImage?.[count].path);
        count += 1;
      }

      await instructionService.createInstruction({
        recipeId: recipeId,
        instruction: el.instruction,
        image: image,
      });
    } else {
      await instructionService.createInstruction({
        recipeId: recipeId,
        instruction: el.instruction,
      });
    }
  }

  res.status(201).json({ recipe: { id: recipeId, ...req.body } });
});

exports.deleteRecipe = catchError(async (req, res, next) => {
  const recipeId = +req.params.recipeId;
  const deletedRecipe = await recipeService.deleteRecipe(recipeId);
  res.status(204).json({ deletedRecipe });
});

exports.getRecipes = catchError(async (req, res, next) => {
  if (req.query.name && !req.query.include) {
    const recipes = await recipeService.findRecipesByRecipeName(req.query.name);
    console.log("searching recipes name");
    return res.status(200).json({ recipes });
  }
  if (!req.query.name && req.query.include) {
    const include = JSON.parse(req.query.include);
    const recipes = await recipeService.findRecipesByInclude(include);
    console.log("searching recipes inclue");
    console.log("req.query.include", req.query.include);
    return res.status(200).json({ recipes });
  }
  const recipes = await recipeService.findRecipes();
  console.log("getRecipes");
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
