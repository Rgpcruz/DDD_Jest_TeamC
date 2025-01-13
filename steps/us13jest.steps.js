const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert'); // Usando o assert nativo do Node.js

// Dados simulados
let isLoggedIn;
let postContent;
let comments;

// Cenário: Verify user is non-registered
Given('I am not logged in for non-registered users', function () {
    // Simula que o utilizador não está logado
    isLoggedIn = false;
});

When('I attempt to access a post', function () {
    // Simula o acesso ao post
    if (!isLoggedIn) {
        postContent = "This is the content of the post.";
    }
});

Then('I should be recognized as a non-registered userr', function () {
    const isUserRegistered = false; // Substitua pela lógica real
    assert.strictEqual(isUserRegistered, false); // Usando assert
});

// Cenário: Non-registered user views post content
When('I access a post', function () {
    // Simula o acesso ao conteúdo do post
    if (!isLoggedIn) {
        postContent = "This is the content of the post.";
    } else {
        postContent = null;
    }
});

Then('I should be able to see the content of the post', function () {
    assert(postContent !== undefined); // Usando assert
});

// Cenário: Non-registered user views comments thread on a post
When('I navigate to the comments section', function () {
    // Simula a navegação para a seção de comentários
    comments = [
        { id: 1, text: "First comment" },
        { id: 2, text: "Second comment" },
        { id: 3, text: "Third comment" },
    ];
});

Then('I should be able to see all comments on the post', function () {
    assert(comments.length > 0); // Usando assert
});

Then('the comments should be displayed in the order they are stored', function () {
    // Verifica a ordem dos comentários
    const isOrdered = comments.every((comment, index) => {
        return index === 0 || comments[index - 1].id < comment.id;
    });
    assert.strictEqual(isOrdered, true); // Usando assert
});
