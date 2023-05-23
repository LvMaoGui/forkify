import { API_URL } from "./config";
import { getJSON } from "./helpers";

const state = {
  recipe: {},
};

/**
 * 加载配方
 *  将数据存入state
 * @param {string} id 配方id
 *
 */
const loadRecope = async id => {
  try{
    console.log(`${API_URL}/${id}`);
    const data = await getJSON(`${API_URL}/${id}`)
  
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch(error){
    console.error(error.message)
  }
 
};

export { state, loadRecope };
