const Queue = require('bull')
const q = new Queue('my-first-queue')

setTimeout(async () => {
    const data = { message: "my task" }
    await q.add(data)
}, 100)


q.process(async (job, done) => {
    done(null, 'succes')
})

q.on('completed', (job) => {
    console.info(
        `${job.queue.name} task has been completed with message: "${job.data.message}" on: ${new Date().toLocaleTimeString()}`
    )
    job.remove()
})