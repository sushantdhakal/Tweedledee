package tweedledee

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification
import spock.lang.Ignore

@Ignore
@Integration
@Rollback
class AccountIntTestSpec extends Specification {

    def accountsBeforeSaves

    def setup() {
        accountsBeforeSaves = Account.count()
    }

    /**
     * Test 1
     * Requirement: A4
     * Desc: Saving account with unique e-mail but non-unique handle
     */
    def 'Saving account with unique e-mail but non-unique handle'() {
        setup:
        def firstAccount = new Account(handle: 'TheRealSeanJohnson', name: 'Sean Johnson', email: 'johnsanSean@gmail.com', password: 'Orange1234')
        def secondAccount = new Account(handle: 'TheRealSeanJohnson', name: 'Sean Johnson', email: 'seanJohnson@gmail.com', password: 'Orange1234')

        when:
        firstAccount.save(failOnError: false)
        secondAccount.save(failOnError: false)

        then:
        firstAccount.id
        !secondAccount.id
        secondAccount.errors.getFieldError('handle')
        Account.count() == accountsBeforeSaves + 1
    }

    /**
     * Test 2
     * Requirement: A4
     * Desc: Saving account with unique handle but non-unique email
     */

    def 'Saving account with unique handle but non-unique email'() {
        setup:
        def firstAccount = new Account(handle: 'WillSmith', name: 'Sean Johnson', email: 'WillSmith@gmail.com', password: 'Orange1234')
        def secondAccount = new Account(handle: 'TheRealWillSmith', name: 'Sean Johnson', email: 'WillSmith@gmail.com', password: 'Orange1234')


        when:
        firstAccount.save(failOnError: false)
        secondAccount.save(failOnError: false)

        then:
        firstAccount.id
        !secondAccount.id
        secondAccount.errors.getFieldError('email')
        Account.count() == accountsBeforeSaves + 1
    }

    /**
     * Test 3
     * Requirement: F1
     * Desc:  An account may have multiple followers
     */

    def ' An account may have multiple followers'() {
        setup:
        def firstAccount = new Account(handle: 'superman', name: 'Clark Kent', email: 'kent@krypton.com', password: 'Banana1234')
        def secondAccount = new Account(handle: 'batman', name: 'Bruce Wayne', email: 'wayne@gotham.net', password: 'Orange1234')
        def thirdAccount = new Account(handle: 'IamLexLuther', name: 'Lex Luther', email: 'lexwillruleall@gmail.com', password: 'IamCrazy1234')
        def fourthAccount = new Account(handle: 'FunnyMan', name: 'Joker Jack', email: 'jjFunny@aol.com', password: 'Hahahaha12345')

        [secondAccount, thirdAccount, fourthAccount].each { firstAccount.addToFollowers(it) }

        when:
        firstAccount.save(failOnError: true)
        secondAccount.save(failOnError: true)
        thirdAccount.save(failOnError: true)
        fourthAccount.save(failOnError: true)

        and:
        firstAccount = Account.get(firstAccount.id)

        then:
        firstAccount.followers.size() == 3
        firstAccount.followers.find { it.id == secondAccount.id }
        firstAccount.followers.find { it.id == thirdAccount.id }
        firstAccount.followers.find { it.id == fourthAccount.id }
    }

    /**
     * Test 4
     * Requirement: F2
     * Desc: Two accounts may follow each other
     */

    def 'Two accounts may follow each other'() {
        setup:
        def firstAccount = new Account(handle: 'superman', name: 'Clark Kent', email: 'kent@krypton.com', password: 'Banana1234')
        def secondAccount = new Account(handle: 'batman', name: 'Bruce Wayne', email: 'wayne@gotham.net', password: 'Orange1234')
        firstAccount.addToFollowers(secondAccount)
        secondAccount.addToFollowers(firstAccount)

        when:
        firstAccount.save(failOnError: true)
        secondAccount.save(failOnError: true)

        and:
        firstAccount = Account.get(firstAccount.id)
        secondAccount = Account.get(secondAccount.id)

        then:
        firstAccount.followers.size() == 1
        firstAccount.followers.find { it.id == secondAccount.id }
        secondAccount.followers.size() == 1
        secondAccount.followers.find { it.id == firstAccount.id }
    }
}
