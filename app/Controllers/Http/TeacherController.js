'use strict'

const Database = use('Database')
const Hash = use('Hash')


function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
        return { error: `param: ${number} is not supported, please use param as a number` }
        
  return {}      
}


class TeacherController {
    async index() {
        const teachers = await Database.table('teachers')

        return { status: 200, error: undefined , data: teachers
         }
    }
    async show({ request }){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error) 
            return { status: 500, error: validatedValue.error, data: undefined }

        const teacher = await Database
            .select('*')
            .from('teachers')
            .where("teacher_id",id)
            .first()

        return { status: 200, error: undefined , data: teacher || {} }
        
    }
    async store ({request}) {
        const { first_name , last_name , email , password }  = request.body

        const missingKeys = [] 

        if (!first_name) {missingKeys.push('first_name')}
        if (!last_name) {missingKeys.push('last_name')}
        if (!email) {missingKeys.push('email')}
        if (!password) {missingKeys.push('password')}

        if(missingKeys.length)
            return {status: 422 , error: `${missingKeys} is missing.`, data: undefined}



        const hashedPassword = await Hash.make(password)
        const teacher = await Database
            .table('teachers')
            .insert({first_name,last_name,email,password: hashedPassword })

        return teacher
    }
    async update ({request}){

        const {body, params} = request
        const {id} =params
        const { first_name , last_name , email } = body

        const teacherId = await Database
            .table('teachers')
            .where({teacher_id: id})
            .update({ first_name , last_name , email})
 
        const teacher = await Database
            .table('teachers')
            .where({teacher_id: teacherId})
            .first()

            return {status: 200 , error: undefined, data: teacher
            }

    }
    async destroy ({request}){
        const {id} = request.params

        await Database.table('teachers').where({teacher_id: id }).delete()
        return {status: 200,error: undefined, data: {message: 'success'}}


    }


}

module.exports = TeacherController
