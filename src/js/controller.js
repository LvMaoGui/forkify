import model from './model';
import recipeView from './views/recipeView';


import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
  try {
    // 获取地址中的哈希值
    const id = window.location.hash.slice(1) || "5ed6604591c37cdc054bc886";
    if(!id) return;
    recipeView.renderSpinner() 
    // 1.加载配方
    await model.loadRecope(id)
    console.log(model.state.recipe)
    const { recipe } = model.state
    // 2.渲染配方

    recipeView.render(recipe)
  } catch (error) {
    console.error(error.message);
  }
};

// 为窗体的哈希值变化与加载事件 注册监听
['hashchange','load'].forEach(ev => window.addEventListener(ev,controlRecipes))

