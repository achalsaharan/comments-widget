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

export default comments;