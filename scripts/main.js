import comments from './comments.js';

function makeComment(comment, child){
    const res = `
    <div class="comment">
    <p class="comment-username">${comment.username}</p>
    <p class="comment-text">${comment.text}</p>
    <button class="reply-btn" id=${comment.commentId}>reply</button>
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

function handleReplyBtnClick(event){
    console.log(event);
    const id = event.target.id;
    const btn = event.target;
    const commentForm = createCommentReplyFrom(id);
    // commentForm.addEventListener('onsubmit', handleReplyPostClick(event), false);
    const parentNode = btn.parentNode;
    parentNode.replaceChild(commentForm, btn);
    

}

function createCommentReplyFrom(id){
    const commentReplyForm = document.createElement('DIV');
    commentReplyForm.innerHTML =  `
    <form id=${id}>
        <input type="text" class="comment-reply-form-text">
        <input type="button" value="post" class="comment-reply-post-btn">
    </form>
    `;

    return commentReplyForm;
}

function handleReplyPostClick(event) {
    event.preventDefault();
    console.log(event);
}

const commentsConainter = document.querySelector('.comments-container');
const html = createComments(comments);
commentsConainter.innerHTML = html;

const buttons = document.querySelectorAll('.reply-btn');
console.log(buttons);
buttons.forEach(btn => {
    btn.addEventListener('click', handleReplyBtnClick);
});