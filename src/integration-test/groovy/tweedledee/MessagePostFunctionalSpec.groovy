package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import spock.lang.Stepwise
import org.openqa.selenium.JavascriptExecutor;
import spock.lang.*
import java.text.SimpleDateFormat
import java.text.ParseException

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

	//R1
	def 'AngularUI alert control to display confirmation for message posting'(){
		when:
		waitFor 1, {$("div.message-list-container div.message-box h3.ng-binding").text().equals("Jonny loves politics...")}
		then:
		waitFor 1, {$("div.alert div span.ng-binding").text().equals("You've posted a new message.")}
	}

	//R2
	def 'Do not a message that is more than 45 characters'() {
		when:
		waitFor 1.5, { $('#messageBox').value("12345678901234567890123456789012345678901234567") }
		then:
		waitFor 1.5, { $("#addMessage").isDisabled() }
		waitFor() {
			$("div.moreCharErr span.error").text().equals("Messages are limited to only 45 characters")
		}
	}

	//R5
	def 'Validate date format for message post'(){
		when:
		waitFor() {
			$("div.message-list-container div.message-box p.ng-binding").displayed
		}
		then:
		SimpleDateFormat dateFormat = new SimpleDateFormat("MMM-dd");
		dateFormat.setLenient(false);
		try {
			dateFormat.parse($("div.message-list-container div.message-box p.ng-binding").text().trim());
			true
		} catch (ParseException pe) {
			false
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

