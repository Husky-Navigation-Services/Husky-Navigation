# Husky-Navigation
A full-stack Web App for navigation of the University of Washington Campus. Enables shortest-route calculation between buildings, bus stops, and the current location. Builds off the limited University of Washington Campus Map web app (https://www.washington.edu/maps/) that already exists in a campus-oriented way. Built to be highly scalable such that other campuses can customize our map.

# Detailed Walk-through

The primary goal of this project is to enable campus-oriented and intuitive navigation of the University of Washington campus. On the left sidebar, the first dropdown is for navigation (i.e., calculating the shortest path from two locations). To navigate between two locations, choose your "Starting Point" in the top selection, the "Destination" in the bottom selection, and click the “Navigate” button. If the selections are invalid, an alert will appear asking you to try again and the navigation request will fail. 

The next three dropdowns enable you to easily search for UW locations, and, when clicked, locate them on the full-screen map. In the fifth dropdown, there is an option to send feedback to the developers through Gmail servers. That is, it sends us an email containing the written message to huskynavigationfeedback@gmail.com. The final dropdown describes the developers briefly. The left sidebar can be entirely collapsed (and reopened) by clicking the website logo immediately to the right of the sidebar to get a better view of the map.

On the horizontal bar, the starting point and destination selected in the left sidebar are listed first. Following is the total distance along the recommended path from these locations in miles, and the estimated time of arrival in minutes. Next is a weather icon which shows the current weather in Seattle, WA using the OpenWeatherMaps API. If you click the icon, a popup will drop down from the icon with more details about the icon itself, the current temperature in two units, the windspeed, and another icon recommending whether or not to bring an umbrella. If the icon is clicked again, the popup will close. 

To the right of the weather icon is an option to display your current location using a browser API. If the user is outside the University of Washington campus, an alert will appear stating that the website is best-suited for navigation within the campus, and has limited functionality beyond it. The next icon, the GitHub logo, takes you to our public GitHub repository when clicked. The coffee-cup icon (which is currently commented out) gives the user an option to “buy us a coffee,” or donate money to our website’s further development. Finally, the right-most switch on the horizontal bar changes the theme of the entire webpage to a alternate dark-mode theme.

![Demo Image](Project/DemonstrationImage.PNG)

# Running the Code

This is a full-stack web application, so running it will require to main steps:
1.	We have two options for running the Front-End code:
-	Go to: https://huskynavigation.azurewebsites.net	
-	Open the Front-End code (i.e., the index.html file) in the browser with either the file or HTTP protocol. (HTTP protocol is recommended here. VS Code has a Live Server extension which makes this quite simple.)
2.	[If option 2 is chosen] Open the Back-End code in any code editor. Run “Server.java.” If there is a BindException when run, this means the Port 8000 is already used on your computer. If closing and re-opening the code editor, and re-running “Server.java” and the Front-End code fails, then change any instance of “8000” to some other port on your computer and do the same on the Front-End index.html file. Re-run. Repeat these steps if it fails again, though we expect it will work on the first attempt. 

Thank you and enjoy!

Video Guide Walkthrough:

https://youtu.be/ExndwEhgLXs
