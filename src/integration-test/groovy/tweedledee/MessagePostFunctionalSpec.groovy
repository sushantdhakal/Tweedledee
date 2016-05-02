package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import spock.lang.Stepwise
import org.openqa.selenium.JavascriptExecutor;
import spock.lang.*

@Integration
@Stepwise
class MessagePostFunctionalSpec extends GebSpec {

	def login() {
		go '/'
		waitFor("quick") {
			$("#username").value("admin")
			$("#password").value("12345678pP")
			$("#submitBtn").click();
		}
	}

	//R0
	def 'Post a message successfully'() {
		when:
		login()
		then:
		waitFor 1.5, { $('#messageBox').value("Jonny loves politics...") }
		waitFor 1.5, { $("#addMessage").click() }
		waitFor() {
			$("div.message-list-container div.message-box h3.ng-binding").text().equals("Jonny loves politics...")
		}
	}

	//TODO: R1

	//R2
	def 'Post a message that is more than 45 characters'() {
		when:
		waitFor 1.5, { $('#messageBox').value("12345678901234567890123456789012345678901234567") }
		then:
		waitFor 1.5, { $("#addMessage").isDisabled() }
		waitFor() {
			$("div.moreCharErr span.error").text().equals("Messages are limited to only 45 characters")
		}
	}

	def logout() {
		$('#logoutLink').click()
		waitFor("quick"){
			$('#logoutMessage').displayed
			$("#username").isDisplayed()
			$("#password").isDisplayed()
		}
	}
}

