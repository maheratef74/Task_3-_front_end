window.onload = function() {
    const contentDiv = document.getElementById('content');

    async function fetchPostsAndComments() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = await response.json();
            // console.log("Posts data:", posts);

            for (let post of posts) {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>

                    <button class="like">Like</button>
                    <span class="post-likes">0</span> Likes
                    
                    <div class="comments" id="comments-${post.id}">
                        <h3>Comments:</h3>
                    </div>
                    <div class="add-comment">
                        <input type="text" placeholder="Add a comment" class="comment-input">
                        <button class="add-comment-btn">Comment</button>
                    </div>
                `;
                contentDiv.appendChild(postDiv);

                const likeButton = postDiv.querySelector('.like');
                const likesSpan = postDiv.querySelector('.post-likes');
                let likesCount = 0;

                likeButton.addEventListener('click', () => {
                    likesCount++;
                    likesSpan.textContent = likesCount;
                });

                const addCommentBtn = postDiv.querySelector('.add-comment-btn');
                const commentInput = postDiv.querySelector('.comment-input');

                addCommentBtn.addEventListener('click', () => {
                    const commentText = commentInput.value;
                    if (commentText.trim()) {
                        const commentDiv = document.createElement('div');
                        commentDiv.classList.add('comments');
                        commentDiv.innerHTML = `
                            <p><strong>Maher_Atef_74</strong> (maheratef600@gmail.com):</p>
                            <p>${commentText}</p>
                            <button class="like">Like</button>
                            <span class="comment-likes">0</span> Likes
                        `;
                        postDiv.querySelector('.comments').appendChild(commentDiv);

                        const likeCommentButton = commentDiv.querySelector('.like');
                        const commentLikesSpan = commentDiv.querySelector('.comment-likes');
                        let commentLikesCount = 0;

                        likeCommentButton.addEventListener('click', () => {
                            commentLikesCount++;
                            commentLikesSpan.textContent = commentLikesCount;
                        });

                        commentInput.value = '';
                    }
                });

                try {
                    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
                    const comments = await commentsResponse.json();
                    // console.log(`Comments data for post ${post.id}:`, comments);

                    const commentsDiv = document.getElementById(`comments-${post.id}`);
                    comments.forEach(comment => {
                        const commentDiv = document.createElement('div');
                        commentDiv.classList.add('comments');
                        commentDiv.innerHTML = `
                            <p><strong>${comment.name}</strong> (${comment.email}):</p>
                            <p>${comment.body}</p>
                            <button class="like">Like</button>
                            <span class="comment-likes">0</span> Likes
                        `;
                        commentsDiv.appendChild(commentDiv);

                        const likeCommentButton = commentDiv.querySelector('.like');
                        const commentLikesSpan = commentDiv.querySelector('.comment-likes');
                        let commentLikesCount = 0;

                        likeCommentButton.addEventListener('click', () => {
                            commentLikesCount++;
                            commentLikesSpan.textContent = commentLikesCount;
                        });
                    });
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    fetchPostsAndComments();
};
