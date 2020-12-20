Welcome to Take a Walk! 

This app allows a user to generate nearby restaurants and trails for an outing and leave reviews on how COVID-safe they were. 

Backend:
- Flask
- SQLAlchemy 
- PostgreSQL 

Frontend:
- React 

Styling:
- React Bootstrap 

APIs:
- Yelp Fusion API 
- Hiking Project API 
- Open Weather Map API

The app allows users to register for accounts and validates login credentials: 

![](registerlogin.gif)

To start a new walk, the user clicks the button on the homepage or in the navigation bar. They're prompted for their zipcode and the date they'd like to take a walk. 

Restaurants and trails are generated, allowing the user to select where they'd like to go. When the user submits their choices, the app redirects to the Saved Walks component, which sends a fetch request to the server to display all of the walks for this user sorted by date. 

![](newwalk.gif)

![](choosecomponents.gif)

When the user submits their choices, the app redirects to the Saved Walks component, which sends a fetch request to the server to display all of the walks for this user sorted by date. The app also generates the weather for each walk based on the date and location. 

![](savedwalksweather.gif)
