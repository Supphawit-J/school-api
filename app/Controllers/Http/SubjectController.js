'use strict'

const Database = use('Database')
const Validator = use("Validator")
const Subject = use('App/Models/Subject')


function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
        return { error: `param: ${number} is not supported, please use param as a number` }
        
  return {}      
}

class SubjectController {

    async index({request}) {

        const {references = undefined} =request.qs
        const subjects =  Subject.query()

        if (references){
            const extractedReferences = references.split(",")
            subjects.with(extractedReferences)
        }


        return { status: 200, error: undefined , data: await subjects.fetch() }

    }

    async show({ request }){

        const { id } = request.params
        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error) 
            return { status: 500, error: validatedValue.error, data: undefined }

        const subject = await Subject.find(id)
    


        return { status: 200, error: undefined , data: subject || {} }
        
    }

    async store ({request}) {

        const { title , teacher_id }  = request.body

        const rules = {title:'required'}

        const validation =await Validator.validate(request.body,rules)

        if(validation.fails())
            return {status:422,error: validation.messages(),data: undefined}

        
        const subject = new Subject();
        subject.title = title;
        subject.teacher_id = teacher_id;

        await subject.save()
    
    }
    async update ({request}){

        const {body, params} = request
        const {id} = params
        const { title ,teacher_id } = body
        const subject = await Subject.find(id)

        subject.merge({title: title , teacher_id: teacher_id})
         await subject.save()

    }
    async destroy ({request}){
        const {id} = request.params

       
        const subject = await Subject.find(id)
        await subject.delete()


    }


}

module.exports = SubjectController
