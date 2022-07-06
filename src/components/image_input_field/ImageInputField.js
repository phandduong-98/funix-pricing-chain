import { Icon, Button } from 'react-materialize';
import { IMAGE_CID_LENGTH } from '../../constants';

const ImageInputField = ({productImages, setProductImages}) => {
    const handleAddImage = () => {
        console.log("product images", productImages);
        if (productImages.some((element) => !element || element.length !== IMAGE_CID_LENGTH)) return;
        console.log("add imageeeeeeeeeeeee");
        let tempArray = [...productImages];
        tempArray.push("");
        setProductImages(tempArray);
    }

    const handleRemoveImage = (index) => {
        console.log("product images", productImages);
        let [removedImage = productImages[index], ...tempArray] = productImages;
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
        <div style={{ display: "flex" }} class="input-field" key={index} >
            <input
                style={{ marginRight: "10px" }}
                id={`product-image-${index}`}
                type="text"
                class="validate"
                required
                value={image}
                onChange={(e) => {
                    handleImageChange(e, index);
                }}
            />
            <label class="active" for={`product-image-${index}`}>{`Image ${index}`}</label>
            <Button
                className="remove-image"
                floating
                node="button"
                tooltip="Remove image"
                icon={<Icon>remove</Icon>}
                tooltipOptions={{
                    position: 'right'
                }}
                waves="light"
                onClick={() => handleRemoveImage(index)}
            ></Button>
        </div>
    )
    return (
        <div>
            {handleImageInputField}
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
        </div >

    );
}

export default ImageInputField;