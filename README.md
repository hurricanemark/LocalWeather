# LocalWeather
Use geolocation to get current position in longitude and latitude.  Then query for weather statistics given the lng-lat value.


## View It Here

[Weather Report on your current location](https://thoracic-past-rainbow.glitch.me/)


## NodeJS and Express

I recently wrote this Local Weather app using cloud replit where the bootstraping of node JS is hidden.  All I had to do was to focus on the core logic in app.js, style.css, and index.html.  To create a fully functional development environment locally, I needed to bootstrap NodeJS, Express to my replit code.  Here is how I add bootstrap to my Nodejs project.

Step 1:  Migrate replit code to local VSCode.
    Create a folder for your project.  Create sub folders 
    
    `mkdir views`

    `mkdir public`

Step 2:  Initialize the folder as a node project
    
    ` npm init -y`

Step 3:  Install *express* to confiure a lightweight Node server
    
    `npm install express`

Step 4:  Install *helmet* to configure runtime security
    
    `nmp install helmet`

Now, we are good to start developming and runing from VSCode.

### Project layout

It is a typical NodeJS project layout.  

'app.js' - server file

'./public/script.js' - interface to https://weather-proxy.freecodecamp.rocks/api/

'./views/index.html' - presentation 

## Runtime

`npm start`

<strong>Output</strong>

![codepen.io output](./public/Runtime.PNG)

## Build and Run Docker Image

Build a docker image base on the given Dockerfile and .dockerignore is this folder.  After successful docker build, run the image to verify correctness.  Then it can be pushed to dockerhub or your favorite cloud provider.  

### Build
Docker container is built and saved to current working directory.  Replace tag name 'hurricanemark' with your own username.

`docker build -t hurricanemark/localweather:1.0 .`

```
[+] Building 139.3s (11/11) FINISHED
 => [internal] load build definition from Dockerfile                                              0.1s 
 => => transferring dockerfile: 210B                                                              0.1s 
 => [internal] load .dockerignore           
...
 => [internal] load build context                                                                 0.8s 
 => => transferring context: 143.24kB                                                             0.6s 
 => [2/5] WORKDIR /app                                                                            1.2s 
 => [3/5] COPY package.json ./                                                                    0.1s 
 => [4/5] RUN npm install                                                                         6.6s 
 => [5/5] COPY . .                                                                                0.2s 
 => exporting to image                                                                            0.4s 
 => => exporting layers                                                                           0.3s 
 => => writing image sha256:bb89b0646be41055287fdac18ea1e405a2a19ef4b2919a0a02c213b9dc947b34      0.0s 
 => => naming to docker.io/hurricanemark/localweather:1.0    
```

** List the image **

```
PS D:\DEVEL\NODEJS\BrainUnscramblers\LocalWeather> docker image ls
REPOSITORY                   TAG         IMAGE ID       CREATED         SIZE
hurricanemark/localweather   1.0         bb89b0646be4   6 minutes ago   949MB
```

### Run docker

Note that Dockerfile exposes port 8080.  This needs to be forwarded to a port on your local machine.  i.e. LOCAL_PORT:CONTAINER_PORT for example  4321:8080

`docker run -p 4321:8080 bb89b0646be4`

```
PS D:\DEVEL\NODEJS\BrainUnscramblers\LocalWeather> docker run -p 4321:8080 bb89b0646be4

> LocalWeather@1.0.0 start /app
> node app.js

Local Weather is listening on port 8080
```

To access the Local Weather app running in docker container, point your browser to the forwarding port 4321.

`http:/localhost:4321`
