import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

class PrivacyPolicy extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textStyle2}>KİŞİSEL VERİLERİNİZİN KORUNMASI</Text>

                    <Text style={styles.textStyle}>
                        Turkcell İletişim Hizmetleri A.Ş. ve grup şirketleri* (hep birlikte “Turkcell” olarak
                        anılacaktır.)
                        tarafından toplanan ve işlenen kişisel veriler, Turkcell’in koruması altındadır. Turkcell, 6698
                        sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”) ve ilgili mevzuat çerçevesinde kişisel
                        verilerin
                        güvenli şekilde muhafazasını ve hukuka uygun olarak işlenmesini sağlamak için teknolojik ve alt
                        yapısal imkanlarını kullanarak, gerekli teknik ve idari tedbirleri almaktadır.
                    </Text>

                    <Text style={styles.textStyle}>
                        Kişisel veriler, Turkcell tarafından Turkcell Gizlilik Politikası kapsamında Kanun’a ve ilgili
                        mevzuata uygun olarak işlenmektedir. Kanun kapsamında kişisel verileri işlenen gerçek kişiler,
                        aşağıdaki metni inceleyerek, Turkcell tarafından veri sorumlusu sıfatıyla işlenebilecek olan
                        kişisel
                        veriler ve bunların işlenme amaçları, aktarılabileceği alıcı gruplarına, toplanma yöntemi ve
                        hukuki
                        sebebi ile söz konusu kişisel verilere ilişkin hakları hakkında bilgi edinebilir.
                    </Text>

                    <Text style={styles.textStyle}>
                        * Superonline İletişim Hizmetleri A.Ş., Turktell Bilişim Servisleri A.Ş., Turkcell Satış ve
                        Dijital
                        İş Servisleri A.Ş.
                    </Text>

                    <Text style={styles.textStyle}>
                        Kişisel veriler, kimliğinizi belirleyen ya da belirlenebilir kılan bilgiler anlamına
                        gelmektedir.
                        Turkcell tarafından işlenebilecek kişisel verilerinize ait kategoriler, aşağıda belirtilmiştir:
                    </Text>

                    <Text style={styles.textStyle}>
                        Kimlik Bilgileri: Bu veri kategorisi, T.C. Kimlik Numarası, ad, soyad, doğum yeri ve tarihi,
                        medeni
                        durum, cinsiyet, kimlik belgesi örneği, fotoğraf gibi veri türlerini ifade etmektedir.
                        İletişim Bilgileri: Bu veri kategorisi, adres, telefon/faks numarası, e-posta adresi gibi veri
                        türlerini ifade etmektedir.
                    </Text>

                    <Text style={styles.textStyle}>
                        Abonelik Bilgileri: Bu veri kategorisi, müşteri numarası, abonelik sözleşmesi numarası, abonelik
                        türü ve durumu, tarife ve paket bilgileri, katma değerli servis abonelikleri ile ürün ve
                        hizmetlerin
                        kullanımı ile ilgili bilgileriniz; fatura, borç ve ödemelere ilişkin bilgileriniz gibi veri
                        türlerini ifade etmektedir.
                    </Text>

                    <Text style={styles.textStyle}>
                        Şebeke,Trafik ve Konum Bilgileri: Bu veri kategorisi, mesajların ve aramaların tarihi, saati ve
                        arama süresi ile internet ortamında yapılan erişimlere ilişkin olarak sisteme bağlantı ile
                        sistemden
                        çıkış tarih ve saat bilgileri, kaynak ve hedef nokta bilgileri gibi trafik verileriniz ile diğer
                        bağlantı bilgileri; kullanılan cihaza ve SIM karta ilişkin bilgiler ile söz konusu cihazın konum
                        bilgileri; ürün ve hizmetlerin kullanımı doğrultusunda oluşan kullanım verileriniz ile
                        hizmetlerin
                        sunulması için gerekli teknik veriler gibi veri türlerini ifade etmektedir.
                        Satış Kanallarındaki Bilgiler: Bu veri kategorisi, satış süreçlerinde ilettiğiniz bilgi ve
                        belgeler;
                        elektronik veya fiziki vasıtalar aracılığıyla iletişime geçildiğinde elde edilen veriler; çağrı
                        merkezi standartları gereği tutulan sesli görüşme kayıtlarınız; talebiniz halinde kimlik teyit
                        vasıtası olarak kullanılmak üzere ses kaydınız; satış kanallarındaki talep ve işlem bilgileriniz
                        gibi veri türlerini ifade etmektedir.
                    </Text>

                    <Text style={styles.textStyle}>
                        Ürün ve Hizmet Kullanımına Ait Bilgiler: Bu veri kategorisi,ürün ve hizmetlerin kullanılmasına
                        ilişkin tercihler, alışkanlıklar ve diğer kullanım bilgileriniz; www.turkcell.com.tr ve
                        www.superonline.net başta olmak üzere, Turkcell’in kendisinin veya üçüncü kişilerle
                        işbirliğiyle,
                        ürün ve hizmetlerin sunulması, kullandırılması ya da tanıtılması için oluşturulan internet
                        sitelerindeki ve mobil uygulamalardaki davranış bilgileriniz ve çerezler; mobil uygulamalar
                        vasıtasıyla toplanabilecek cihaz, şebeke, ağ, uygulama, konum ve kullanım bilgilerinizgibi veri
                        türlerini ifade etmektedir.
                    </Text>

                    <Text style={styles.textStyle}>
                        Ödeme, Banka ve Risk Bilgileri: Bu veri kategorisi, (i) Cihaz kampanyalarında ve servislere
                        aboneliklerde finansal yeterlilik ön değerlendirmesi yapabilmek için; kredi notu bilgileri ile
                        kredi
                        kartı, banka hesabı ve banka kartı dahil olmak üzere banka bilgileriniz; (ii) Turkcell Ödeme ve
                        Elektronik Para Hizmetleri A.Ş.’nin sunduğu ödeme hizmetlerinden faydalanmak için ve/veya
                        Turkcell
                        Finansman A.Ş.’den hizmet almak için müracaatta bulunmanız/hizmet almanız durumunda, kimlik ve
                        iletişim bilgileri, abonelik bilgileri, geçmiş dönem de dahil ödeme performansı, konum bilgisi,
                        hattın mobil ödeme kullanımı bilgileri, varsa ön ödemeli hat kullanım verileri vb. bilgileriniz
                        ile
                        kullanılan kredi olması halinde kredi sözleşmesi ve eklerinde yer alan bilgiler ile limit/risk,
                        limiti etkileyen hususlar, teminat, gecikme ve cayma gibi veri türlerini ifade etmektedir.
                        Özel Nitelikli Kişisel Bilgiler: Bu veri kategorisi, (i) sosyal açıdan desteklenmesi gereken
                        kesimlere (engelli, malul, gazi gibi) ait sağlık verileri ile (ii) dernek, vakıf ya da sendika
                        üyeliği bilgileri gibi veri türlerini ifade etmektedir.

                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 25,
        marginHorizontal: 10,
    },
    textStyle: {
        color: '#123345',
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 5,
    },
    textStyle2: {
        color: '#123345',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'left',
        marginVertical: 5,
    },
});

export default PrivacyPolicy;
