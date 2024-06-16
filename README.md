# WebApp v4

Course repo for studies in webApp version 4 at BTH spring of 2022. We are going to create a 
React Native mobile application using Expo and other related stuff. The course will create
a warehouse application where basic things like API requests, forms, login, error handeling, etc.
is learned. Once the pratice parts are done a examination project takes place and we get to
follow a made up project by the teachers or a self made project. There are certain criterias to fill
for the project but relativly free hands are given if so wished.

## Check out the application
### Alternative 1
##### Use Expo Go on you mobile device and connect through the published Expo project.
Once you have installed Expo Go on your mobile device you can use this link to access the published 
Expo project. Scan the QR code to load the application.
```
https://expo.dev/@dan_just_dan_yeah/Lager?serviceType=classic&distribution=expo-go
```

### Alternative 2
#### Clone the repo, read the code, install dependencies and run the mobile application in a simulator/emulator or on a connected mobile device.
1. Clone this repository.
   ```
   git clone https://github.com/DMoest/webApp_v4.git
   ```

2. You should be aware of Node.JS, have it installed on your machine and a package manager like 
   Yarn (or NPM). You need them to run any JavaScript application or JS-framework based app, my 
   assumption is that you already do know it and have it installed if you are here. In case not 
   you just google "How to install Node JS" and "How to install Yarn" (or NPM). There are hundreds, if 
   not thousends, of great articles on the subject. If you prefer a tutorial video search them 
   on YouTube. In case you speak/read Swedish I recommend checking this [article from the 
   DBWebb-teachers team at BTH](https://dbwebb.se/kunskap/installera-node-och-npm). Its a great 
   10min read with good step by step instructions and a few extra good to know.

3. Make sure you have Expo-CLI installed on your machine. 
   ```
   yarn add -g expo-cli
   ```

4. Install application dependencies.
   Navigate to the project root folder and execute the command.
   ```
   yarn install --dev
   ```

5. Start the application with Expo.
   ```
   expo start
   ```
   Once Expo have built the application you can easily follow the instructions in the terminal to 
   run the desired simulator, Android or iOS.

6. To run the application on your mobile device it needs to be connected to the same network as 
   the running server. Like alternative 1 you must also have Expo Go installed on your mobile 
   device to establish the connection. There are also other ways to connect in case you 
   encounter network issues, for example ist possible with a LAN tunnel. Go to you local server, 
   defaults at:
   ```
   http://localhost:19002/
   ```


There is a QR code to scan for fast and easy connection with the application once you made sure 
all the steps have been made.

For better or more accurate information on 
[using Expo, go to the source.](https://docs.expo.dev/introduction/walkthrough/)


```
Daniel Andersson, daap19
2022
```
