'use strict'

const Database = use('Database')
const Validator = use("Validator")
const Enrollment = use('App/Models/Enrollment')


function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
        return { error: `param: ${number} is not supported, please use param as a number` }
        
  return {}      
}

class EnrollmentController {

    async index({request}) {
        
        const {references = undefined} =request.qs
        const enrollments =  Enrollment.query()

        if (references){
            const extractedReferences = references.split(",")
            enrollments.with(extractedReferences)
        }

        return { status: 200, error: undefined , data: await enrollments.fetch()
         }
    }

    async show({ request }){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error) 
            return { status: 500, error: validatedValue.error, data: undefined }

        const enrollment = await Enrollment.find(id)

        return { status: 200, error: undefined , data: enrollment || {} }
        
    }
    async store ({request}) {
        const { mark ,student_id,subject_id}  = request.body
        const rules = {
            mark:'required',
            student_id:'required',
            subject_id:'required'

        }

        const validation =await Validator.validate(request.body,rules)

        if(validation.fails())
            return {status:422,error: validation.messages(),data: undefined}


        const enrollmemt = new Enrollment();
            enrollmemt.mark = mark;
            enrollmemt.student_id =student_id;
            enrollmemt.subject_id=subject_id;

        await enrollmemt.save()

    }
    async update ({request}){

        const {body, params} = request
        const {id} =params
        const { mark ,student_id,subject_id} = body

        const enrollment = await Enrollment.find(id)
        enrollment.merge({mark: mark,student_id:student_id,subject_id:subject_id})
        await enrollment.save()

    }
    async destroy ({request}){
        const {id} = request.params

        const enrollment = await Enrollment.find(id)
        await enrollment.delete()

    }


}

module.exports = EnrollmentController
