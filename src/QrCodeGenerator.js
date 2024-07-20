import { useState } from 'react';
import './QrCodeGenerator.css';

function App() {

  const [qr_image, set_qr_image] = useState("");
  const [loading, set_loading] = useState(false);
  const [qr_data, set_qr_data] = useState("");
  const [qr_size, set_qr_size] = useState("");

  async function generateQr() 
  {
    set_loading(true);
    try {
      set_loading(true);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qr_size}x${qr_size}&data=${encodeURIComponent(qr_data)}`;
      set_qr_image(url);
    } catch (error) {
      console.log("Error loading QR");
    } finally {
      set_loading(false);
    }
  }

  function downloadQr() 
  {
    fetch(qr_image)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="your_qr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.log("Error in Downloading", error);
    });
  }


  return (
    <div className='app-container'>
      <h1>QR Code Generator</h1>
      {loading && <p>Please wait...</p>}
      {qr_image && <img src={qr_image} alt='logo' className='qr-code-image' />} 
      <div>
        <label htmlFor='urlInput' className='input-label'>Data for QR Code:</label>
        <input type='text' id='dataInput' value={qr_data} placeholder='Enter the URL' onChange={(e)=>set_qr_data(e.target.value)}/>
        <label htmlFor='imagesizeInput' className='input-label'>Image Size:</label>
        <input type='text' id='imagesizeInput' value={qr_size} placeholder='Enter the image size' onChange={(e)=>set_qr_size(e.target.value)} />
        <button className='generate-qr' onClick={generateQr}>Generate QR</button>
        <button className='download-qr' onClick={downloadQr}>Download QR</button>
      </div>
    </div>
  );
}

export default App;
