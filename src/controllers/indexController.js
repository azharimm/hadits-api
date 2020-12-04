const { json } = require('../utils/response');
exports.index = (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    return json(res, {
        maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
        source: 'https://github.com/azharimm/hadits-api',
        list_books: {
            endpoint: '/books',
            description: 'Display all available books',
            example: fullUrl+'books',
        },
        list_hadits: {
            endpoint: '/books/:id',
            description: 'Display hadits with page and limit',
            example: fullUrl+'books/muslim?page=1&limit=10'
        },
        detail_hadits: {
            endpoint: '/books/:id/:number',
            description: 'Display detail hadits',
            example: fullUrl+'books/muslim/1'
        },
        range_hadits: {
            endpoint: '/books/range/:id',
            description: 'Display hadits based on range given',
            example: fullUrl+'books/range/muslim?range=5-10'
        },
    })
}