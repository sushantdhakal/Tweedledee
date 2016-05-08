# Tweedledee_App
This repository contains development code for TweedleDee, a social media platform, similar to Twitter. This project was implemented to fulfill the graduate degree requirements for Master's in Computer Software Engineering at the University of Minnesota.

The primary contributors to this project are: Paul Michalek and Sushant Dhakal
 <h1>Phase IV<h1>
 This release is primarily pertinent to implementing the following requirements
  * Allow for the logged in user to post a new message.
  * Use a alert control from the Angular UI library to display an info message saying ‘Message Posted!’
  * Use Angular validation to validate a message prior to posting it to the server via the REST API (client side validation).
  * Write a Jasmine test to validate the Angular controller the message posting from the first requirement
  * Create an Angular directive to display the follow button or “Following User” indicator on another user’s account page. Validate this control with either a functional test or a Jasmine test
  * Use the AngularJS date filter to format the date of a message in the feed in this style: Mar 16. Validate with a functional test.

  Additionally this release also includes some other extra features beyond the requirements. These extra features include:
  * Sign up for TweedleDee.
  * Repost message posted by you or any other users.
  * Delete your message.

<h1>Phase III</h1>
This release is primarily pertinent to implementing the front end and some backend for TweedleDee. Additionally this release also includes UI automation code to test all the fundamental requirements. The UI implementation include:
* Login and logout features using valid username and password
* Viewing and updating user profile details
* Searching for messages posted by anybody using the application
* View profile details of other users who are registered with TweedleDee
* Follow other users  
<h1>Frontend Implementation</h1>
<h3>Technologies Used:</h3>
* AngularJS
* HTML
* CSS3/Bootstrap

<h1>Build Steps</h1>
This section highlights the build steps for TweedleDee.
* gradlew clean idea
* gradlew clean build

<h1>Backend Implementation</h1>
* Grails
* Spring security

<h1>Test/Automation</h1>
* Geb
* Karma
* Jasmine
