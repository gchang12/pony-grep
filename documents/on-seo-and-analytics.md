What I Learnt About SEO
=======================
Search engine optimization (SEO) is the process by which a website becomes more visible in the results of a search engine query. It works by matching keywords on the website to user queries. Search engines implement _crawlers_ to index, or make a record of, website content. The relevance of content determines how a website ranks in the results of a given search query. 
What influences a website's search engine ranking? The presence of invisible text harms a website's visibility on a search engine, for one. The presence of well-structured h[1-6] tags positively affects website visibility, while poorly structured h[1-6] tag usage harms it. The presence of keywords in the <title> tag, <meta> description, headlines, paragraph headers, and body text influences the ranking also. Title and meta-description lengths should be kept within given character length ranges, specifically 50--60 and 150--160. Unique, compelling meta-descriptions ought to be given per page (i.e. no lorem-ipsum).
Analytics give information about who visits the website, how much traffic it gets and from where, which pages people frequent, how they engage with the content, and so on.

Ideal SEO Implementation
========================
I intend to leverage Nuxt's `useHead` method in order to modify the metadata of each given page which composes my website. Specifically, I intend to rewrite the meta-descriptions so that take into account keywords that will cause search engines to rank the site higher, while avoiding the 'keyword-stuffing' habit that they tend to penalize websites for. I intend to trim the existing titles and meta-descriptions so that they fall within the recommended character-length range. I will put in Open Graph attributes in the meta tag as well. I intend to leverage h[1-6] tags so that they can match keywords more easily.
If I had the resources, I would put in more effort into investigating precisely which keywords are most-often searched for and put them into the content of my website.

