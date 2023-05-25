import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';


import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    // 获取地址中的哈希值
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner() 
    // 1.加载配方
    await model.loadRecope(id)
    console.log(model.state.recipe)
    const { recipe } = model.state
    // 2.渲染配方

    recipeView.render(recipe)
  } catch (error) {
    recipeView.renderMessage()
  }
};

const controlSearchResults = async function(){
  try{
    // 1.获取查询信息
    const query = searchView.getQuery()
    if(!query) return
    resultsView.renderSpinner()
    // 2.根据查询信息请求数据并存入model的state中
    await model.loadSearchResults(query)
    // 3.渲染结果
    console.log(model.state.search.result)
    resultsView.render(model.state.search.result)


  }catch(error){
    console.error(error.message)
  }
}
controlSearchResults()

// 为窗体的哈希值变化与加载事件 注册监听
const init = function(){
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}
init()

