import tweedledee.Account
import tweedledee.Message
import tweedledee.Role
import tweedledee.AccountRole
import groovy.time.TimeCategory

class BootStrap {


    def init = { servletContext ->
        
        // Primary users
        def admin = new Account(handle:'admin',name:'Johnny Admin',password:'12345678pP',email:'admin@tweedledee.com').save(flush: true, failOnError: true)
        def role = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin, role: role).save(flush: true, failOnError: true)

        def admin1 = new Account(handle:'sushantdhakal',name:'Sushant Dhakal',password:'12345678pP',email:'sushant@tweedledee.com').save(flush: true, failOnError: true)
        def role1 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin1, role: role1).save(flush: true, failOnError: true)

        def admin2 = new Account(handle:'paulM',name:'Paul S Michalek',password:'12345678pP',email:'paul@tweedledee.com').save(flush: true, failOnError: true)
        def role2 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin2, role: role2).save(flush: true, failOnError: true)

        def admin3 = new Account(handle:'mikeCalvo',name:'Mike Calvo III',password:'12345678pP',email:'mike@tweedledee.com').save(flush: true, failOnError: true)
        def role3 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin3, role: role3).save(flush: true, failOnError: true)

        admin1.addToFollowers(admin).save(flush: true, failOnError: true);
        admin.addToFollowing(admin1).save(flush: true, failOnError: true);

        admin2.addToFollowers(admin).save(flush: true, failOnError: true);
        admin.addToFollowing(admin2).save(flush: true, failOnError: true);

        admin2.addToFollowers(admin3).save(flush: true, failOnError: true);

        (1..128).each {
            msgNumber -> admin.addToMessages(text: "This is admin's message# $msgNumber").save(flush: true, failOnError: true)
        }

        (1..100).each {
            msgNumber -> admin1.addToMessages(text: "This is Sushant's message# $msgNumber").save(flush: true, failOnError: true)
        }

        (1..55).each {
            msgNumber -> admin2.addToMessages(text: "This is Paul's message# $msgNumber").save(flush: true, failOnError: true)
        }

        (1..43).each {
            msgNumber -> admin3.addToMessages(text: "This is Mike's message# $msgNumber").save(flush: true, failOnError: true)
        }

        // More users
        (1..5).each {
            def ct1=it
            def pp=[handle:"hulk_${ct1}",name:'Hulk Hogan ${ct1}',email:"hulk${ct1}@iam.me",password:'12345678aA']
            def account = new Account( pp )
            account.save()
            if(account.handle){
                //new AccountRole(user:account,role:role).save()
                def ah=account.handle
                (1..25).each {
                    def ct2=it
                    def mm= [text:"This is a new message ${ct2} for ${ah}",account:account]
                    def mesg = new Message(mm)
                    mesg.save()
                    if(mesg.dateCreated){
                        def ddd=mesg.dateCreated
                        use(TimeCategory){
                            def rx=new java.util.Random()
                            def nx=rx.nextInt(52)
                            mesg.dateCreated=ddd-nx.week+2.hours
                        }
                        mesg.save()
                    }
                    //if(!mesg.id) rr.add(failed:"Message loop ${ct2} for ${ah} failed to post")
                } 
            } else rr.add(failed:"Account loop ${ct1} failed to post")
        }
        def ss=Account.list()
        def ctt=1
        if(ss){
            def nn=ss.id
            nn.each(){
                def tt=it
                ss.each(){
                    if(it.id!=tt){
                        def v=Account.get(tt)
                        if(v) it.addToFollowers(v)
                        it.save()
                        if(ctt!=2||ctt!=4){
                            v.addToFollowing(it)
                            v.save()
                        }
                    }
                }
            }
        }
        ctt=ctt+1
    }

    def destroy = {
    }

}