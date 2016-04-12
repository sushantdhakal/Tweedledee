package tweedledee

import grails.test.mixin.TestFor
import grails.test.mixin.TestMixin
import grails.test.mixin.domain.DomainClassUnitTestMixin
import spock.lang.Specification
import spock.lang.Unroll

@TestFor(Message)
@TestMixin(DomainClassUnitTestMixin)
class MessageSpec extends Specification {

    def messagesBeforeSave

    def setup() {
        messagesBeforeSave = Message.count()
    }

    /**
     * Test 1
     * Requirement: M1
     * Desc: Save message when all required fields are specified
     */

    def 'Message saves when required fields are specified'(){

        given:
        def acct = Mock(Account)
        def mText = '1'*40
        def mParams = [ account:acct, text:mText ]
        def mesg = new Message(mParams)

        when:
        mesg.save()

        then:
        mesg.id
        !mesg.hasErrors()
        Message.count() == messagesBeforeSave + 1
        Message.get(mesg.id)
    }

    /**
     * Test 2
     * Requirement: M2
     * Desc: Data driven test on save message with both valid and invalid values for 'text' property
     */
    @Unroll
    def 'Message saves when all required fields are entered with valid data: #desc'(){

        given:

        def acct = Mock(Account)
        def mParams = [ account:acct, text:mText ]
        def mesg = new Message(mParams)
        mesg.save()

        expect:
        mesg.hasErrors()

        where:
        desc              | mText
        "null value"      | null
        "0 characters"    | ''
        "42 characters"   | '1'*42
    }

}
