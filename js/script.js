'use strict';
let templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink:  Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
   authorLink:  Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
   tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
   authorsLinkSidebar: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML),
}
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
 const optCloudClassCount = '5' ;
 const optCloudClassPrefix = 'tag-size';
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
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHTML', linkHTML);
      /* insert link into titleList */
      html = html + linkHTML;    
      }
    /* titleList.insertAdjacentHTML('beforeend', linkHTML); */
    titleList.innerHTML = html;  
    const links = document.querySelectorAll('.titles a');

  for(let link of links){
  link.addEventListener('click', titleClickHandler);
  }
}


generateTitleLinks()

const optTagsListSelector = ('.tags.list');


  function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
      const linkHTMLData = {id: 'tag-' + articleTag, title: articleTag};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHTML', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(articleTag)){
        /* [NEW] add tag to allTags object */
        allTags[articleTag] = 1;
      }else {
        allTags[articleTag]++;
      }
    /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
  articleTagWrapper.innerHTML = html; 
  /* END LOOP: for every article: */
    }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams', tagsParams);
/* [NEW] create variable for all links HTML code */
const allTagsData = {tags: []};
/* [NEW] START LOOP: for each tag in allTags: */
  for(let articleTag in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML */
   allTagsData.tags.push({
  articleTag: articleTag,
  count: allTags[articleTag],
  className: calculateTagsClass(allTags[articleTag], tagsParams)
});
  /* <a href=
/* [NEW] END LOOP: for each tag in allTags: */
  }
/*[NEW] add html from allTagsHTML to tagList */
tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
const params = {
  max: 0,
  min: 999999,
}
  function calculateTagsParams(allTags){
      for(let tag in allTags){
      console.log(tag + ' is used ' + allTags[tag] + ' times');
        if(allTags[tag] > params.max){
        params.max = allTags[tag];
        }
        if(allTags[tag] < params.min){
        params.min = allTags[tag];
        }
        
       /* alternative with function Math 
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);
        */
       
      }
      return params;
      console.log('params:', params); 
}
function calculateTagsClass(count, params){  

const normalizedCount = count - params.min; 
const normalizedMax = params.max - params.min; 
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

return optCloudClassPrefix + classNumber; 
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
const optAuthorsListSelector = '.list.authors';

function generateAuthors(){
  let allAuthors = {};  
  console.log('allAuthors', allAuthors);
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find authors wrapper */
    const articleAuthorsWrapper = article.querySelector('.post-author');
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor', articleAuthor);
    /* generate HTML of the link */ /* skopiowane z poprzedniej wersji */
    /* const linkHTML = '<a href="#" data-author="' + articleAuthor + '">' + articleAuthor + '</a>'; */
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log('linkHTML', linkHTML);
    /* add generated code to html variable */
    articleAuthorsWrapper.innerHTML = linkHTML;
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    }else {
      allAuthors[articleAuthor]++;
    }
  }
  const authorsList = document.querySelector(optAuthorsListSelector); /* na to wrzucam HTML z cyferka */
  console.log('authorList', authorsList);
  /* let allAuthorsHTML = ''; */ const allAuthorsData = {authors: []};
  for(let articleAuthor in allAuthors){
   /*  allAuthorsHTML += '<li><a href="#data-author-' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ')</a></li>'; */
    /* allAuthorsHTML +='<li><a href="#' + '" data-author="' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ')</a></li>'; */
    allAuthorsData.authors.push({
  articleAuthor: articleAuthor,
  count: allAuthors[articleAuthor],
});
  }
    authorsList.innerHTML = templates.authorsLinkSidebar(allAuthorsData);
    console.log('allAuthorsData', allAuthorsData);

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
  const authorLinks = document.querySelectorAll('a[data-author]');
    for (let link of authorLinks){
      link.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthors();

/* pozniej do autorow  allTagsHTML += '<li><a href="#tag-' + articleTag + '">' + articleTag + ' (' + allTags[articleTag] + ')</a></li>'; */