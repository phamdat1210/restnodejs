package collateral

import m1t.ptud.domain.BaseDomain

class CanBoHoTro extends BaseDomain{
    String name
    String email
    String phoneNum
    String note
    static constraints = {
        name nullable: false
        email nullable: false
        phoneNum nullable: false
        note nullable: false
    }
    static mapping= {
        note maxSize: 4000
    }
}
