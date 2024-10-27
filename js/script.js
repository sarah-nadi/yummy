// HTML elements

var categoryContainer=document.querySelector(".categoryContainer");
var areaContainer = document.querySelector(".areaContainer");
var ingreContainer =document.querySelector(".ingreContainer");
var filterCategoryContainer  =document.querySelector(".filterCategoryContainer ");
var filterAreaContainer  =document.querySelector(".filterAreaContainer");
var filterIngreContainer  =document.querySelector(".filterIngreContainer");
var nameInput= document.querySelector(".nameInput");
var emailInput= document.querySelector(".emailInput");
var phoneInput= document.querySelector(".phoneInput");
var ageInput= document.querySelector(".ageInput");
var passwordInput= document.querySelector(".passwordInput");
var repassInput= document.querySelector(".repassInput");
var searchContainer= document.querySelector(".searchContainer");
var searchInput= document.querySelector(".searchInput");
var mealsContainer= document.querySelector(".mealsContainer");




$(".open").on("click",function(){
    $(".side-content").animate({width:"85%"} , 800)
    $(".close").css("display","block");
    $(".open").css("display","none");
    $(".side-content ul li").addClass("block")
       





})
$(".close").on("click",function(){
    $(".side-content").animate({width: "0%"} , 700);
    $(".open").css("display","block");
    $(".close").css("display","none");
    $(".side-content ul li").removeClass("block")



})
$(document).on("click", ".search", function(){
    window.location.href = "../html/search.html";
});
$(document).on("click", ".categories", function(){
    window.location.href = "../html/categories.html";
});

$(document).on("click", ".area", function(){
    window.location.href = "../html/area.html";
});

$(document).on("click", ".contact", function(){
    window.location.href = "../html/contact.html";
});

$(document).on("click", ".ingredients", function(){
    window.location.href = "../html/ingredients.html";
});





//Variables

var nameRegex= /^[a-zA-Z\s]+$/
var emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
var phoneRegex= /^01[0125][0-9]{8}$/
var ageRegex = /^\d{1,3}$/
var passwordRegex = /^[a-z]{8,}$/



// Functions


function validate(regex,element){
    if(regex.test(element.value)){
        element.parentElement.nextElementSibling.querySelector("p").classList.add("d-none");
        localStorage.setItem("userPassword" , passwordInput.value);

        return true;
    }
    

    element.parentElement.nextElementSibling.querySelector("p").classList.remove("d-none");
    
    return false;

}

function repass(){
    if(repassInput.value === localStorage.getItem("userPassword")){
        element.parentElement.nextElementSibling.querySelector("p").classList.add("d-none")

    }
    else{
        element.parentElement.nextElementSibling.querySelector("p").classList.remove("d-none");


    }

}






async function serachByMeal(value){
    var response =await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    var data = await response.json();
    console.log(data);

    


}
serachByMeal()

function displaySearchByMeal(arr){
    for(var i =0 ; i<arr.length ; i++){
        if(arr[i].strMeal.includes(searchInput.value)){
            searchContainer.innerHTML+=`
                    <div >
                        <img class=" img w-100 rounded-2" src=${arr[i].strMealThumb} alt="">
    
                    </div>
                    <div class="overlay position-absolute  w-100 h-100 rounded-2 text-center pt-3">
                        <p class="ps-3 h3">${arr[i].strMeal}</p>
                        
                    </div>
                           `

    }

        }
        
}




async function getMeals(){
    var response =await fetch ('https://www.themealdb.com/api/json/v1/1/categories.php');
    var data = await response.json();
    console.log(data);
    displayMeals(data.categories)
    


}
getMeals()


function displayMeals (arr){
    for (var i = 0 ; i< arr.length ; i++){
        var category = arr[i].strCategory;
        mealsContainer.innerHTML+= `
         <div onclick="showCategory('${category}')" class="item col-md-3 position-relative  overflow-hidden M-3">
                    <div >
                        <img class=" img w-100 rounded-2" src=${arr[i].strCategoryThumb} alt="">
    
                    </div>
                    <div class="overlay position-absolute  w-100 h-100 rounded-2 text-center pt-3">
                        <p class="ps-3 h3">${arr[i].strCategory}</p>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
    
                </div>`
    }
}


async function getCategories(){
    var response =await fetch ('https://www.themealdb.com/api/json/v1/1/categories.php');
    var data = await response.json();
    console.log(data);
    displayCategories(data.categories)
    


}
getCategories()


function showCategory(category){
    localStorage.setItem('selectedCategory',category);
    window.location.href="/html/filtercat.html";
}

