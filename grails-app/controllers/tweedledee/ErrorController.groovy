package tweedledee

class ErrorController {

	def internalServerError() {
		response.status = 500
		render(contentType: 'application/json') {
			error = response.status
			message = 'Internal server error'
		}
	}

	def unauthorized() {
		response.status = 401
		render(contentType: 'application/json') {
			error = response.status
			message = 'Unauthorized Request'
		}
	}

	def forbidden() {
		response.status = 403
		render(contentType: 'application/json') {
			error = response.status
			message = 'Forbidden Request'
		}
	}

	def notFound() {
		response.status = 404
		render(contentType: 'application/json') {
			error = response.status
			message = 'Not found'
		}
	}
	
	def notallowed(){
		response.status=405
		render(contentType:'application/json') { 
			error=response.status
			message='Request Not Allowed' 
		}
	}

	def unprocessable(){
		response.status=422
		render(contentType:'application/json') { 
			error=response.status
			message='Request was well-formed but was unable to be followed due to semantic errors. Most likely due to passing an incorrect or invalid value.' 
		}
	}

}
