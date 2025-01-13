const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert'); // Usando o assert nativo do Node.js

// Variáveis simulando o estado do sistema
let isNonRegisteredUser;
let homepagePosts;
let currentPost;
let errorLoadingPosts;

// Cenário: Non-registered user visits the homepage with no new posts
Given('I am a non-registered user', function () {
    isNonRegisteredUser = true;
});

When('I visit the homepage', function () {
    if (errorLoadingPosts) {
        homepagePosts = null; // Erro ao carregar posts
    } else if (homepagePosts === undefined) {
        homepagePosts = []; // Nenhum post novo disponível
    }
});

When('there are no new posts available', function () {
    homepagePosts = [];
});

Then('I should see a message stating "No new posts available"', function () {
    assert.strictEqual(homepagePosts.length, 0);
    const message = homepagePosts.length === 0 ? "No new posts available" : null;
    assert.strictEqual(message, "No new posts available");
});

// Cenário: Non-registered user clicks on a new post
Given('there are new posts available', function () {
    homepagePosts = [
        { id: 1, title: 'Post 1', content: 'Content of Post 1' },
        { id: 2, title: 'Post 2', content: 'Content of Post 2' },
    ];
});

When('I click on a new post', function () {
    currentPost = homepagePosts[0]; // Simula o clique no primeiro post
});

Then("I should be redirected to the post's detail page", function () {
    assert.notStrictEqual(currentPost, null);
    assert.strictEqual(currentPost.hasOwnProperty('content'), true);
});

Then('I should see the full content of the post', function () {
    assert.strictEqual(currentPost.content, 'Content of Post 1');
});

// Cenário: Error loading new posts
When('there is a system error loading new posts', function () {
    errorLoadingPosts = true;
});

Then('I should see an error message stating "Unable to load new posts. Please try again later"', function () {
    const errorMessage = errorLoadingPosts ? "Unable to load new posts. Please try again later" : null;
    assert.strictEqual(errorMessage, "Unable to load new posts. Please try again later");
});

// Cenário: Non-registered user tries to interact with a post
Given("I am viewing a post's detail page", function () {
    currentPost = { id: 1, title: 'Post 1', content: 'Content of Post 1', likes: 10 };
});

When('I try to like or comment on the post', function () {
    // Simula que o usuário não consegue interagir porque não está logado
    const canInteract = !isNonRegisteredUser;
    assert.strictEqual(canInteract, false);
});

Then('I should be prompted to register or log in', function () {
    const promptMessage = isNonRegisteredUser ? "Please register or log in to interact with posts" : null;
    assert.strictEqual(promptMessage, "Please register or log in to interact with posts");
});
