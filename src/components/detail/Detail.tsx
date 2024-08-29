import wifi_tethering from '../../assets/wifi_tethering.svg'
import receptor from '../../assets/receptor.svg'
import motor from '../../assets/motor.png'
import Bolt from '../../assets/bolt.png'
import './index.scss'

const Detail = (props: any) => {
    return <div className='detail'>
        <div className="detail-header">
            {props.itemDetail.name} 
            {
              props.itemDetail.sensorType === 'energy' ? <img src={Bolt} alt="Bolt" /> : 
              props.itemDetail?.status !== undefined && props.itemDetail?.status !== null ? <div className={props.itemDetail.status === "alert" ? "list-item__title-alert" : "list-item__title-status" }></div> : <></>
            }
        </div>
        <div className="detail-info">
            <div className="detail-info__container">
                <div className="detail-info__container-image">
                    <img className="detail-info__container-image__img" src={motor} alt="motor" />
                </div>
                <div className="detail-info__container-details">
                    <div className="detail-info__container-details_type">
                        <strong>Tipo de Equipamento</strong>
                        <span>{props.itemDetail.sensorType}</span>
                    </div>
                    <div className="detail-info__container-details_responsible">
                        <strong>Responsáveis</strong>
                        <span>Elétrica</span>
                    </div>
                </div>
            </div>
            <div className="detail-info__down">
                <div className="detail-info__down-sensor">
                    <strong>Sensor</strong>
                    <span> <img src={wifi_tethering} alt="wifi_tethering" /> {props.itemDetail.sensorId}</span>
                </div>
                <div className="detail-info__down-gateway">
                    <strong>Receptor</strong>
                    <span> <img src={receptor} alt="receptor" /> {props.itemDetail.gatewayId}</span>
                </div>
            </div>
        </div>
    </div>
}

export default Detail