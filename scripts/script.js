// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  var id = 0;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        // id and location for that entry
        id++;
        newPost.id = id;
        newPost.addEventListener("click",()=>{
          setState({location:"entry", id:newPost.id}, newPost.entry)
        })

        document.querySelector('main').appendChild(newPost);
      });
    });
});

document.querySelector('header img').addEventListener('click', () => {
  setState({location: 'settings'});
});

document.querySelector('h1').addEventListener('click', () => {
  setState({location: 'home'});
});

window.addEventListener('popstate', (event) => {
  setState(event.state);
});