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
class Assignment4FunctionalSpec extends GebSpec {

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
		waitFor 5, { $('#messageBox').value("Jonny loves politics...") }
		waitFor 5, { $("#addMessage").click() }
		waitFor() {
			$("div.message-list-container div.message-box h3.ng-binding").text().equals("Jonny loves politics...")
		}
	}

	//R1
	def 'AngularUI alert control to display confirmation for message posting'(){
		when:
		waitFor 5, {$("div.message-list-container div.message-box h3.ng-binding").text().equals("Jonny loves politics...")}
		then:
		waitFor 5, {$("div.alert div span.ng-binding").text().equals("New message successfully added!")}
	}

	//R2
	def 'Do not post a message that is more than 45 characters'() {
		when:
		waitFor 5, { $('#messageBox').value("12345678901234567890123456789012345678901234567") }
		then:
		waitFor 5, { $("#addMessage").isDisabled() }
		waitFor() {
			$("div.moreCharErr span.error").text().equals("Messages are limited to only 45 characters")
		}
	}

	//R4
	def 'Display follow button using directive'(){
		when:
		waitFor 5, { $("#following_sushantdhakal").displayed }
		then:
		sleep(2000)
		$("#following_sushantdhakal").click()
		sleep(2000)
		$("#follower_paulM").click()
		sleep(2000)
		$("#follower_mikeCalvo").click()
		sleep(2000)
		$("#followMeNow").isDisplayed()
	}

	//R5
	def 'Validate date format for message post'(){
		when:
		waitFor() {
			$("div.message-list-container div.message-box p.ng-binding").displayed
		}
		then:
		def todaysDate = new Date()
		SimpleDateFormat dateFormat = new SimpleDateFormat("MMM d");
		dateFormat.setLenient(false);
		try {
			waitFor 5, { $("div.message-list-container div.message-box p.ng-binding").text().trim().equalsIgnoreCase(dateFormat.format(todaysDate).toString().trim()) }
		} catch (ParseException pe) {
			throw pe
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

