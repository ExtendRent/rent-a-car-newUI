import React from "react";
import { Typography, Row, Col, Divider, Card, Avatar, Space } from "antd";
import antDesignLogo from '../../assets/images/musteri.jpg';
import teamPhoto1 from '../../assets/images/leo3.jpg';
import teamPhoto2 from '../../assets/images/leo1.jpg';
import teamPhoto3 from '../../assets/images/leo2.jpg';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
    return (
        <div style={{ padding: "24px" }}>

            <Row  style={{ marginTop: "24px" }}>
                
                <Col xs={24} md={12}>
                    <div>
                        <Title level={2}>HAKKIMIZDA</Title>
                        <Paragraph>
                            ExtendRent, şehrinizin güvenilir ve samimi araç kiralama hizmeti sağlayıcısıdır. 2022 yılından beri sektörde liderliği ve müşteri memnuniyetini ön planda tutan yaklaşımıyla hizmet veren firmamız, müşterilerimize rahat ve konforlu bir seyahat deneyimi sunmayı amaçlamaktadır.

                            Müşterilerimizin ihtiyaçlarını anlamak ve onlara en uygun araçları sunmak için çaba gösteriyoruz. Geniş araç filomuz ve uygun fiyat politikamızla müşterilerimizin her türlü talebini karşılamak için buradayız.

                            Ekibimizdeki deneyimli ve uzman personelimiz, her adımda müşterilerimize yardımcı olmak ve onların seyahatlerini sorunsuz hale getirmek için çalışıyor. Müşteri memnuniyetini en üst düzeyde tutarak, ExtendRent olarak müşterilerimize güvenilir, kaliteli ve ekonomik bir araç kiralama deneyimi sunuyoruz.
                        </Paragraph>
                        
                    </div>
                </Col>
            </Row>
            <Divider />
            
            
            <Divider />
            <div style={{ marginTop: "24px" }}>
                <Title level={3}>MİSYONUMUZ</Title>
                <Paragraph>
                Misyonumuz, müşterilerimize güvenilir, uygun fiyatlı ve kaliteli araç kiralama hizmetleri sunarak seyahatlerini kolaylaştırmak ve memnuniyetlerini en üst düzeye çıkarmaktır. Küçük bir aile şirketi olarak, her müşterimizi özel hissettirmek ve ihtiyaçlarına özenle yanıt vermek en önemli önceliğimizdir.
                </Paragraph>
            </div>
            <Divider />
            <div style={{ marginTop: "24px" }}>
                <Title level={3}>VİZYONUMUZ</Title>
                <Paragraph>
                Vizyonumuz, Rent A Car olarak müşterilerimizin seyahat deneyimlerini iyileştirmek ve onlara en iyi hizmeti sunmak için sürekli olarak çaba göstermektir. Tek şubemizle başladık, ancak gelecekte daha fazla şube açarak daha geniş bir müşteri kitlesine ulaşmayı hedefliyoruz. Sektördeki yeniliklere açık olup, teknolojiyi kullanarak hizmet kalitemizi artırmak istiyoruz.
                </Paragraph>
            </div>
            
            <Col xs={24} md={12}>
                    <img
                        src={antDesignLogo}
                        alt="Ant Design Logo"
                        style={{ width: "100%" }}
                    />
            </Col>
                <Divider />
            <div style={{ marginTop: "24px" }}>
                <Title level={3}>Ekibimiz</Title>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card hoverable cover={<img alt="Team Member" src={teamPhoto1} />}>
                            <Card.Meta
                                avatar={<Avatar src={teamPhoto1} />}
                                title="John Doe"
                                description="Frontend Developer"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card hoverable cover={<img alt="Team Member" src={teamPhoto2} />}>
                            <Card.Meta
                                avatar={<Avatar src={teamPhoto2} />}
                                title="Jane Doe"
                                description="UI/UX Designer"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card hoverable cover={<img alt="Team Member" src={teamPhoto3} />}>
                            <Card.Meta
                                avatar={<Avatar src={teamPhoto3} />}
                                title="Alex Smith"
                                description="Backend Developer"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card hoverable cover={<img alt="Team Member" src={teamPhoto3} />}>
                            <Card.Meta
                                avatar={<Avatar src={teamPhoto3} />}
                                title="Alex Smith"
                                description="Backend Developer"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default About;
