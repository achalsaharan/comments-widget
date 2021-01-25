const comments = [
    {
        username : '@user1',
        commentId : '1',
        text : 'comment 1',
        time : '',
        comments : [
            {
                username : '@user2',
                commentId : '4',
                text : 'nested comment 1',
                time : '',
                comments: [
                    {
                        username: '@user1',
                        commentId: '6',
                        text: 'nested nested comment 1',
                        time : '',
                        comments: []
                    }
                ]
            },
            {
                username : '@user3',
                commentId : '5',
                text : 'nested comment 2',
                time : '',
                comments: []
            }
        ]
    },
    {
        username : '@user3',
        commentId : '2',
        text : 'comment 2',
        time : '',
        comments : []
    },
    {
        username : '@user4',
        commentId : '3',
        text : 'comment 3',
        time : '',
        comments : []
    }
];

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

function addComment(event) {
    let text = addCommentText.value;
    const comment = makeNewComment(text);

    comments.unshift(comment);
    addCommentText.value = '';

    paintComments();
}

function handleReplyBtnClick(event){
    const id = event.target.id;
    const replyBtn = event.target;

    // creating the reply form
    const commentForm = createCommentReplyFrom(id);

    // adding event listener to the submit btn on the form
    commentForm.childNodes[1][1].addEventListener('click', handleReplyPostClick);
    commentForm.childNodes[1][0].addEventListener('keydown', (event) => {
        if(event.keyCode === 13){
            event.preventDefault();
            commentForm.childNodes[1][1].click();
        }
    })

    //replacing the reply btn with the reply form
    const parentNode = replyBtn.parentNode;
    parentNode.replaceChild(commentForm, replyBtn);
    
}

function createCommentReplyFrom(id){
    const commentReplyForm = document.createElement('DIV');
    commentReplyForm.innerHTML =  `
    <form >
        <input type="text" class="comment-reply-form-text">
        <input type="button" value="post" class="comment-reply-post-btn" id=${id}>
    </form>
    `;

    return commentReplyForm;
}

function handleReplyPostClick(event) {
    event.preventDefault();

    //getting refrence to the text field in the form
    const text = event.target.parentNode.childNodes[1].value;
    const commentId = event.target.id;
    addReplyToComment(commentId, text);

    //reverting back to showing back the reply button
    const parentNode = event.target.parentNode;

    //removing the post form
    event.target.parentNode.childNodes[1].remove();
    event.target.remove();

    //adding back the reply button
    const replyBtn = document.createElement('BUTTON');
    replyBtn.innerHTML = 'reply';
    replyBtn.setAttribute('class', 'reply-btn');
    replyBtn.setAttribute('id', commentId);

    parentNode.appendChild(replyBtn);

}

function addReplyToComment(commentId, text){
    
    for(let i=0; i<comments.length; i++){
        addReplyDFS(comments[i], commentId, text);
    }

    paintComments();
}

function addReplyDFS(comment, commentId, text){
    //base case
    if(comment.commentId === commentId){
        let comm = makeNewComment(text);
        comment.comments.unshift(comm);
        return;
    }

    //else check in the children
    for(let i=0; i<comment.comments.length; i++){
        addReplyDFS(comment.comments[i], commentId, text);
    }

    return;
}

function makeNewComment(text){
    let comment = {
        username: '@achalsaharan',
        commentId: guid(),
        time: new Date().getTime(),
        text: text,
        comments: []
    }

    return comment;
}

function paintComments(){
    const commentsConainter = document.querySelector('.comments-container');
    const html = createComments(comments);
    commentsConainter.innerHTML = html;
    
    // adding event listeners to the reply buttons
    const buttons = document.querySelectorAll('.reply-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', handleReplyBtnClick);
    });
}

function guid() {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const addCommentBtn = document.querySelector('.add-comment-btn');
const addCommentText = document.querySelector('.add-comment-text');
addCommentBtn.addEventListener('click', addComment);

// add eventlistener on input field to prevent form submission by hitting enter
addCommentText.addEventListener('keydown', (event) => {
    if(event.keyCode === 13){
        event.preventDefault();
        addCommentBtn.click();
    }
})

// painting comments on the page
paintComments();
