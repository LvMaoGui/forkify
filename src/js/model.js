import { API_URL, KEY, RES_PER_PAGE } from './config';
import { AJAX } from './helpers';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function(data){
  const { recipe } = data.data;
  return  {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key})
  };
}

/**
 * 加载配方
 *  将数据存入state
 * @param {string} id 配方id
 */
const loadRecipe = async id => {
  try {
    console.log(`${API_URL}/${id}`);
    const data = await AJAX(`${API_URL}/${id}`);

    state.recipe = createRecipeObject(data)

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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {key: rec.key})
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

const persistBookmarks = function(){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}

const addBookmark = function (recipe) {
  // 新增书签
  state.bookmarks.push(recipe);

  // 将当前食谱标记为书签
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks()
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

  persistBookmarks()
}

const clearBookmarks = function(){
  localStorage.clear('bookmarks')
}

const init = function(){
  const storage = localStorage.getItem('bookmarks')
  if(!storage) return
  state.bookmarks = JSON.parse(storage)
} 

const uploadRecipe = async function(newRecipe){
  try{
    const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      // const ingArr = ing[1].replaceAll(' ','').split(',');
      const ingArr = ing[1].split(',').map(el => el.trim())
      if(ingArr.length !== 3) 
        throw new Error(
          'Wrong ingredient format! Please use correct format :)'
        );
      
      const [quantity, unit, description] = ingArr
      return {
        quantity: quantity ? +quantity : null,
        unit,
        description 
      }
    })
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    }

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)

    state.recipe = createRecipeObject(data);
    // 将用户自己添加的食谱 加入到收藏食谱中
    addBookmark(state.recipe)
    console.log(data)
  }catch(error){
    throw error
  }



}

init()

export {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  deleteBookmark,
  uploadRecipe
};
