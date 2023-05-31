import { API_URL } from './config';
import { getJSON } from './helpers';
import { RES_PER_PAGE } from './config';

const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

/**
 * 加载配方
 *  将数据存入state
 * @param {string} id 配方id
 */
const loadRecipe = async id => {
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

    if(state.bookmarks.some(bookmark => bookmark.id === id)){
      state.recipe.bookmarked = true
    }else{
      state.recipe.bookmarked = false
    }
    console.log(state.recipe);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const loadSearchResults = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

/**
 * 获取搜索结果页面
 * @param {*} page
 */
const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  console.log(state.search.results.slice(start, end));
  return state.search.results.slice(start, end);
};

const updateServings = function (newServings) {
  debugger;
  state.recipe.ingredients.forEach(ing => {
    // 新的数量 = 旧的数量 * 新的份数 / 旧的份数
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const addBookmark = function (recipe) {
  // 新增书签
  state.bookmarks.push(recipe);

  // 将当前食谱标记为书签
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

const deleteBookmark = function(id){
  // 获取将要删除标记的下标
  const delIndex = state.bookmarks.findIndex(bookmark => bookmark.id === id)
  // 从书签中删除
  state.bookmarks.splice(delIndex ,1)
   // 将当前食谱书签取消标记
   if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
}

export {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  deleteBookmark
};
