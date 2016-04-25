package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import spock.lang.Stepwise
import org.openqa.selenium.JavascriptExecutor;
import spock.lang.*

@Ignore
@Integration
@Stepwise
class SearchFunctionalSpec extends GebSpec {

    def login() {
        go '/'
        waitFor("quick") {
            $("#username").value("admin")
            $("#password").value("12345678pP")
            $("#submitBtn").click();
        }
    }

    //S1 and N2
    def 'Search Box is displayed'(){
        when: 'n'
        login()
        then:
        waitFor 2, { $('#searchBox').isDisplayed() }
    }

    // S2.1
    def 'Search Box is for provided finding messages and checks for scrollable element'() {
        when:
        login()

        then:
        waitFor 1.5, { $('#searchBox').value("message") }
        waitFor 1.5, { $("#searchBtn").click() }

        $('#userMessagesList').displayed
        def scrollProof = 	"var style = window.getComputedStyle(document.getElementById('userMessagesList'), null);"+
                "var vHeight = parseInt(style.getPropertyValue('height'));"+
                "var sHeight = document.getElementById('userMessagesList').scrollHeight;"+
                "return (sHeight > vHeight) ? true : false;"
        waitFor 5, { browser.driver.executeScript(scrollProof) }
    }

    // S2.2

    def 'Search with invalid message search will display error message'(){
        when:
        login()

        then:
        waitFor 1.5, { $("#searchBox").value("Hello There") }
        waitFor 1.5, { $("#searchBtn").click() }
        waitFor() {
            $('#searchResultsNotFound').displayed
            $("#searchResultsNotFound").text().contains("No Messages Found.")
        }
    }

    //S3
    def 'Search result will display message and handle'(){
        when:
          login()
        then:
        waitFor 1.5, { $('#searchBox').value("message") }
        waitFor 1.5, { $("#searchBtn").click() }
        waitFor() {
            $('#userMessagesList').displayed
            $("div.message-list ul.list-unstyled li.ng-scope span.message-text").text().contains("This is Mike's message")
            $("div.message-list ul.list-unstyled li.ng-scope a.ng-binding").text().equalsIgnoreCase("mikeCalvo")
        }
    }

    //S4
    def 'Clicking on the posting user will route to user details page'() {
        when:
        login()
        then:
        waitFor 1.5, { $('#searchBox').value("message") }
        waitFor 1.5, { $("#searchBtn").click() }
        waitFor() {
            $('#userMessagesList').displayed
            $("div.message-list").find('a').click()
        }
        waitFor 1.5, { $("div.row div.col-md-6 ul.list-inline li.view-handle").text().contains("mikeCalvo") }
        $("div.row div.col-md-6 ul.list-inline li.user-detail-text span.ng-binding").text().contains("Mike Calvo")
    }
}

