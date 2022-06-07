import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadContractWithProvider, loadContractWithSigner } from '../../helper';
import { MAIN_CONTRACT_ADDRESS, IMAGE_CID_LENGTH } from '../../constants';
import { Icon, Button } from 'react-materialize';


const UpdateSessionDetail = ({ accounts, setAccounts, sessionAddress, getSessionDetail, setIsUpdateSessionDetail }) => {
    let navigate = useNavigate();
    const isConnected = Boolean(accounts[0]);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImages, setProductImages] = useState([]);

    const handleSubmit = async () => {
        let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
        try {
            let tx = await contract.updateSessionDetail(sessionAddress,productName, productDescription, productImages);
            console.log("change session detail ...")
            tx.wait().then(() => {
                getSessionDetail();
                setIsUpdateSessionDetail(false);
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleAddImage = () => {
        console.log("product images", productImages);
        if (productImages.some((element) => !element || element.length !== IMAGE_CID_LENGTH)) return;

        console.log("add imageeeeeeeeeeeee");
        let tempArray = [...productImages];
        tempArray.push("");
        setProductImages(tempArray);
    }

    const handleImageChange = (e, index) => {
        let val = e.target.value;
        console.log("change", val);
        let imageArray = [...productImages];
        imageArray[index] = val;
        setProductImages(imageArray);
    }

    const handleImageInputField = productImages && productImages.map((image, index) =>
        <div class="input-field" key={index}>
            <input
                id={`product-image-${index}`}
                type="text"
                class="validate"
                required
                value={image}
                onChange={(e) => {
                    handleImageChange(e, index);
                }}
            />
            <label for={`product-image-${index}`}>{`Image ${index}`}</label>
        </div>
    )

    const handleCancel = () => {
        setIsUpdateSessionDetail(false);
    }

    return (
        <div className='updates-session'>
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
            {
                handleImageInputField
            }
            <div>
                <Button
                    className=""
                    floating
                    node="button"
                    tooltip="Add image"
                    icon={<Icon>add</Icon>}
                    tooltipOptions={{
                        position: 'right'
                    }}
                    waves="light"
                    onClick={handleAddImage}
                >
                </Button>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex", marginTop: "20px" }}>
                <button className='btn' onClick={handleSubmit}>Change</button>
                <button className='btn' onClick={handleCancel}>Cancel</button>
            </div>

            {/* <button className='btn' onClick={getParticipants}>Get participants</button> */}

        </div>
    );
}

export default UpdateSessionDetail;