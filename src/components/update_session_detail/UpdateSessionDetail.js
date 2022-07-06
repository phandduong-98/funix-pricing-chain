import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSession, loadContractWithSigner } from '../../helper';
import { MAIN_CONTRACT_ADDRESS, IMAGE_CID_LENGTH } from '../../constants';
import { Icon, Button } from 'react-materialize';
import M from "materialize-css";
import { useEffect } from 'react';
import ImageInputField from '../image_input_field/ImageInputField';

const UpdateSessionDetail = ({ accounts, setAccounts, sessionAddress, getSessionDetail, setIsUpdateSessionDetail, _productName, _productDescription, _productImages }) => {
    let navigate = useNavigate();
    const isConnected = Boolean(accounts[0]);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImages, setProductImages] = useState([]);

    const handleSubmit = async () => {
        let contract = await loadContractWithSigner(MAIN_CONTRACT_ADDRESS);
        try {
            if (!validateSession(productName, productDescription, productImages)) return;
            // if (productImages.some((element) => !element || element.length !== IMAGE_CID_LENGTH)) return M.toast({ html: 'Require image hash', classes: 'rounded' });

            let tx = await contract.updateSessionDetail(sessionAddress, productName, productDescription, productImages);
            console.log("change session detail ...")
            tx.wait().then(() => {
                getSessionDetail();
                setIsUpdateSessionDetail(false);
            })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleCancel = () => {
        setIsUpdateSessionDetail(false);
    }

    useEffect(() => {
        setProductName(_productName);
        setProductDescription(_productDescription);
        setProductImages(_productImages);
    }, [])

    return (
        <div className='updates-session'>
            <div class="input-field">
                <input
                    id="product-name"
                    type="text"
                    class="validate"
                    value={productName}
                    onChange={
                        (e) => setProductName(e.target.value)
                    }
                />
                <label class="active" for="product-name">Product Name</label>
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
                <label className="active" for="product-description">Product Description</label>
                <div className='image-input-field'>
                    </div>
                    <ImageInputField productImages={productImages} setProductImages={setProductImages}/>
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