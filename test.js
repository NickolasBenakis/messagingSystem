// //https://www.npmjs.com/package/amqplib
// const amqplib = require("amqplib");

// (async () => {
// 	const queue = "tasks";
// 	const conn = await amqplib.connect("amqp://localhost");

// 	const ch1 = await conn.createChannel();
// 	await ch1.assertQueue(queue);

// 	// Listener
// 	ch1.consume(queue, (msg) => {
// 		if (msg !== null) {
// 			console.log("Received:", msg.content.toString());
// 			ch1.ack(msg);
// 		} else {
// 			console.log("Consumer cancelled by server");
// 		}
// 	});

// 	// Sender
// 	const ch2 = await conn.createChannel();

// 	setInterval(() => {
// 		ch2.sendToQueue(queue, Buffer.from("something to do"));
// 	}, 1000);
// })();

const amqp = require("amqplib");

async function connectToRabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
		console.log("Connected to RabbitMQ!");
	} catch (error) {
		console.error("Error connecting to RabbitMQ:", error);
	}
}

connectToRabbitMQ();
