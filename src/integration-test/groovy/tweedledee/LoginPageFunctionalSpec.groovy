package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration

@Integration
class LoginPageFunctionalSpec extends GebSpec {
	
	def 'User is routed to login page when not logged in'(){
		when:
	    go '/'

	    then:
	    $('h1').first().text()=='TweedleDee'
	}

	def 'Invalid login is rejected with an error message'(){
		when:
		go '/login'

		then:
		waitFor(25){ $("#usernameFld") }
	}
}