function displayCategories (arr){
    for (var i = 0 ; i< arr.length ; i++){
        var category = arr[i].strCategory;
        categoryContainer.innerHTML+= `
         <div onclick="showCategory('${category}')" class="item col-md-3 position-relative  overflow-hidden M-3">
                    <div >
                        <img class=" img w-100 rounded-2" src=${arr[i].strCategoryThumb} alt="">
    
                    </div>
                    <div class="overlay position-absolute  w-100 h-100 rounded-2 text-center pt-3">
                        <p class="ps-3 h3">${arr[i].strCategory}</p>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
    
                </div>`
    }
}




async function getArea(){
    var response =await fetch ('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    var data = await response.json();
    console.log(data);
    displayArea(data.meals)
    


}
getArea();

function showArea(area){
    localStorage.setItem('selectedArea',area);
    window.location.href='/html/filtearea.html';

}

function displayArea(arr){
    for(var i = 0 ; i < arr.length ; i++){
        var area = arr[i].strArea;
        areaContainer.innerHTML+=`
         <div onclick="showArea('${area}')" class="col-md-3 text-center text-white pointer my-4">
                    <i  class="fa-solid fa-house-laptop"></i>
                    <p class="h2" >${arr[i].strArea}</p>
                </div>`
        

    }

}



function loadFilterCategory(){
    const category = localStorage.getItem('selectedCategory');
    if (category){
        getFilterCategory(category);
    }
}

async function getIngredients(){
    var response =await fetch ('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    var data = await response.json();
    console.log(data);
    displayIngre(data.meals)
    


}
getIngredients()

function showIngre(ingre){
    localStorage.setItem('selectedIngre',ingre);
    window.location.href='/html/filterIngre.html';

}

function loadFilterIngre(){
    const ingre = localStorage.getItem('selectedIngre');
    if (ingre){
        getFilterIngre(ingre);
    }
}
function displayIngre(arr){
    for (var i =0 ; i < 20 ;i++){
        let description = arr[i].strDescription.split(" ");
        let shortDescription = description.slice(0, 20).join(" ");
        let ingre = arr[i].strIngredient;
        ingreContainer.innerHTML+=`
        <div onclick="showIngre('${ingre}')" class="col-md-3 text-center text-white pointer">
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    <p >${shortDescription}</p>
                </div>`


    }
}

async function  getFilterIngre(ingre){
    var response =await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingre}`);
    var data = await response.json();
    console.log(data);
    displayFilterIngre(data.meals)
    


}




function displayFilterIngre(arr){
    for (var i =0 ; i < arr.length ; i++){
        filterIngreContainer.innerHTML+=`
        <div class="item col-md-3 position-relative  overflow-hidden my-3">
                    <div >
                        <img class=" img w-100 rounded-2" src=${arr[i].strMealThumb} alt="">
    
                    </div>
                    <div class="overlay position-absolute  w-100 h-100 rounded-2 text-center pt-3">
                        <p class="ps-3 h3">${arr[i].strMeal}</p>
                        
                    </div>
    `
    }
}

document.addEventListener('DOMContentLoaded',loadFilterIngre)



async function  getFilterCategory(category){
    var response =await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    var data = await response.json();
    console.log(data);
    displayFilterCategory(data.meals)
    


}


function displayFilterCategory(arr){
    for (var i = 0 ; i < 20 ; i++){
        filterCategoryContainer.innerHTML+=`
                <div class="item col-md-3 position-relative  overflow-hidden my-3">
                    <div >
                        <img class=" img w-100 rounded-2" src=${arr[i].strMealThumb} alt="">
    
                    </div>
                    <div class="overlay position-absolute  w-100 h-100 rounded-2 text-center pt-3">
                        <p class="ps-3 h3">${arr[i].strMeal}</p>
                        
                    </div>
    
                </div>
        `
    }



    }
document.addEventListener('DOMContentLoaded',loadFilterCategory);






async function  getFilterArea(area){
    var response =await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    var data = await response.json();
    console.log(data);
    displayFilterArea(data.meals)
    


}



function displayFilterArea(arr){
    for (var i = 0 ; i <20 ; i++){
        filterAreaContainer.innerHTML+=`
        <div class="item col-md-3 position-relative  overflow-hidden my-3">
                    <div >
                        <img class=" img w-100 rounded-2" src=${arr[i].strMealThumb} alt="">
    
                    </div>
                    <div class="overlay position-absolute  w-100 h-100 rounded-2 text-center pt-3">
                        <p class="ps-3 h3">${arr[i].strMeal}</p>
                        
                    </div>
    
                </div>
        
        `

    }
}

function loadFilterArea(){
    const area= localStorage.getItem('selectedArea');
    if(area){
        getFilterArea(area)
    }
}
document.addEventListener('DOMContentLoaded',loadFilterArea)







// Events

