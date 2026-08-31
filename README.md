# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Assignment 09 - APIs and Course Project

We'll spend our final couple weeks working on the final project, so this will act as the final project rubric. We'll be using Nuxt, so please watch the video on Nuxt for a walkthrough of starting up a new project. Nuxt is very similar to Vue CLI, and we'll be able to deploy the course projects for free on Netlify automatically.

### References
- [Yarn](https://yarnpkg.com/lang/en/docs/install/)
- [Nuxt](https://nuxtjs.org/guide/installation)
- [Axios](https://github.com/axios/axios)
- [Axios & Vue](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)
- [Vue Docs](https://vuejs.org/v2/guide/)
- [Vue DevTools - Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
- [Vue DevTools - Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Bootstrap Vue](https://bootstrap-vue.js.org/docs/)
- [Netlify](https://www.netlify.com/)

### Build the Nuxt app:
-	Watch the video on Nuxt to learn more about the framework
-	**Create a new repository for this assignment.** Do not build it here.
	-	In that repo, run `npx create-nuxt-app my-project-title` (replace "my-project-title" with your project's title), and choose the following settings:
		-	Name: anything you like
		- Package manager: npm or yarn, your preference
		- Programming language: JavaScript
		- UI Framework: Bootstrap Vue (optional)
		-	Nuxt.js modules: Axios (use spacebar to select)
		- Linting tools: none
		- Testing framework: none
		- Rending mode: Universal
		- Deployment target: Static
		- Deployment tools: none
		- GitHub username: your username, which should be the default here
		- Version control system: Git
	-	The install will begin
	-	`cd` into your newly created project directory
	-	Follow instructions in the generated project's README to start the local server
- Add Sass support:
  -	Use the appropriate package manager (yarn or npm) to install `node-sass` and  `sass-loader`
	-	Add `lang="scss"` to all `<style>` tags in templates
-	Migrate over your Vue template files and assets from the Vue CLI project to their respective spots in the Nuxt app.
	- Migrate content related to layout from the 'App.vue' file to `layouts/default.vue`.	Migrate page templates to the `pages` directory and component templates to the `components` directory. More information about views: https://nuxtjs.org/docs/2.x/concepts/views
	-	For internal links, now use `<nuxt-link>` components. More information on Nuxt routing: https://nuxtjs.org/docs/2.x/get-started/routing/
-	Add any additional packages you are using.

### Bootstrap-Vue package:

There aren't many good resources on using bootstrap-vue package with Nuxt. Luckily, it's very easy! If you choose "Bootstrap Vue" for UI Framework in the app setup, everything should be connected automatically, and you can immediately start using Bootstrap components in view files.

### Additional items:
-	The site should have at least 4 pages (including the home) with `<nuxt-link>` used to navigate between them in the nav
-	Feel free to reuse as much content as you'd like from what you created in previous assignments
-	Incorporate data from an API. (See below for API suggestions)
	-	1 instance of retrieving data from an API
	-	Build a custom component to display the data returned from the API
	-	That component should have props validation and use at least 4 pieces of data from the API (if possible). For example, if the returned data is of the format `{image: 'http://path.com/123', name: 'stingray', created: '10-12-2019', author: 'Claude'}`, the component should display the image, name, created date, and author information
- Deploy to Netlify https://app.netlify.com/start
- **Bonus:**  Create UI interactions to interact with your API data   
- **Extra Bonus:**  Create dynamic routing with your data through components with single pages
-	**Super Extra Bonus:** Point a custom domain to your site

### API Notes
These are some options for fun, free, publicly available APIs. Most require registration, but no payment.
1. Movies: https://www.omdbapi.com/
2. Football (soccer): https://apifootball.com/
3. Almost anything- library: https://pro.dp.la/developers
4. Weather: https://openweathermap.org/api
5. Meetup: https://www.meetup.com/meetup_api/
6. And a list of hundreds more: https://apilist.fun/

Many APIs require you to use a key, or unique identifier, to access them. This key is a *secret*, and professional best practice is not to commit them to version control. However, secret management is outside the scope of this course, and so we are going to recommend you just use the key in your code and commit to Github. If for any reason you're using an API that isn't free, or has restrictions, don't do this! Bots crawl Github looking for keys and passwords, and will probably get yours and use it. As long as the API you're using is free and unrestricted though, it shouldn't impact you.

### To Submit:
- 	Submit the link to your course project repo as well as the live site's Netlify link

## New E-Mail

Hello Students,

I'm writing because George brought to my attention that the Lesson 6 instructions are out of date. Unfortunately, I'm not able to make updates to the course content as the university uses specific course developers for that work, though I will definitely bring this to their attention.

To move forward I'm advising the class to use the latest Nuxt with just plain Bootstrap 5 for CSS. Disregard the setup instructions in the README and use:
npm create nuxt@latest my-new-app-project
cd my-new-app-project
npm install bootstrap

Then in nuxt.config.ts:
export default defineNuxtConfig({
  css: ['bootstrap/dist/css/bootstrap.min.css']
})

Then simply use Bootstrap's CSS classes directly. Two other deviations from the README: skip the node-sass step (this is deprecated and won't build on current Node; use npm install -D sass if you want SCSS). 

Nuxt 4 puts your folders inside app/ directory, it shoudl like this:
my-project-title/
├── app/
│   ├── app.vue
│   ├── pages/          ← your pages (routing is automatic)
│   ├── components/     ← your components
│   └── layouts/        ← default.vue goes here
├── public/             ← static files (images, JSON) — NOT inside app/
└── nuxt.config.ts

Make sure app/app.vue contains:
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

For Netlify, set build command npm run generate and publish directory .output/public.

IMO building on the legacy versions would be counter-productive (Nuxt 2 and Vue 2 are both past end-of-life) and you're less likely to encounter them when working professionally.

A few other notes:

    <nuxt-link> has been updated <NuxtLink>

    If you run into the error:

npm error Cannot read properties of null (reading 'edgesOut')

run 
npm install -g npm@latest

Then delete node_modules and package-lock.json and run npm install again. This is a bug in older npm versions, not a problem with your project.

Please let me know if you need additional time to submit, I want to be lenient with due dates because of the out of date curriculum content.

Nick Edwards
