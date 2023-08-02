## Setup

Make sure to install the dependencies:

```bash
# npm
npm install



## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev



## Production

Build the application for production:

```bash
# npm
npm run build


Locally preview production build:

```bash
# npm
npm run preview


#connect to backend 
clone the other repo  name graphqlserver, to launch it npm run start it will launch the backend on port 5000



# The frontend is capable to register new users , sign in existing users and logout the currently signed in ones , after signining in the user can see all the availabe posts #in the system also the users can create new posts
# There is a infinte scroll implemented to show all the existing and new tweets incoming
# The user gets notified when another user creates a new post in the system
# The display of every post contains a post body and the creator of that post


# implementation of new tweeets 
# we have implemented short polling to the system where the client goes and checks with the backend every x interval of time to see if there are any new posts .
# the reason to implement short polling is such that in a social media app where posts are involved giving the user a near real time experience does no harm so rather than # showing a very real time experience short polling could help us achieve this  

