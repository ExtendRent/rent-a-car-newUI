import React from 'react';
import { Row, Col, Typography } from 'antd';
import about from '../../assets/images/aboutImage.jpg';
const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
            <Col xs={24} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', maxWidth: '100%', height: '100vh' }}>
                    <img src={about} alt="Resim" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                        position: "absolute",
                        top: "10%",
                        left: "22%",
                        color: "white",
                        backgroundColor: "rgb(0 0 0 / 73%)",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        width: "80%",
                        maxWidth: "800px",
                    }}>
                        <Title level={2}>HAKKIMIZDA</Title>
                            <Paragraph style={{ textAlign: "justify"}}>
                                RentACar, şehrinizin güvenilir ve konforlu araç kiralama hizmeti sağlayıcısıdır.
                                Geniş araç filomuz ve uygun fiyat politikamızla müşterilerimize en iyi deneyimi sunmayı amaçlıyoruz.
                            </Paragraph>
                            <Title level={3}>MİSYONUMUZ</Title>
                            <Paragraph style={{ textAlign: "justify"}}>
                                Misyonumuz, müşterilerimize güvenilir, uygun fiyatlı ve kaliteli araç kiralama hizmetleri sunarak seyahatlerini kolaylaştırmak ve memnuniyetlerini en üst düzeye çıkarmaktır. Küçük bir aile şirketi olarak, her müşterimizi özel hissettirmek ve ihtiyaçlarına özenle yanıt vermek en önemli önceliğimizdir.
                            </Paragraph>
                            <Title level={3}>VİZYONUMUZ</Title>

                            <Paragraph style={{ textAlign: "justify"}}>
                                Vizyonumuz, Rent A Car olarak müşterilerimizin seyahat deneyimlerini iyileştirmek ve onlara en iyi hizmeti sunmak için sürekli olarak çaba göstermektir. Tek şubemizle başladık, ancak gelecekte daha fazla şube açarak daha geniş bir müşteri kitlesine ulaşmayı hedefliyoruz. Sektördeki yeniliklere açık olup, teknolojiyi kullanarak hizmet kalitemizi artırmak istiyoruz.
                            </Paragraph>
                            <Title level={3}>DEĞERLERİMİZ</Title>
                            <Paragraph style={{ textAlign: "justify"}}>
                            Müşteri Memnuniyeti: Her zaman müşterilerimizin memnuniyetini ön planda tutuyoruz.
                            Güvenilirlik: Müşterilerimize güvenilir ve dürüst hizmet sunmaya özen gösteriyoruz.
                            Esneklik: Müşterilerimizin taleplerine esnek bir şekilde yanıt veriyoruz ve onların ihtiyaçlarına uygun çözümler sunuyoruz.
                            Toplumsal Sorumluluk: Topluma ve çevreye duyarlı bir şekilde faaliyet göstermeyi ve yerel topluluklara destek olmayı önemsiyoruz.
                            </Paragraph>
                    </div>
              </div>
            </Col>
        </Row>
    );
};

export default AboutPage;
