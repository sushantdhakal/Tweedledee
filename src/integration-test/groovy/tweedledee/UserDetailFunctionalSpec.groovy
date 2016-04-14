package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration

@Integration
class UserDetailFunctionalSpec extends GebSpec {

	@Shared
	def user

	def setUp(){
		user=[handle:'admin',name:'admin',password:'12345678pP',email:'admin@admin.com']
	}
	// Requirment: U1
	def 'User''s detail page will display the user''s name as well as a scrollable list of that user''s postings'(){
		when:
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value("admin")
			$("#password").value("12345678pP")
			$("#submitBtn").click();
		}

		then:
		waitFor(){
			currentUrl.contains "profile"
			$("#profileName",text:contains())
		}
	}

}