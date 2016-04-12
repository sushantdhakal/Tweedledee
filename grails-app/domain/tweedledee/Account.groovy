package tweedledee

class Account {

    transient springSecurityService

    String handle
    String name
    String email
    String password
    Date dateCreated

    boolean enabled=true
    boolean accountExpired=false
    boolean accountLocked=false
    boolean passwordExpired=false
  
    Set<Role> getAuthorities() {
        AccountRole.findAllByAccount(this)*.role
    }

    def beforeInsert() {
        encodePassword()
    }

    def beforeUpdate() {
        if (isDirty('password')) {
            encodePassword()
        }
    }

    protected void encodePassword() {
        password = springSecurityService?.passwordEncoder ?
        springSecurityService.encodePassword(password) :
        password
    }

    static hasMany = [ followers : Account, following : Account, messages : Message ]

    static mapping = {
        messages sort:'dateCreated'
    }
    static constraints = {
        handle nullable:false, unique:true
        name nullable:false
        email nullable:false,email:true,unique:true
        password nullable:false
    }


}
