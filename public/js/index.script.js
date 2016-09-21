'use strict';

$(document).ready(() => {

	const ROOT_URL = 'http://jsonplaceholder.typicode.com';

	// reusable handle error function
	const handleError = (label) => {
		return (err) => {
				console.debug(`Error @ ${label}`, err);
		}
	}

	// return an HTML element (as a string) from an article object
	const buildArticleHTML = (article) => {
		return `
			<div class="post-preview" data-article-id="${article.id}">
					<a href="#">
							<h2 class="post-title">
									${article.title}
							</h2>
							<h3 class="post-subtitle">
									Problems look mighty small from 150 miles up
							</h3>
					</a>
					<p class="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 24, 2014</p>
			</div>
			<hr>
		`;
	}

	// load a single article via AJAX `GET` request
	const loadArticle = (article_id, _onLoaded) => {
		$.ajax({
				url: `${ROOT_URL}/posts/${article_id}`,
				method: 'GET'
			})
			.then((article) => {
				console.log(article);
				return article;
			})
			.then((article) => {
				// if there's a callback, invoke it
				if(_onLoaded) _onLoaded(article);
				return false;
			})
			.fail(handleError('loadArticle'));
	}

	// load all articles via AJAX `GET` request, then render them on page
	const loadArticles = () => {
		// an inner function to render all the articles from JSON data
		const renderArticles = (articles) => {
			// fetch the HTML element where we will render articles using jQuery
			const articles_elm = $('#articles');
			// append each article into the element
			articles.forEach((article) => {
				articles_elm.append(buildArticleHTML(article));
			})
		}

		// make the AJAX call to load all the articles from the API
		$.get(`${ROOT_URL}/posts`)
			.then(renderArticles)
			.fail(handleError('loadArticles'));
	}

	// load all comments for a given `article_id`
	const loadArticleComments = (article_id) => {
		$.get(`${ROOT_URL}/posts/${article_id}/coments`)
			.then((comments) => {
				console.log(comments);
			})
			.fail(handleError('loadArticleComments'));
	}

	// create a click listener for any article preview
	$('#articles').on('click', '.post-preview > a', (ev) => {
	  ev.preventDefault();
		const article_id = $(this).parent().attr('data-article-id');
		console.log(`Article #${article_id} has been clicked.`);
	});

	// load more button click listener
	$('#load-more').on('click', (ev) => {
	  ev.preventDefault();
		loadArticles();
	});

	// on page load
	loadArticles();
});
