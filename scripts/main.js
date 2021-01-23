import comments from './comments.js';

function makeComment(comment, child){
    const res = `
    <div class="comment">
    <p class="comment-username">${comment.username}</p>
    <p class="comment-text">${comment.text}</p>
    <button class="reply-btn">reply</button>
    ${child}
    </div>
    `;

    return res;
}

function createComment(comment){
    // base case
    if(comment.comments.length === 0){
        return makeComment(comment, '')
    } else{
        let child = ``;
        for(let i=0; i<comment.comments.length; i++){
            child = child + createComment(comment.comments[i]);
        }
        return makeComment(comment, child);
    }
}

function createComments(comments) {
    let ans = ``;

    for(let i=0; i<comments.length; i++){
        ans = ans + createComment(comments[i]);
    }

    return ans;
}

const commentsConainter = document.querySelector('.comments-container');
const html = createComments(comments);
console.log(html);
commentsConainter.innerHTML = html;