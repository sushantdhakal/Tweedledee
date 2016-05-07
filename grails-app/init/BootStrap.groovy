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

        def admin4 = new Account(handle:'RealRoyFielding',name:'Roy Fielding',password:'12345678pP',email:'roy@tweedledee.com').save(flush: true, failOnError: true)
        def role4 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin4, role: role4).save(flush: true, failOnError: true)

        def admin5 = new Account(handle:'FeelTheBern',name:'Bernie Sanders',password:'12345678pP',email:'bernie@tweedledee.com').save(flush: true, failOnError: true)
        def role5 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin5, role: role5).save(flush: true, failOnError: true)

        def admin6 = new Account(handle:'costco',name:'Costco Corp',password:'12345678pP',email:'costco@tweedledee.com').save(flush: true, failOnError: true)
        def role6 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin6, role: role6).save(flush: true, failOnError: true)

        def admin7 = new Account(handle:'daredevil',name:'Dare Devil',password:'12345678pP',email:'devil@tweedledee.com').save(flush: true, failOnError: true)
        def role7 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin7, role: role7).save(flush: true, failOnError: true)

        def admin8 = new Account(handle:'ShakespeareAndCompany',name:'William Shakespeare',password:'12345678pP',email:'sco@tweedledee.com').save(flush: true, failOnError: true)
        def role8 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin8, role: role8).save(flush: true, failOnError: true)

        def admin9 = new Account(handle:'maserati',name:'Maserati Co.',password:'12345678pP',email:'maserati@tweedledee.com').save(flush: true, failOnError: true)
        def role9 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin9, role: role9).save(flush: true, failOnError: true)

        def admin10 = new Account(handle:'BMW',name:'BMW Motors',password:'12345678pP',email:'bmw@tweedledee.com').save(flush: true, failOnError: true)
        def role10 = new Role(authority: 'ROLE_READ').save(flush: true, failOnError: true)
        new AccountRole(account: admin10, role: role10).save(flush: true, failOnError: true)

        admin.addToFollowing(admin1).save(flush: true, failOnError: true);

        admin2.addToFollowers(admin).save(flush: true, failOnError: true);
        admin1.addToFollowers(admin2).save(flush: true, failOnError: true);
        admin.addToFollowing(admin2).save(flush: true, failOnError: true);

        admin2.addToFollowers(admin3).save(flush: true, failOnError: true);
        admin3.addToFollowing(admin2).save(flush: true, failOnError: true);

        admin1.addToFollowing(admin4).save(flush: true, failOnError: true);
        admin1.addToFollowing(admin5).save(flush: true, failOnError: true);
        admin1.addToFollowing(admin6).save(flush: true, failOnError: true);
        admin1.addToFollowing(admin7).save(flush: true, failOnError: true);
        admin1.addToFollowing(admin8).save(flush: true, failOnError: true);
        admin1.addToFollowing(admin9).save(flush: true, failOnError: true);
        admin1.addToFollowing(admin10).save(flush: true, failOnError: true);

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

        /* More users
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
        ctt=ctt+1*/
    }

    def destroy = {
    }

}