'use strict';

function titleClickHandler(event){
  event.preventDefault();   
  const clickedElement = this;  
  console.log('Link was clicked!');
  console.log('event', event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  console.log('acitveLinks', activeLinks);
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle); 
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const  titleList = document.querySelector(optTitleListSelector);
const optArticleTagsSelector = '.post-tags .list';
function generateTitleLinks(customSelector = ''){
 
  /* remove contents of titleList */
  function clearMessages(){
	document.querySelector('.sidebar .titles').innerHTML = '';
    }
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('customSelector', customSelector); 
    console.log('articles', articles);
    let html = ''; 
      /* get the article id */
      for(let article of articles){
      /* find the title element */
      const articleId = article.getAttribute('id');
      console.log('articleId', articleId);
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;        
      console.log('articleTitle', articleTitle);
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML', linkHTML);
      /* insert link into titleList */
      html = html + linkHTML;    
      }
    /* titleList.insertAdjacentHTML('beforeend', linkHTML); */
    titleList.innerHTML = html;  
}


generateTitleLinks()

const links = document.querySelectorAll('.titles a');
console.log('links', links);

  for(let link of links){
  link.addEventListener('click', titleClickHandler);
  }

  function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
    for(let article of articles){
    /* find tags wrapper */
    const articleTagWrapper = article.querySelector(optArticleTagsSelector);
    console.log('articleTagWrapper', articleTagWrapper);
    /* make html variable with empty string */
     let html = ''; 
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);
    /* START LOOP: for each tag */
      for(let articleTag of articleTagsArray){
      /* generate HTML of the link FIXED WITH A.I. #tag*/
      const linkHTML = '<li><a href="#tag-' + articleTag + '">' + articleTag + '</a></li>';
      console.log('linkHTML', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML
    /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
  articleTagWrapper.innerHTML = html; 
  /* END LOOP: for every article: */
    }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag', tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('.post-tags a.active');
  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
    /* remove class active */
        activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for(let allTagLink of allTagsLinks){
    /* add class active */
      allTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
 


function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
    for(let link of links){
    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
    }
}

addClickListenersToTags();

const optArticleAuthorSelector = '.data-author';
function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find authors wrapper */
    const articleAuthorsWrapper = article.querySelector('.post-author');
    /* get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor', articleAuthor);
    /* generate HTML of the link */ /* skopiowane z poprzedniej wersji */
    const linkHTML = '<a href="#" data-author="' + articleAuthor + '">' + articleAuthor + '</a>';
    console.log('linkHTML', linkHTML);
    /* add generated code to html variable */
    articleAuthorsWrapper.innerHTML = linkHTML;
  }
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const dataAuthor = clickedElement.getAttribute('data-author'); 
  console.log('dataAuthor', dataAuthor);
  const activeAuthors = document.querySelectorAll('.post-author a.active');
      for (let activeAuthor of activeAuthors){
        activeAuthor.classList.remove('active');
      }
  clickedElement.classList.add('active');
  generateTitleLinks('[data-author="' + dataAuthor + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('.post-author a');
    for (let link of authorLinks){
      link.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthors();