import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadContractWithSigner, validateSession } from "../../helper";
import { MAIN_CONTRACT_ADDRESS, IMAGE_CID_LENGTH } from "../../constants";
import { Icon, Button } from "react-materialize";
import M from "materialize-css";
import ImageInputField from "../../components/image_input_field/ImageInputField";

const CreateNewSession = ({ accounts, setAccounts }) => {
  let navigate = useNavigate();
  const isConnected = Boolean(accounts[0]);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [sessionDuration, setSessionDuration] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const handleSubmit = async () => {
    let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
    try {
      if (!validateSession(productName, productDescription, productImages))
        return;
      // if (productImages.some((element) => !element || element.length !== IMAGE_CID_LENGTH)) return M.toast({ html: 'Require image hash', classes: 'rounded' });

      let tx = sessionDuration
        ? await contract.createNewSession(
            productName,
            productDescription,
            productImages,
            sessionDuration
          )
        : await contract.createNewSession(
            productName,
            productDescription,
            productImages,
            0
          );
      console.log("sessionDuration", sessionDuration);
      tx.wait().then(() => {
        navigate("../sessions");
      });
    } catch (error) {
      console.log("Error: ", error);
      console.log(sessionDuration)
    }
  };

  return (
    <div
      className="create-session container"
      style={{
        border: "1px solid gray",
        borderRadius: "30px",
        padding: "20px",
        width: "30vw",
        marginTop: "50px",
        boxShadow: "#f95997 0px 0px 5px",
      }}
    >
      <h4
        style={{
          color: "#f95997",
          justifyContent: "center",
          display: "flex",
          paddingBottom: "30px",
        }}
      >
        Create New Session
      </h4>
      <div class="input-field">
        <input
          id="product-name"
          type="text"
          class="validate"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label for="product-name">Product Name</label>
      </div>

      <div class="input-field">
        <input
          id="product-description"
          type="text"
          class="validate"
          required
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <label for="product-description">Product Description</label>
      </div>

      <div class="input-field">
        <input
          id="duration"
          type="number"
          class="validate"
          value={sessionDuration}
          onChange={(e) => setSessionDuration(e.target.value)}
        />
        <label for="duration">Duration</label>
      </div>
      <ImageInputField
        productImages={productImages}
        setProductImages={setProductImages}
      />
      <div style={{ justifyContent: "center", display: "flex" }}>
        <button className="btn" onClick={handleSubmit}>
          Create
        </button>
      </div>

      {/* <button className='btn' onClick={getParticipants}>Get participants</button> */}
    </div>
  );
};

export default CreateNewSession;
