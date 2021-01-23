const comments = [
    {
        username : 'achalsaharan',
        commentId : '1',
        text : 'comment 1',
        time : '',
        comments : [
            {
                username : 'arnavsaharan',
                commentId : '4',
                text : 'nested comment 1',
                time : '',
                comments: [
                    {
                        username: 'karnailsingh',
                        commentId: '6',
                        text: 'nested nested comment 1',
                        time : '',
                        comments: []
                    }
                ]
            },
            {
                username : 'achalsaharan',
                commentId : '5',
                text : 'nested comment 2',
                time : '',
                comments: []
            }
        ]
    },
    {
        username : 'arnavsaharan',
        commentId : '2',
        text : 'comment 2',
        time : '',
        comments : []
    },
    {
        username : 'achalsaharan',
        commentId : '3',
        text : 'comment 3',
        time : '',
        comments : []
    }
];

export default comments;