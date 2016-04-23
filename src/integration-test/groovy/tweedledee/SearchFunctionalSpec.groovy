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
        sleep(2000)
        waitFor("quick") {
            $('#searchBox').isDisplayed()
        }
    }

    // S2.1
    def 'Search Box is for provided finding messages and checks for scrollable element'() {
        when:
        login()

        then:
        sleep(1500)
        $('#searchBox').value("message")
        sleep(1500)
        $("#searchBtn").click()

        $('#userMessagesList').displayed
        def scrollProof = 	"var style = window.getComputedStyle(document.getElementById('userMessagesList'), null);"+
                "var vHeight = parseInt(style.getPropertyValue('height'));"+
                "var sHeight = document.getElementById('userMessagesList').scrollHeight;"+
                "return (sHeight > vHeight) ? true : false;"
        sleep(5000)
        browser.driver.executeScript(scrollProof)
    }

    // S2.2

    def 'Search with invalid message search will display error message'(){
        when:
        login()

        then:
        sleep(1500)
        $("#searchBox").value("Hello There")
        sleep(1500)
        $("#searchBtn").click()
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
        sleep(1500)
        $('#searchBox').value("message")
        sleep(1500)
        $("#searchBtn").click()
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
        sleep(1500)
        $('#searchBox').value("message")
        sleep(1500)
        $("#searchBtn").click()
        waitFor() {
            $('#userMessagesList').displayed
            $("div.message-list").find('a').click()
        }
        sleep(1500);
        $("div.row div.col-md-6 ul.list-inline li.view-handle").text().contains("mikeCalvo")
        $("div.row div.col-md-6 ul.list-inline li.user-detail-text span.ng-binding").text().contains("Mike Calvo")
    }
}

