'use strict';

$(document).ready(() => {

		const ROOT_URL = 'http://jsonplaceholder.typicode.com';
		let article_load_counter = 0;

		const handleError = (method) => {
			return (err) => {
				console.debug(method, err);
			}
		}

		// const handleLoadCommentsError = (err) => {
		// 	console.debug('loadComments', err)
		// }
		//
		// const handleLoadArticlesError = (err) => {
		// 	console.debug('loadArticles', err)
		// }

		/**
		@description: loads comments data for a specific post from JSON api
		*/
		const loadComments = (post_id, _cb) => {
			$.ajax({
				method: 'GET',
				url: `${ROOT_URL}/posts/${post_id}/comments`,
				success: (response) => {
					_cb(response);
				},
				fail: handleError('loadComments')
			});
		}

		/**
		@description: loads articles data from JSON api
		*/
		const loadFeedData = (_cb) => {
			$.ajax({
				method: 'GET',
				url: `${ROOT_URL}/posts/`,
				// data: {
				// 	skip: article_load_counter,
				// 	limit: 50
				// },
				success: (response) => {
					// increment counter with count of articles loaded
					article_load_counter += response.length;
					_cb(response);
				},
				fail: handleError('loadFeedData')
			});
		}

		/**
		@description: Given data of articles, converts the objects into HTML strings
									and appends them onto the page.
		*/
		const renderArticles = (data) => {
			const html_articles = data.map((current_article) => {
				return `<div class="post-preview" data-article-id="${current_article.id}">
						<a href="${ROOT_URL}/posts/${current_article.id}">
								<h2 class="post-title">
										${current_article.title}
								</h2>
								<h3 class="post-subtitle">
										${current_article.body.slice(0, 50)}
								</h3>
						</a>
						<p class="post-meta">Posted by <a href="#">Jane Doe</a> on January 20, 2017</p>
				</div>
				<hr>`;
			});
			$('#articles').append(html_articles.join(''));
		}

		// load more data listener
		$('#load-more').on('click', (ev) => {
			ev.preventDefault();
			loadFeedData(renderArticles);
		})

		// on page load
		loadFeedData(renderArticles);
});
