package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import org.junit.BeforeClass
import spock.lang.Ignore
import spock.lang.Stepwise

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
    def 'Search Box is for provided finding messages'() {
        when:
        login()

        then:
        sleep(1500)
        $('#searchBox').value("message")
        sleep(1500)
        $("#searchBtn").click()
        waitFor(){
            $('#userMessagesList').displayed
        }
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
   /* def 'Clicking on the posting user will route to user details page'(){
        when:
          login()
        then:
        sleep(1500)
        $('#searchBox').value("message")
        sleep(1500)
        $("#searchBtn").click()
        waitFor(){
            $('#userMessagesList').displayed
            $("div.message-list").find('a')
        }
    }*/
}