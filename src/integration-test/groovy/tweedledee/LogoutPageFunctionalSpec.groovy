package tweedledee

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import spock.lang.*

@Integration
class LogoutPageFunctionalSpec extends GebSpec {

    // Requirment: N3
    def 'Logout from tweedledee'(){
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
            $('#logoutLink').click()
            waitFor("quick"){
                $('#logoutMessage').displayed
                $("#username").isDisplayed()
                $("#password").isDisplayed()
            }
        }
    }
}