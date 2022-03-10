package collateral

import m1t.ptud.GeoDistrict
import m1t.ptud.GeoProvince
import m1t.ptud.GeoStreet
import m1t.ptud.GeoWard
import m1t.ptud.domain.BaseDomain

class Bbks extends BaseDomain{
    Collateral collateral // tai san duoc gan bbks
    Date ngayKS
    String mauBBKS

    //thong tin chung
    String chiNhanh
    String diaChi //dia chi chi nhanh
    String nguoiDaiDien

    String tenKH
    String diaChiKH
    String nguoiHDKS //nguoi huong dan khao sat
    String qhChuTS // moi quan he voi chu TS

    String hoTenCBDG
    String chucVuCBDG

    //thong tin hien trang TS
    //chcc
    //dia diem hien tai cua can bo
    String toaDo
    GeoProvince province // tinh tp
    GeoDistrict district // quan huyen
    GeoWard ward // phuong xa
    GeoStreet street // duong pho
    String diaChiChiTiet

    //dia diem tai san tren ban do
    String toaDo2
    GeoProvince province2 // tinh tp
    GeoDistrict district2 // quan huyen
    GeoWard ward2 // phuong xa
    GeoStreet street2 // duong pho
    String soNha

    //dia chi can ho
    String diaChiHSPL // dia chi theo HSPL
    String diaChiKSTT // dia chi theo khao sat thuc te
    Double dtdHSPL //dien tich đất tren HSPL
    Double dtsdThucTe // dien tich su dung thuc te
    String mucdichsd // muc dich su dung
    String huongThuaDat // huong thua dat
    String hinhDangThuaDat // hinh dang thua dat
    Double kichThuocThuaDat //kich thuoc thua dat

    //Mô tả xung quanh thửa đất (Giáp ranh)
    String phiaTruocGiap
    String phiaSauGiap
    String benPhaiGiap
    String benTraiGiap
    String canhQuanMoiTruong
    String thongTinQuyHoach
    String thongTinTranhChap
    String dcThucTeHSPL //doi chieu thuoc te va ho so phu luc
    String dcBanSaoBanGoc // doi chieu ban sao ban goc

    //toa nha co can ho dinh gia
    String dpVaoToaNha //duong pho di vao toa nha
    Double kcBDSGTC // khoang cach tu bds toi duong giao thong chinh
    Double mcnNhoNhat // mat cat ngo nho nhat
    Double mcnPhiaTruoc // mat cat ngo phia truoc
    Double doRongVhTiepGiap // do rong via he tiep giap
    Double soTangNoi
    Double soTangHam
    Integer soThangMay
    String ctTienIch //cong trinh tien ich
    Integer namXD
    String tlhcKhac //thuan loi han che khac

    //can ho dinh gia
    Integer tangSo
    String huongBanCong
    String huongCuaChinh
    String viTri
    Double dtchHSPL //dien tich can ho tren HSPL
    Double dtchThucTe // dien tich can ho thuc te
    Integer soPhongNgu
    Integer soPhongVS
    String tinhTrangCH
    String doiChieuTTHSPL  // doi chieu vi tri thuc te va HSPL
    Double soTang //so tang
    Double tongDtXd //tong dien tich xay dung
    Double tongDtSanXd //tong dien tich san xay dung
    Double viTriCTXD //vi tri ctxd so voi khuon vien thua dat
    Double namXdCHDG //nam xay dung
    Double namSuaChua //nam sua chua cai tao
    String danhGiaTTCT //danh gia tinh trang cong trinh
    String tlhcKhacCHDG // thuan loi han che khac

    //hinh anh
    String anhSoDo // luu link anh
    String anhTaiSan // luu link anh dang list jsonobject

    //thong tin chu TS
    String hoTenCTS // ho ten chu tai san
    Integer namSinh
    String sdtCTS
    String hieuBieuCTSvePL // hieu biet cua chu ts ve phap ly
    String mqhCTSvaKH // moi quan he chu ts va khac vay von
    String taiSanCSH // tai san cua chu so huu

    //Thông tin TS thực tế
    Long soKhungTT
    Long soMayTT
    //Đối chiếu với hồ sơ pháp lý
    Long soKhungHSPL
    Long soMayHSPL
    //hien trang khai thac su dung ts
    String hienTrangSD
    String hoTenNSD
    String sdtNSD
    String qhNSDvaCTS // quan he nguoi su dung va chu ts
    Integer tgSDTS  //thoi gian sd tai san
    String hangSX // hang san xuat
    Integer namSX //nam san xuat
    String model // model
    String nuocSX // nuoc san xuat
    String thongSoKT // thong so ky thuat
    Long soKMDaDi // so km da di
    String ttNoiThat // tinh trang noi that
    String ttNgoaiThat // tinh trang ngoai that
    String ttHoatDong // tinh trang hoat dong


    //tai san hinh thanh tu von vay
    Integer tgSDTS2  //thoi gian sd tai san
    Boolean bbCoThamGiaKSHT // ben ban co tham gia khao sat hien trang
    String hoTenNguoiBan
    String sdtNB //sdt ngoi ban
    Double giaBan
    String ghiChu

    //tai lieu bo sung
    String bbKiemTraHT //bien ban kiem tra hien trang
    String hsPhapLy // luu link anh dang list jsonobject

    String trangThaiBBKS //trang thai bbks
    static constraints = {
        ngayKS nullable: false
        mauBBKS nullable: false
        chiNhanh nullable: false
        diaChi nullable: false
        tenKH nullable: false
        qhChuTS nullable: false
        toaDo nullable: false
        diaChiChiTiet maxSize: 4000
        toaDo2 nullable: false
        province2 nullable: false
        district2 nullable: false
        ward2 nullable: false
        street2 nullable: false
        soNha nullable: false
        diaChiHSPL nullable: false
        diaChiKSTT nullable: false
        dtdHSPL nullable: false
        mucdichsd nullable: false
        tlhcKhac nullable: false
        tangSo nullable: false
        huongBanCong nullable: false
        viTri nullable: false
        dtchHSPL nullable: false
        dtchThucTe nullable: false
        soPhongNgu nullable: false
        tinhTrangCH nullable: false
        tlhcKhacCHDG nullable: false
        hoTenCTS nullable: false
        hoTenNSD nullable: false
        sdtNSD nullable: false
        qhNSDvaCTS nullable: false
        tgSDTS nullable: false
        ghiChu maxSize: 4000
        doRongVhTiepGiap maxSize: 4000
        soTang nullable: false
        tongDtXd nullable: false
        tongDtSanXd nullable: false
        namXdCHDG nullable: false
        taiSanCSH nullable: false
        soKhungTT nullable: false
        soMayTT nullable: false
        soKhungHSPL nullable: false
        soMayHSPL nullable: false
        hangSX nullable: false
        namSX nullable: false
        model nullable: false
        nuocSX nullable: false
        thongSoKT nullable: false
        soKMDaDi nullable: false
        ttNoiThat nullable: false
        ttNgoaiThat nullable: false
        ttHoatDong nullable: false
    }
    static mapping = {
        tlhcKhac sqlType: 'clob'
        tinhTrangCH sqlType: 'clob'
        tlhcKhacCHDG sqlType: 'clob'
        anhTaiSan sqlType: 'clob'
        mqhCTSvaKH sqlType: 'clob'
        bbKiemTraHT sqlType: 'clob'
        hsPhapLy sqlType: 'clob'
    }
}
