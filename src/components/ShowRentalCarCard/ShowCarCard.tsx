import React from 'react';
import { mdiAccountGroup, mdiBagSuitcase, mdiGasStationOutline, mdiCarShiftPattern, mdiCalendarAccountOutline, mdiCarChildSeat, mdiCreditCardMultipleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import './ShowCarCard.css';
const ShowCarCard: React.FC<{ carDTO: any }> = ({ carDTO }) => {
  return (
    <div className="container-carCard">
      <div style={{ display: "flex" ,    width: "100%"}}>
        <div
          style={{
          
            marginTop: 12,
            width: "50%"
          }}
          key={carDTO.id}
        >
          <div
            className="card-header"
            style={{
              textAlign: "center",
              paddingTop: "20px",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#A8A8A8"
            }}
          >
            ARACINIZ
          </div>
            <div className="card-image">
          <img
            src={carDTO.imageEntityImageUrl}
            loading="lazy"
            alt=""
            style={{
              maxWidth: "100%",
              height: "200px",
              marginBottom: 1.6,
              transition: "transform 0.3s ease",
            }}
          />
          <div
            
            style={{
              margin:"21px",
              textAlign: "center",
              paddingTop: "20px",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          > 
          </div>
          </div>
        </div>

        <div style={{ display: "flex" ,margin: "112px auto auto",width: "50%"}}>
          <div
            style={{
              
              borderWidth: 1.5,
              borderColor: "#E1DED9",
              paddingLeft: "171px",
              width: "100%",
              color: "#A8A8A8",
            }}
          >
            <div style={{ marginBottom: 1.6 }}>
              <span style={{ fontSize: "1.25rem", fontWeight: "bold",color:"#FFFFFF" }}>
                Araç Özellikleri
              </span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiAccountGroup}
                size={1}
                className="iconClass"
              />
              <span>{carDTO.seat} Kişi</span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiBagSuitcase}
                size={1}
                className="iconClass"
              />
              <span>{carDTO.luggage} Büyük Bavul</span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiGasStationOutline}
                size={1}
                className="iconClass"
              />
              <span>{carDTO.fuelTypeEntityName}</span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiCarShiftPattern}
                size={1}
                className="iconClass"
              />
              <span>{carDTO.shiftTypeEntityName}</span>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default ShowCarCard;
