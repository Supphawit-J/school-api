'use strict'

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
        return { error: `param: ${number} is not supported, please use param as a number` }
        
  return {}      
}

class SubjectController {

    async index() {
        const subjects = await Database.table('subjects')

        return { status: 200, error: undefined , data: subjects
         }
    }

    async show({ request }){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error) 
            return { status: 500, error: validatedValue.error, data: undefined }

        const subject = await Database
            .select('*')
            .from('subjects')
            .where("subject_id",id)
            .first()

        return { status: 200, error: undefined , data: subject || {} }
        
    }
    async store ({request}) {
        const { title }  = request.body

        const missingKeys = [] 

        if (!title) {missingKeys.push('first_name')}
        

        if(missingKeys.length)
            return {status: 422 , error: `${missingKeys} is missing.`, data: undefined}



    
        const subject = await Database
            .table('subjects')
            .insert({title})

        return subject
    }

}

module.exports = SubjectController
