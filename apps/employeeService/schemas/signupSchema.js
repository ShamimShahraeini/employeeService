module.exports = {
    
    type: 'object',
    additionalProperties: false,
    properties: {
        id: {
            type: 'string'
        },
        data: {
            type: 'object'
        },
        parent: {
            type: 'string'
        }
    },
    required: [
        'id',
        'data',
        'parent'
    ]
}