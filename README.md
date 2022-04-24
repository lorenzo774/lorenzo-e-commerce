# Lorenzo-e-commerce

## Technologies

Made with Express, MongoDB and Passport.

## Installation

After cloning the repo, install all the dependencies

<pre>
<code>npm i</code>
</pre>

Now Create a .env file and add the following variables:

- URI to a MongoDB database
- Session secret

```bash
MONGODB_URL = "mongodb://localhost:27017/lorenzo-e-commerce"
SESSION_SECRET = "banana"
```

Now you are ready to run the app with nodemon:

<pre>
<code>npm run watch</code>
</pre>

Open localhost:3000 in your favourite browser to see the app running
