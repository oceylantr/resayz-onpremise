# resayz - Build your own on-premise serverless Whatsapp image resize with Nodejs & Nuclio

This is the on-premise code inspired from Whatsapp image resize, and beyond the light idea of implementing it on an on-premise solution. 

Code has 2 parts:

1-  Serverless function, to download a pre-selected Http cat image from Internet and resize

2-  A simple file server, to push file and see it in browser

Full code detail at https://github.com/oceylantr/resayz-onpremise

## Getting Started

### Prerequisites

1-  Linux distro (tried on Ubuntu 16.04 LTS)

2-  A ready, helloWorld running Docker installation. If you are about to setup Docker-CE, you can refer to http://oguzhanceylan.com/2018/03/03/docker-ce-installation-on-fresh-ubuntu-16-04/

3- Docker-compose. If you are about to install Docker-compose please refer to https://docs.docker.com/compose/install/

3- Chmod -R 777 (a general precaution for not struggling with permissions)

4- Git

### Installing File Server (Cute Cat Server)

Download code with below command on your working directory:

```
sudo git clone https://github.com/oceylantr/resayz-onpremise.git
```

Give all permission for passing security phase now:

```
sudo chmod -R 777 resayz-onpremise
```

Get in the code 

```
cd resayz-onpremise
```

Firstly, we have code at File Server part waiting for build

```
cd cute-cat-server
sudo docker build -t cute-cat-server-image .
```

Let's run our file server with recently created cute-cat-server image !!

```
sudo docker run -p 3000:3000 --name cute-cat-server cute-cat-server-image
```

### Installing Nuclio and Our Resayz Function

Please run following command to run Nuclio Playground:

```
sudo docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp nuclio/playground:stable-amd64
```
After installation you will see Nuclio Playground server running. Now it is time to create our function on playground. Click New, name it "resayz", runtime is "Nodejs"

## Verifiying installation

In file server, if you see an expression like that, everything is ok in that part:

"Express server listening on port 3000"








We should see 8 containers running: Influxdb, Telegraf, Chronograf, Kapacitor, Influx CLI, Kapacitor CLI

### Check frontend

Check localhost/index.htm in browser on your host OS

### Check backend

Check localhost:8066 in browser on your host OS. If it is saying like "Selam dokka", HapiJS backend is serving main entrypoint of Rest part successfully

### Check Chronograf

Check localhost:8888 in browser on your host OS. It should be coming, Chronograf's black, kool page

## Configuring Showcase

Open localhost/index.htm and make 3 sets of moves:

![alt text](client.png)

In each set you will click Golf, Polo and Jetta buttons few times and wait for a 10-15 seconds until new set. We are making this for Telegraf to transfer clickstream values in periods, that peroiding is one of main features of timeseries db's

Now everything is ready to make good-lookin graphs on Chronograf. Please open localhost:8888 and go to Dashboards link at left. Create a dashboard and add a Graph. Below Cell Editor, with Plus button make 3 queries and fill them with below sequentially

```
SELECT "value" FROM "telegraf"."autogen"."Golf" WHERE time > :dashboardTime:
SELECT "value" FROM "telegraf"."autogen"."Polo" WHERE time > :dashboardTime:
SELECT "value" FROM "telegraf"."autogen"."Jetta" WHERE time > :dashboardTime:
```

![alt text](result.png)

## Built With

* [InfluxData Tick Stack](https://www.influxdata.com/time-series-platform/) - No:1 Timeseries db and Util pack
* [HapiJS](https://hapijs.com/) - A NodeJS stack build in WalmartLabs with great plugin architecture
* [Docker](https://www.docker.com/) - You know what it is I think

## Authors

* **Oğuzhan Ceylan** - *Initial work* - [oceylantr](https://github.com/oceylantr)

## License

This project is licensed under the GPL v3.0 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* InfluxDB - Tick Stack (Thanks to https://github.com/influxdata/TICK-docker/blob/master/README.md)
* HapiJS Rest Backend (Thanks to Joseph Jude when containerizing Hapi-Node backend https://jjude.com/hapijs-on-docker/)
* Frontend Webserver Docker image (Thanks to https://hub.docker.com/r/taka0225/alpine-http-server/)
