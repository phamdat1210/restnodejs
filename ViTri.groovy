package collateral

import m1t.ptud.GeoDistrict
import m1t.ptud.GeoProvince
import m1t.ptud.GeoStreet
import m1t.ptud.GeoWard
import m1t.ptud.domain.BaseDomain

class ViTri extends BaseDomain{
    Bbks bienBanKS
    String viTriMacDinh
    String toaDo
    GeoProvince province // tinh tp
    GeoDistrict district // quan huyen
    GeoWard ward // phuong xa
    GeoStreet street // duong pho
    String diaChiChiTiet
    Double khoangCach1
    Double khoangCach2
    static constraints = {
        viTriMacDinh nullable: false
        toaDo nullable: false
    }
}
