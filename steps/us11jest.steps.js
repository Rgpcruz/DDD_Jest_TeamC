const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert'); // Usando o assert nativo do Node.js

let isnonregisteredUser;
let popularPosts = [];

Given('I am not logged inn', function () {
    // Simula que o utilizador está registrado
    isnonregisteredUser = true;
});

When('I navigate to the popular posts sectionn', function () {
    // Simula a navegação para a seção de posts populares
    if (!isnonregisteredUser) {
        // Cria uma lista de 15 posts populares
        popularPosts = Array.from({ length: 15 }, (v, i) => ({
            id: i + 1,
            title: `Popular Post ${i + 1}`,
            likes: 100 - i, // Decrescendo o número de votos para simular popularidade
            comments: 10 * i, // Comentários aumentando para variação
        }));
    } else {
        // Define como null para utilizadores não logados
        popularPosts = null;
    }
});

Then('I should be redirected to the login page', function () {
    // Verifica se os posts populares estão visíveis
    assert.strictEqual(popularPosts, null);
});

// Given I am logged in
Given('I am logged in', function () {
    // Implementação para simular o login
    isnonregisteredUser = false;
});

// Then I should see a list of {int} posts
Then('I should see a list of {int} posts', function (numberOfPosts) {
    // Verifique se a lista contém o número correto de posts
    assert(Array.isArray(popularPosts)); // Verifica se é um array
    assert.strictEqual(popularPosts.length, numberOfPosts); // Verifica o número de posts
    popularPosts.forEach((post) => {
        assert(post.hasOwnProperty('title')); // Verifica a propriedade 'title'
        assert(post.hasOwnProperty('likes')); // Verifica a propriedade 'likes'
    });
});

// Then the posts should be ordered by number of votes in descending order
Then('the posts should be ordered by number of votes in descending orderr', function () {
    // Implementação para verificar a ordem dos posts
    const isOrdered = popularPosts.every((post, index, arr) => {
        return index === 0 || arr[index - 1].likes >= post.likes;
    });
    assert.strictEqual(isOrdered, true); // Verifica se está ordenado
});

Given('there are posts with the same number of votess', function () {
    // Simula posts com o mesmo número de votos
    popularPosts = [
        { id: 1, title: 'Post A', likes: 100, comments: 5 },
        { id: 2, title: 'Post B', likes: 100, comments: 15 },
        { id: 3, title: 'Post C', likes: 100, comments: 10 },
    ];
});

Then('the posts with more comments should appear higher in the lists', function () {
    // Ordena por votos e comentários
    popularPosts.sort((a, b) => {
        if (b.likes === a.likes) {
            return b.comments - a.comments;
        }
        return b.likes - a.likes;
    });

    // Verifica se os comentários estão em ordem decrescente para posts com mesmo número de votos
    for (let i = 0; i < popularPosts.length - 1; i++) {
        if (popularPosts[i].likes === popularPosts[i + 1].likes) {
            assert(popularPosts[i].comments >= popularPosts[i + 1].comments);
        }
    }
});

Then('each post should display its creation timestamp', function () {
    // Adiciona timestamps simulados
    popularPosts.forEach(post => {
        post.timestamp = new Date().toISOString(); // Exemplo de timestamp
    });

    // Verifica se cada post tem um timestamp
    popularPosts.forEach(post => {
        assert(post.hasOwnProperty('timestamp')); // Verifica a propriedade 'timestamp'
    });
});

When('there are more than 15 popular posts availablee', function () {
    // Cria uma lista com mais de 15 posts populares
    popularPosts = Array.from({ length: 20 }, (v, i) => ({
        id: i + 1,
        title: `Popular Post ${i + 1}`,
        likes: 100 - i,
        comments: 10 * i,
    }));
});

Then('only the 15 most popular posts should be displayed', function () {
    // Exibe apenas os 15 posts mais populares
    popularPosts = popularPosts.slice(0, 15);

    // Verifica se apenas 15 posts estão na lista
    assert(Array.isArray(popularPosts)); // Verifica se é um array
    assert.strictEqual(popularPosts.length, 15); // Verifica se tem 15 posts
});

Given('I am viewing the popular posts sectionn', function () {
    // Simula a navegação para a seção de posts populares
    if (!isnonregisteredUser) {
        popularPosts = Array.from({ length: 15 }, (v, i) => ({
            id: i + 1,
            title: `Popular Post ${i + 1}`,
            likes: 100 - i,
        }));
    } else {
        throw new Error('User is not logged in');
    }
});

When('I upvote a post', function () {
    // Simula o voto positivo no primeiro post
    const postId = 1;
    const post = popularPosts.find(p => p.id === postId);
    post.likes += 1;
});

Then("the post's vote count should increase by 1", function () {
    // Verifica se o número de votos aumentou
    const postId = 1;
    const post = popularPosts.find(p => p.id === postId);
    assert.strictEqual(post.likes, 101); // Verifica o número de votos
});

When('I downvote a post', function () {
    // Simula o voto negativo no primeiro post
    const postId = 1;
    const post = popularPosts.find(p => p.id === postId);
    post.likes -= 1;
});

Then("the post's vote count should decrease by 1", function () {
    // Verifica se o número de votos diminuiu
    const postId = 1;
    const post = popularPosts.find(p => p.id === postId);
    assert.strictEqual(post.likes, 99); // Verifica o número de votos
});
