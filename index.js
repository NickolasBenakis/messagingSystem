const fs = require("fs");
const amqp = require("amqplib");

async function readFile(filename) {
	const file = fs.createReadStream(filename);
	let line = "";
	for await (const chunk of file) {
		line += chunk.toString();
		const lines = line.split("\n");
		line = "";
		for (const l of lines) {
			if (l) {
				await writeQueue(l);
			}
		}
	}
}

async function writeQueue(line) {
	try {
		const conn = await amqp.connect("amqp://localhost");
		const channel = await conn.createChannel();
		await channel.assertQueue("corti", { durable: true });
		await channel.sendToQueue("corti", Buffer.from(`${line}\n`));
		await channel.close();
		await conn.close();
	} catch (error) {
		console.error("error while writing in queue", error);
	}
}

async function writeToFile(line) {
	fs.appendFile("input.txt", `${line}\n`, (err) => {
		if (err) {
			console.error(err);
		}
	});
}

async function readQueue() {
	const conn = await amqp.connect("amqp://localhost");
	const channel = await conn.createChannel();
	await channel.assertQueue("corti", { durable: true });
	channel.consume("corti", (msg) => {
		if (msg) {
			console.log(`Received: ${msg.content.toString()}`);
			writeToFile(msg.content.toString());
		}
	});
}

readFile("input.txt");
readQueue();
