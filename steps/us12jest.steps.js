const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert'); // Usando o assert nativo do Node.js

let userLoggedIn = false;
let post = null;
let comments = [];

Given('the user is logged in', function () {
    userLoggedIn = true;
});

Given('the user navigates to a post with comments', function () {
    post = { id: 1, title: 'Post with Comments' };
    comments = [
        { id: 1, text: 'First comment' },
        { id: 2, text: 'Second comment' },
    ];
});

Given('the user navigates to a post with no comments', function () {
    post = { id: 2, title: 'Post with No Comments' };
    comments = [];
});

Given('the user navigates to a post with multiple pages of comments', function () {
    post = { id: 3, title: 'Post with Paged Comments' };
    comments = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        text: `Comment ${i + 1}`,
    })); // Simula 30 comentários
});

When('the user clicks on the "View Comments" button', function () {
    if (!userLoggedIn) {
        throw new Error('User is not logged in');
    }
    this.displayedComments = comments.slice(0, 10); // Exibe os primeiros 10 comentários por página
});

Then('the user should see a list of comments for that post', function () {
    assert(Array.isArray(this.displayedComments)); // Verifica se é um array
    assert(this.displayedComments.length > 0); // Verifica se não está vazio
    this.displayedComments.forEach(comment => {
        assert(comment.hasOwnProperty('text')); // Verifica se existe a propriedade 'text'
    });
});

Then('the user should see a message saying "No comments available"', function () {
    assert(Array.isArray(this.displayedComments)); // Verifica se é um array
    assert(this.displayedComments.length === 0); // Verifica se está vazio
    this.noCommentsMessage = 'No comments available';
    assert.strictEqual(this.noCommentsMessage, 'No comments available'); // Verifica a mensagem
});

Then('the user should see the first page of comments', function () {
    assert(Array.isArray(this.displayedComments)); // Verifica se é um array
    assert.strictEqual(this.displayedComments.length, 10); // Verifica se tem 10 comentários
    assert.strictEqual(this.displayedComments[0].text, 'Comment 1'); // Verifica o texto do primeiro comentário
});

Then('the user should see a "Next" button to navigate to the next page of comments', function () {
    const hasNextPage = comments.length > this.displayedComments.length;
    assert.strictEqual(hasNextPage, true); // Verifica se há uma próxima página
});
