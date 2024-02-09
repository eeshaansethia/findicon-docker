# Findicon
Findicon is an AI tool that helps you generate icons for products you entered in the prompt and gives you a list of products matching that prompt along with different product features.

**Note: This repository has been created to facilitate ```docker-compose up```. The original repositories connected to Production by CI/CD are mentioned below, along with the link to Production Builds.**

# Production Deployments
[Frontend Production on Vercel](https://findicon.vercel.app/)

[Backend Production of Render](https://findicon.onrender.com)

[Frontend GitHub Repository](https://github.com/eeshaansethia/findicon)

[Backend Github Repository](https://github.com/eeshaansethia/findicon-server)

### Note: It takes some time for the backend server to start on Render because it runs on a free plan; please be patient. It will eventually, for sure.

# Installation for Individual Repositories
1. For Frontend, React has been used. After cloning the repository, create a ```.env``` file in the project's root folder. 
```.env
REACT_APP_BACKEND_URL = https://localhost:3001
```
After the environment variables are set: 
```bash
npm install
npm start
```
2. The same process must also be followed for the backend. Clone the repository and set the environment variables by creating a ```.env``` file in the project's root folder.
```.env
OPENAI_API_KEY = <API-KEY-BY-OPENAI>
```
```bash
npm install
node index.js
```
3. If you wish to use docker for setting up your environment. Clone this repository, create the two ```.env``` files as mentioned above and then type the command:
```bash
docker-compose up
```
This will start the frontend, backend and MongoDB in their respective ports on the localhost.

# Development Process
- I have worked on many projects on the MERN Stack, but this was the first time I implemented an AI model. I looked for some videos to get some idea about the process, but almost all the videos on YouTube were relatively generic and not very helpful. So, I started with the OpenAI documentation. But there was a massive confusion in my mind: **Do I need a Node.js server for this application?**
- I tried looking for answers in ChatGPT and Bard (my bad, Gemini) and started with a simple React application. 
- I took design inspiration from the ChatGPT interface and thought of building just an input that fetches an icon for me. It looked pretty plain, so I divided the UI into two sections - one for the prompts and one for keeping track of previous prompts. Since I initially planned to do the project without needing a database or a backend, I thought of storing data in ```localstorage```.
- After completing a basic layout, I tried implementing the daal-e-2 model of ChatGPT. I went through the documentation and got multiple solutions to do so. The first was by calling an API, and the second used the ```openai``` library by OpenAI. So, I planned on using the API call method.
- I generated my API Key and followed the API calling method, then realized there might be some issues with ```CORS```. And I was right; although it was not a CORS issue, these APIs cannot be called in a browser environment. So, this is how I got the clarity that I will have to use the ```Node.js``` backend, and it was a better choice because now I can store past prompts in a database, ```MongoDB``` in my case.
- I began by writing the same API call I wrote in React, but this time, it was in my Node.js backend. After going deeper into the documentation, I realized using the ```OpenAi``` library would be a better choice.
- I started with the ```daal-e-3``` model but shifted to ```daal-e-2``` because of the 1img/min limitation in the free tier of OpenAI's APIs. But then came another problem: the icon generation was not sound; daal-e gave me poor-looking icons and, at times, way off from the original prompt.
- So, I again went to ChatGPT to write a better prompt for me for the same, and then it struck me that maybe I could use the ```gpt-3.5-turbo``` to take my original prompt and convert it to a meaningful prompt. So I took the original prompt, passed it through gpt-3.5-turbo and then passed it to daal-e-2, and the results were better.
- I built a model for my MongoDB database to store my prompts and integrated it with my endpoint.
- Once I was done with icon generation, I started building card components for my ```Prompts``` and the ```Product Listings```.
- Before I began implementing the fetching of the products, I made the application utterly responsive with a simple design, a hamburger menu and some media queries.
- I then again used gpt-3.5-turbo to get me Product Listings relevant to the prompt and output as an array, which I passed as a response back to my frontend after parsing it.
- I added a few tweaks like loading spinner, added validation, and tried to make the UI a little better.
- I then implemented the Product Listing component. After 40 minutes of making the CSS good enough for a bug-free scrolling experience, my front end was complete.
- I made a few more endpoints, like fetching all prompts, deleting prompts and implementing a delete icon for the same in the frontend.
- I then completed the feature to go to any previous prompts and view the icons and products for old prompts.

- After ending my Development process, I moved towards the operations process.
- I deployed my front end on Vercel and my back end on Render and implemented CI/CD.
- I then generated DockerFiles for my Node Backend and React Frontend and prepared the docker-compose file to build my image.
