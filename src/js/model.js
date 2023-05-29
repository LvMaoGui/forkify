import { API_URL } from './config';
import { getJSON } from './helpers';
import { RES_PER_PAGE } from './config';

const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page : 1,
    resultsPerPage : RES_PER_PAGE
  },
};

/**
 * 加载配方
 *  将数据存入state
 * @param {string} id 配方id
 */
const loadRecope = async id => {
  try {
    console.log(`${API_URL}/${id}`);
    const data = await getJSON(`${API_URL}/${id}`);

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
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const loadSearchResults = async query => {
  try {
    state.search.query = query
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

/**
 * 获取搜索结果页面
 * @param {*} page 
 */
const getSearchResultsPage = function(page = state.search.page){
  state.search.page = page
  const start = (page -1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  console.log(state.search.results.slice(start, end));
  return state.search.results.slice(start, end);
}

const updateServings = function(newServings){
  debugger
  state.recipe.ingredients.forEach(ing => {
    // 新的数量 = 旧的数量 * 新的份数 / 旧的份数
    ing.quantity = ing.quantity * newServings / state.recipe.servings
  })

  state.recipe.servings = newServings
}

export { state, loadRecope, loadSearchResults, getSearchResultsPage, updateServings };
