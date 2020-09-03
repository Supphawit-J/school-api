'use strict'

module.exports = (cli , runner) => {
    runner.before(async () =>{
        use('Adonis/Src/Server').listen(process.env.HOST, process.env.PORT)
    })

    runner.after(async() => {
        use('Adonis/Src/Server').getInstance().close()
    })


}