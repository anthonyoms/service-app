import {
  AccountBox,
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./customer.css";

export default function Customer() {
  return (
    <div className="customer">
      <div className="customerTitleContainer">
        <h1 className="customerTitle">Actualización de cliente</h1>
      </div>
      <div className="customerContainer">
        <div className="customerShow">
          <div className="customerShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="customerShowImg"
            />
            <div className="customerShowTopTitle">
              <span className="customerShowcustomername">Anna Becker</span>
              <span className="customerShowcustomerTitle">
                Software Engineer
              </span>
            </div>
          </div>
          <div className="customerShowBottom">
            <span className="customerShowTitle">Detalles de la cuenta</span>
            <div className="customerShowInfo">
              <PermIdentity className="customerShowIcon" />
              <span className="customerShowInfoTitle">annabeck99</span>
            </div>
            <div className="customerShowInfo">
              <CalendarToday className="customerShowIcon" />
              <span className="customerShowInfoTitle">10.12.1999</span>
            </div>
            <div className="customerShowInfo">
              <AccountBox className="customerShowIcon" />
              <span className="customerShowInfoTitle">Casado</span>
            </div>
            <span className="customerShowTitle">Detalles de contacto</span>
            <div className="customerShowInfo">
              <PhoneAndroid className="customerShowIcon" />
              <span className="customerShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="customerShowInfo">
              <MailOutline className="customerShowIcon" />
              <span className="customerShowInfoTitle">
                annabeck99@gmail.com
              </span>
            </div>
            <div className="customerShowInfo">
              <LocationSearching className="customerShowIcon" />
              <span className="customerShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="customerUpdate">
          <span className="customerUpdateTitle">Editar</span>
          <form className="customerUpdateForm">
            <div className="customerUpdateLeft">
              <div className="customerUpdateItem">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="customerUpdateInput"
                />
              </div>
              <div className="customerUpdateItem">
                <label>Nombre completo</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="customerUpdateInput"
                />
              </div>
              <div className="customerUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="customerUpdateInput"
                />
              </div>
              <div className="customerUpdateItem">
                <label>Teléfono</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="customerUpdateInput"
                />
              </div>
              <div className="customerUpdateItem">
                <label>Dirección</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="customerUpdateInput"
                />
              </div>
              <div className="customerUpdateItem">
                <label>Estado civil</label>
                <select
                  className="newCustomerSelect"
                  name="documentType"
                  id="documentType"
                >
                  <option value="1">Casado</option>
                  <option value="2">Soltero</option>
                </select>
              </div>
            </div>
            <div className="customerUpdateRight">
              <div className="customerUpdateUpload">
                <img
                  className="customerUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="customerUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="customerUpdateButton">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
