package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import spock.lang.*

@Ignore
@Integration
class LoginPageFunctionalSpec extends GebSpec {
	
	// Requirment: L1
	def 'User is routed to login page when not logged in'(){
		when:
	    go '/'

	    then:
	    waitFor("quick"){ $("#username") && $("#password") }
	}

	// Requirment: L3
	def 'Invalid login is rejected with an error message'(){
		when:
		go '/#/login'
		waitFor("quick"){ 
			$("#username").value("abc")
			$("#password").value("123456789")
			$("#submitBtn").click();
		}

		then:
		waitFor(){
			$("#errorMessage",text:contains("Invalid login"))
		}
	}

	// Requirment: L2
	def 'Login screen allows a user to enter username and password to gain access'(){
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
		}
	}
}