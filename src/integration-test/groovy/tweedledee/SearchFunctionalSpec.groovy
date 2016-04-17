package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import org.junit.BeforeClass
import spock.lang.Ignore
import spock.lang.Stepwise
import org.openqa.selenium.JavascriptExecutor;

@Integration
@Stepwise
@Ignore
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

        then:
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
            // !($("#userMessagesList").displayed)
            $("#searchResultsNotFound").text().contains("No Messages Found.")
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
        $("div.row div.col-md-6 ul.list-inline li div.view-handle").text().contains("mikeCalvo")
        $("div.row div.col-md-6 ul.list-inline li span.user-detail-text").text().contains("Mike Calvo")
    }
}

