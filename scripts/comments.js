const comments = [
    {
        username : 'achalsaharan',
        commentId : '1',
        text : 'comment 1',
        comments : [
            {
                username : 'arnavsaharan',
                commentId : '4',
                text : 'nested comment 1',
                comments: []
            },
            {
                username : 'achalsaharan',
                commentId : '5',
                text : 'nested comment 2',
                comments: []
            }
        ]
    },
    {
        username : 'arnavsaharan',
        commentId : '2',
        text : 'comment 2',
        comments : []
    },
    {
        username : 'achalsaharan',
        commentId : '3',
        text : 'comment 3',
        comments : []
    }
];

export default comments;