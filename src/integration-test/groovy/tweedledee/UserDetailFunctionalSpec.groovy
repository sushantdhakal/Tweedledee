package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import spock.lang.*

@Integration
class UserDetailFunctionalSpec extends GebSpec {

	@Shared
	def user


	def setup(){
		user=[handle:'admin',name:'admin',password:'12345678pP',email:'admin@admin.com']
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value(user.name)
			$("#password").value(user.password)
			$("#submitBtn").click();
		}
	}

	// Requirment: U1.1
	/*def 'User detail page will display the current user name'(){
		when:
		user

		then:
		waitFor(){
			$("#profileName").text().contains(user.name)
		}
	}*/
	// Requirment: U1.2
	def 'User detail page will contain a list of message for the current user'(){
		when:
		user
		def mesgDiv=$("#userMessagesList")

		then:
		$("#userMessagesList")
		waitFor(){
			//browser.driver.executeScript("arguments[0].scrollIntoView();",mesgDiv)
		}
	}

}