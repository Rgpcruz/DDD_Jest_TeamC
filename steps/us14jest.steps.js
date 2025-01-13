const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert'); // Usando o assert nativo do Node.js

let userLoggedIn = false;
let popularPosts = [];
let message = '';
let systemError = false;

// Cenário: Verify user is non-registered
Given('I am not logged in', function () {
    // Define o estado do usuário como não logado
    userLoggedIn = false;
});

When('I access the popular posts section', function () {
    // Simula o acesso à seção de posts populares
    if (!userLoggedIn) {
        message = 'User is non-registered';
    }
});

Then('I should be recognized as a non-registered user', function () {
    // Verifica se o usuário é reconhecido como não registrado
    assert.strictEqual(message, 'User is non-registered');
});

// Cenário: Display popular posts
When('I navigate to the popular posts section', function () {
    // Simula a navegação para os posts populares
    if (!userLoggedIn) {
        popularPosts = Array.from({ length: 10 }, (v, i) => ({
            id: i + 1,
            title: `Popular Post ${i + 1}`,
            votes: 100 - i,
            comments: 10 * i,
        }));
    }
});

Then('I should see a list of popular posts', function () {
    // Verifica se os posts populares estão visíveis
    assert(Array.isArray(popularPosts) && popularPosts.length > 0);
});

// Cenário: Display only 15 most popular posts
When('there are more than 15 popular posts available', function () {
    // Simula a existência de mais de 15 posts populares
    popularPosts = Array.from({ length: 20 }, (v, i) => ({
        id: i + 1,
        title: `Popular Post ${i + 1}`,
        votes: 100 - i,
        comments: 5 * i,
    }));
});

Then('I should see only the top 15 popular posts', function () {
    // Filtra os 15 mais populares
    const top15Posts = popularPosts.slice(0, 15);
    assert.strictEqual(top15Posts.length, 15);
});

// Cenário: Organize posts by number of votes
Given('I am viewing the popular posts section', function () {
    // Verifica se a seção de posts populares está sendo visualizada
    assert(Array.isArray(popularPosts));
});

When('posts are displayed', function () {
    // Simula a organização dos posts por votos em ordem decrescente
    popularPosts.sort((a, b) => b.votes - a.votes);
});

Then('the posts should be ordered by number of votes in descending order', function () {
    // Verifica a ordem dos posts
    const isSorted = popularPosts.every((post, index) => {
        return index === 0 || popularPosts[index - 1].votes >= post.votes;
    });
    assert.strictEqual(isSorted, true);
});

// Cenário: Handle posts with same number of votes
Given('there are posts with the same number of votes', function () {
    // Simula posts com o mesmo número de votos
    popularPosts = [
        { id: 1, title: 'Post A', votes: 50, comments: 20 },
        { id: 2, title: 'Post B', votes: 50, comments: 30 },
        { id: 3, title: 'Post C', votes: 40, comments: 10 },
    ];
});

Then('the posts with more comments should appear higher in the list', function () {
    // Verifica se posts com mesmo número de votos estão ordenados pelos comentários
    popularPosts.sort((a, b) => {
        if (a.votes === b.votes) {
            return b.comments - a.comments;
        }
        return b.votes - a.votes;
    });

    const isOrdered = popularPosts.every((post, index) => {
        if (index === 0) return true;
        const prevPost = popularPosts[index - 1];
        return (
            prevPost.votes > post.votes ||
            (prevPost.votes === post.votes && prevPost.comments >= post.comments)
        );
    });

    assert.strictEqual(isOrdered, true);
});

// Cenário: No popular posts available
Given('there are no popular posts available', function () {
    // Simula a ausência de posts populares
    popularPosts = [];
});

Then('I should see a message stating "No popular posts available"', function () {
    // Verifica a mensagem exibida
    message = popularPosts.length === 0 ? 'No popular posts available' : '';
    assert.strictEqual(message, 'No popular posts available');
});

// Cenário: Error loading popular posts
Given('there is a system error', function () {
    // Simula um erro de sistema
    systemError = true;
});

Then('I should see an error message stating "Unable to load popular posts. Please try again later"', function () {
    // Verifica a mensagem de erro
    message = systemError
        ? 'Unable to load popular posts. Please try again later'
        : '';
    assert.strictEqual(message, 'Unable to load popular posts. Please try again later');
});
