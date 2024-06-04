const amqp = require("amqplib");

async function readQueue() {
	const conn = await amqp.connect("amqp://localhost");
	const channel = await conn.createChannel();
	await channel.assertQueue("my_queue", { durable: true });
	channel.consume("my_queue", (msg) => {
		if (msg) {
			console.log(`Received: ${msg.content.toString()}`);
			writeToFile(msg.content.toString());
		}
	});
}

async function writeToFile(line) {
	fs.appendFile("output.txt", `${line}\n`, (err) => {
		if (err) {
			console.error(err);
		}
	});
}
