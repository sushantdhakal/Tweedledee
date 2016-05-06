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
@Ignore
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
		waitFor 1, {$("div.alert div span.ng-binding").text().equals("New messages successfully added!")}
	}

	//R2
	def 'Do not post a message that is more than 45 characters'() {
		when:
		waitFor 1.5, { $('#messageBox').value("12345678901234567890123456789012345678901234567") }
		then:
		waitFor 1.5, { $("#addMessage").isDisabled() }
		waitFor() {
			$("div.moreCharErr span.error").text().equals("Messages are limited to only 45 characters")
		}
	}

	//R4
	def 'Display follow button'(){
		when:
		waitFor 1.5, { $("div.followers p i.fa strong").displayed }
		then:
		waitFor() {
			$("div.followers ul.list-inline li.ng-scope a.ng-binding").click()
			sleep(1500)
			$("div.profile-handle-container ul.line-inline li.ng-isolate-scope div button").displayed
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

