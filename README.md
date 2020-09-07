NodeJS App (yelp-search)
* Create a NodeJS project using npm init.
* Create a re-usable file functions lib in code base to read files. 
* Build deployable nodejs app with the required apis for the following frontend app using the REST standard.
* Use projects.json and project-branches.json as data sources.
NOTE: Do not import them. Read from filestream.
ReactApp (Redux) (yelp-search-ui)
* Search field to display search results from yelp
* User can type city state and keyword to find top results from yelp based on rating
* Following information are displayed:
    * Resturant name
    * Address
    * Categories
    * 1 Review with reviewer name
    * Phone number
    * rating
    * Pricing

How to run the code locally
* Go to project folder, run `npm i`
* Go to client folder under project, run `npm i`
* Return back to base project folder, and run `npm run dev` (this will run both server and client side code together)