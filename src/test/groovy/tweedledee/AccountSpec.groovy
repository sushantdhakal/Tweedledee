package tweedledee

import grails.test.mixin.TestFor
import grails.test.mixin.TestMixin
import grails.test.mixin.domain.DomainClassUnitTestMixin
import spock.lang.Specification
import spock.lang.Unroll

@Unroll
@TestFor(Account)
@TestMixin(DomainClassUnitTestMixin)
class AccountSpec extends Specification {

    /**
     * Test 1
     * Requirement: A1
     * Desc: Save account when all required fields are specified
     */
    def 'Account saves successfully when all required fields are specified'(){

        given:
        def accountsBeforeSave = Account.count()
        def aParams = [ handle : "TedX1", name : "Teddy T", email : "ttx1@gmail.org", password : '12345678Az' ]
        def acct = new Account(aParams)

        when:
        acct.save()

        then:
        acct.id
        !acct.hasErrors()
        Account.count() == accountsBeforeSave+1
        Account.get(acct.id)
    }

    /**
     * Test 2
     * Requirement: A2
     * Desc: Save account fails if any required fields are missing
     */
    def 'Account save fails when required fields are missing: #desc'(){

        given:
        def accountsBeforeSave = Account.count()
        def aParams = [ handle : testHandle, name : testName, email : testEmail, password : testPassword ]
        def acct = new Account(aParams)

        when:
        acct.save()

        then:
        acct.hasErrors()
        !acct.id
        Account.count() == accountsBeforeSave

        where:
        desc                  |  testHandle       |  testName |  testEmail    |  testPassword
        "missing handle"      |  ""               |  "Ted"    |  "a@b.com"    |  "12345678aA"
        "missing name"        |  "trox"           |  ""       |  "a@b.com"    |  "12345678aA"
        "missing email"       |  "trox"           |  "Ted"    |  ""           |  "12345678aA"
        "missing password"    |  "trox"           |  "Ted"    |  "a@b.com"    |  ""

    }

    /**
     * Test 3
     * Requirement: A3
     * Desc: Save account fails if an invalid password is entered
     */

    /*
    def'Account save fails if invalid password is entered: #desc'(){

        given:
        def accountsBeforeSave = Account.count()
        def aParams = [ handle : "TedX9", name : "Ted", email : "ted@bla.com", password : testPassword ]
        def acct = new Account(aParams)

        when:
        acct.save()

        then:
        acct.hasErrors()
        acct.errors.getFieldError('password')
        !acct.id
        Account.count() == accountsBeforeSave

        where:
        desc                      |  testPassword
        "less than 8 chars"       |  "1234567"
        "over than 16 chars"      |  "123456789012345678"
        "no upper case chars"     |  "12345678a"
        "no lower case chars"     |  "12345678A"
    }
    */

}

