# messagingSystem

This is a messaging system. With the below features

* Read lines from a file (input.txt)
* Write lines to a queue service via a network protocol
* Read lines from the queue service via a network protocol
* Write lines to a file (output.txt)

# How to run
prerequisite is to have the rabbitMQ running locally, see the installation guide below

``` npm start ```

# Tasks requirements
* Documentation on how to run your solution ✅ (You are currently into it)
* Queuing service needs to be written with only stdlib of your language of choice ✅ (We are using nodejs fs)
* An arbitrary ASCII text file fed into the solution should produce an identical copy ✅ (We do not mutate the text)


# Refs
## Tutorial with amqplib
https://www.npmjs.com/package/amqplib

## Tutorial rabbitMQ with javascript
https://www.rabbitmq.com/tutorials/tutorial-one-javascript

## Install rabbitMQ locally
https://www.rabbitmq.com/docs/download

