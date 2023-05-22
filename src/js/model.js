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
    const result = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
  
    const data = await result.json();
  
    if (!result.ok) throw new Error(`${data.message}`);
  
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
    alert(error.message)
  }
 
};

const model = {
  state,
  loadRecope,
};

export default model;
