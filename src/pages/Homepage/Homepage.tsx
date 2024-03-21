import { Layout } from "antd";
import carVideo from "../../assets/videos/lamboBackground.mp4";
import Search from "../../components/Search/Search";
import { Content } from "antd/es/layout/layout";
import "./HomePage.css"; 
type Props = {};

const Homepage: React.FC<Props> = (props: Props) => {
  return (
    
        <div>
          <div style={{
            width: "20%",
            position: "absolute",
            top: "50%",
            left: "20%",
            transform: "translate(-52%, -50%)"
          }}>
            <p className="welcomeMessage" style={{ fontSize: "20px" }}>
              <span className="welcomeMessage-red" style={{ fontSize: "30px" }}>
                macera
              </span>{" "}
              tarihinizi belirleyin.
            </p>
            <Search />
          </div>

          <div style={{ marginTop: "50px" }}>
            <video autoPlay loop muted 
            style={{
              maxWidth: "100%",
              width: "50%",
              height: "50%",
              position: "relative",
            
              objectFit: "cover",
              transform: "translate(72%, 45%)"
 
            }}
            >
              <source src={carVideo} type="video/mp4" />
            </video>
          </div>
        </div>
     
  );
};

export default Homepage;