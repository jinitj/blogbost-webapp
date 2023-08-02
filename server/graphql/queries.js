const queries = {
    createBlogPost : () => {
        return ``;
    },

    createUser: (email, password) => {
        return `mutation {createUser(userInput: {email: "${formData.email}" ,password: "${formData.password}"}){_id}}`
    }
}


exports.default = queries;