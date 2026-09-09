<script setup>
  import '~/assets/css/app.scss';

  // TODO: Substitute NuxtUI components for BS5 components

</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<!--
# Instructions
The main focus of the final lesson will be completing the course project. As a supplement, you'll learn about SEO best practices, write a proposal in your course project repo's documents folder as to your ideal SEO implementation, and configure the SEO on your global nuxt.config.js and Nuxt pages using the head method in your page's <script>.
- Remember, the course project's repo is where we are working on the final project, not the main html300 repo.
- In the documents folder you created, create a .md file and include within what you learned about SEO & analytics (1-2 paragraphs).
- Include another section with how you would ideally implement SEO on your site (for our purposes we will add some light metadata -- this would be if you had plenty of time to fully implement the metadata that you'd like)
- Check out the links on nuxt.config.js and the head method.
  - Nuxt Config Global
  - Nuxt Head Method (Components)
- Your nuxt-config.js file should have some metadata in it already, modify that to include your site's fallback (default) metadata.
- Within your pages, add the head method to the <script>, and then include the hid meta line to overwrite the description on a page-by-page basis
Bonus: Add any additional metadata you'd like to include.

## SEO Overview
2 pts Complete Included 1-2 paragraphs of SEO knowledge learned through slides/research
1 pts Incomplete Included less than 1-2 paragraphs of SEO knowledge learned through slides/research
0 pts Missing No overview present

## SEO Overview
2 pts Complete Added detailed plan of ideal SEO implementation
1 pts Incomplete Added detailed plan of SEO implementation, insufficient or nothing new proposed
0 pts Missing No plan added

## Next SEO
2 pts Complete Adjusted default SEO config in nuxt.config.js and added the head method to pages to overwrite the description
1 pts Incomplete Didn't adjust default SEO config in nuxt.config.js or didn't add the head methods to pages to overwrite the description
0 pts Missing No changes to Nuxt app
-->

<!--
NOTES
=====
Video Summary
-------------
SEO = Search Engine Optimization
Process by which a website becomes more visible in search engine results
Works by matching keywords on site to user queries 
Engines use crawlers to index content
Relevance of content determine's site's ranking in results
Hierarchy of HTML header tags - good usage of tags influences SEO score; bad usage...
Ghost text harms SEO ranking
Search engine algorithms always evolve

Video
-----
Crawler goes into site and indexes it.
It searches for keywords and matches them with results
SEO inspects h[1-6] tags
Good usage of h[1-6] tags influences SEO
Do not put in invisible keyword block
Link to other websites, good websites
Google Analytics tells you which parts of the site the user frequents
Heat maps are also important for figuring out design

PowerPoint Presentation
-----------------------
Structure matters
Using SEO correctly will result in organic (free) traffic for your site
Users are more likely to visit free sites, not paid advertisements.
### KPI
Key Performance Index
Measures if company is getting desired results
"Are users doing what is intended?"
Does the promotional URL lead to paying users?
Track via database to capture info, or use GAnalytics
### Moz
A leader in teaching SEO improvement.
https://moz.com/beginners-guide-to-seo/
Having a social tag controls how a link renders on a social account
### Facebook
https://developers.facebook.com/docs/plugins/share-button/
Put in meta tag (Open Graph?)
<meta property="og:url" content="https://www.your-domain.com/your-page.html" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Your Website Title" />
  <meta property="og:description" content="Your description" />
  <meta property="og:image" content="https://www.your-domain.com/path/image.jpg" />
<div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));</script>

  Your share button code
  <div class="fb-share-button" 
    data-href="https://www.your-domain.com/your-page.html" 
    data-layout="button_count">
  </div>
### Twitter
   <meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@publisher_handle">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description less than 200 characters">
<meta name="twitter:creator" content="@author_handle">
<meta name="twitter:image" content="http://www.example.com/image.jpg">
	<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Hello%20world" data-size="large">Tweet</a>
        Allows Twitter to discover tag.
        href value is the site to share.
### Heat Map
Lets one know which content is most frequented, least frequented.

Moz
---
### 1
Install analytics
- gives info about who visits the site, how much traffic you get and from where, which pages people visit, how they engage with content, etc.
Google is transitioning to a new analytics type known as [GA4](https://moz.com/blog/transitioning-to-ga4)
Run a [site-crawl](https://moz.com/products/pro/site-crawl) to make sure everything works
### 2
Indexing is when a search engine crawls a page and makes a record of its content
Is the site new?
Does it offer unique content?
Is it crawlable and indexable?
### 3
Place keywords in
- title
- meta description
- headline
- paragraph headers
- body text
### 4
Write unique, accurate titles
Use keywords in titles
Find out which keywords to use here: https://moz.com/explorer
Use keywords once
Titles should be between 50 to 60 characters
Use meta descriptions to offer compelling reason for users to come and visit.
Create unique, compelling descriptions for each page.
Keep descriptions between 150-160 characters
Rich results are triggered by structured data.
https://developers.google.com/search/docs/appearance/structured-data/search-gallery
Breadcrumbs
https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
Use favicon
Do not use overly large image files.
Optimize images https://developers.google.com/search/docs/appearance/google-images
Google does not index images
Use clear navigation leading to most important pages.
Make sure all important pages are linked.
No orphaned pages.
Descriptive, unique anchor text.

Moz-Explorer
------------
### https://moz.com/explorer
transcript
- Volume: 90.4k
- Organic CTR: 59%
- Difficulty: 61
mlp
- Volume: 56.0k
- Organic CTR: 68%
- Difficulty: 65
search
- Volume: 261.6k
- Organic CTR: 94%
- Difficulty: 74
lines
- Volume: 22.6k
- Organic CTR: 94%
- Difficulty: 56
dialogue
- Volume: 51.9k
- Organic CTR: 94%
- Difficulty: 56
grep
- Volume: 8.2k
- Organic CTR: 86%
- Difficulty: 60
episode
- Volume: 46.6k
- Organic CTR: 71%
- Difficulty: 62
series
- Volume: 48.5k
- Organic CTR: 88%
- Difficulty: 72
search tool
- Volume: 640
- Organic CTR: 94%
- Difficulty: 69
lookup
- Volume: 6.1k
- Organic CTR: 97%
- Difficulty: 69
-->
