import { useState } from "react";
import { useFavorite } from "../context/favorite";

function Images() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { contract, images, loading: loadingImages } = useFavorite();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleUpload = async () => {
    if (!value) return;

    setLoading(true);
    try {
      const tx = await contract.mint(value);
      await tx.wait();

      setValue("");
    } catch (error) {
      console.error("TX error: ", error.message);
    }

    setLoading(false);
  };

  const handleLike = async (id) => {
    setLoading(true);
    try {
      const tx = await contract.like(id);
      await tx.wait();
    } catch (error) {
      console.error("LIKE ERROR: ", error.message);
    }
    setLoading(false);
  };

  const handleUnLike = async (id) => {
    setLoading(true);
    try {
      const tx = await contract.unlike(id);
      await tx.wait();
    } catch (error) {
      console.error("UNLIKE ERROR: ", error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="">
        <span>Paste the image URL:</span>
        &nbsp;&nbsp;&nbsp;
        <input type="text" value={value} onChange={handleChange} />
        &nbsp;&nbsp;&nbsp;
        <button onClick={handleUpload} disabled={loading}>
          Upload
        </button>
      </div>

      <div className="container">
        {loadingImages ? (
          <h5>Loading Images....</h5>
        ) : (
          <ul>
            {images &&
              images.length &&
              images.map((image) => (
                <li key={image.id}>
                  <img alt={image.id} src={image.url} />
                  {image.liked ? (
                    <button disabled={loading} onClick={() => handleUnLike(image.id)}>
                      UnLike
                    </button>
                  ) : (
                    <button disabled={loading} onClick={() => handleLike(image.id)}>Like</button>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Images;
