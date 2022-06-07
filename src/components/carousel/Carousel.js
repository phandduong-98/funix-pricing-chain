import React, { useEffect, useRef } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import styles from "./Carousel.module.css";
const Carousel = ({ images }) => {
    let carousel = useRef(null);

    useEffect(() => {
        if (images) {
            const options = {
                duration: 300,
                // fullWidth: true,
                indicators: true

            };
            console.log(carousel)
            M.Carousel.init(carousel.current, options);
        }
        console.log("no images");
    }, [images])

    return (
        <>
            {images &&
                <div
                    ref={carousel} 
                    className={`carousel ${styles.custom_carousel}`}
                >
                    {
                        images.map(image => <a className="carousel-item" key={image}><img alt={`${image}`} src={`https://ipfs.infura.io/ipfs/${image}`} /></a>)
                    }
                </div>
            }
        </>
    );
}

export default Carousel;
