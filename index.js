const fs = require("fs");
const amqp = require("amqplib");

async function readFileAndWriteToQueue(filename) {
	const file = fs.createReadStream(filename);
	let line = "";
	for await (const fileChunk of file) {
		line += fileChunk.toString();
		const lines = line.split("\n");
		line = "";
		for (const line of lines) {
			if (line) {
				await writeQueue(line);
			}
		}
	}
}

async function writeQueue(line) {
	try {
		const connection = await amqp.connect("amqp://localhost");
		const channel = await connection.createChannel();

		await channel.assertQueue("corti", { durable: true });
		await channel.sendToQueue("corti", Buffer.from(`${line}\n`));
		await channel.close();

		await connection.close();
	} catch (error) {
		console.error("error while connecting/writting in queue", error);
	}
}

async function writeToFile(line) {
	fs.appendFile("output.txt", `${line}\n`, (err) => {
		if (err) {
			console.error(err);
		}
	});
}

async function readQueue() {
	const connection = await amqp.connect("amqp://localhost");
	const channel = await connection.createChannel();

	await channel.assertQueue("corti", { durable: true });

	channel.consume("corti", (msg) => {
		if (msg) {
			console.log(`Received: ${msg.content.toString()}`);
			writeToFile(msg.content.toString());
		}
	});
}

readFileAndWriteToQueue("input.txt"); // this could be a single worker/service that writes to the queue
readQueue(); // this could be a single worker/service that reads from the queue
