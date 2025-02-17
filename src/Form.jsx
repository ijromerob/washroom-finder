// this will be a form that will appear when the user clicks a place in the map
// the form will include the following fields:
// 'Location Name', 'Address', 'Description', 'Accessibility Notes', 'Hours', 'Seasonal', 'Phone', 'Web Link', 'Latitude', 'Longitude', 'status', NULL

import { useState } from 'react';

function Form({ selectedLatitude, selectedLongitude }) {
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [accessibilityNotes, setAccessibilityNotes] = useState('');
  const [hours, setHours] = useState('');
  const [seasonal, setSeasonal] = useState('');
  const [phone, setPhone] = useState('');
  const [webLink, setWebLink] = useState('');
  const [latitude, setLatitude] = useState(selectedLatitude);
  const [longitude, setLongitude] = useState(selectedLongitude);
  const [status, setStatus] = useState('Proposed');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      location_name: locationName,
      address: address,
      description: description,
      accessibility_notes: accessibilityNotes,
      hours_of_operation: hours,
      seasonal_variability_hours: seasonal,
      phone: phone,
      web_link: webLink,
      latitude: latitude,
      longitude: longitude,
      status: status,
      reviews: null,
    };

    try {
      const response = await fetch(
        'https://express-server-oktc.onrender.com/locations/location',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location Name:
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Accessibility Notes:
        <input
          type="text"
          value={accessibilityNotes}
          onChange={(e) => setAccessibilityNotes(e.target.value)}
          required
        />
      </label>
      <label>
        Hours:
        <input
          type="text"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
        />
      </label>
      <label>
        Seasonal:
        <input
          type="text"
          value={seasonal}
          onChange={(e) => setSeasonal(e.target.value)}
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>
      <label>
        Web Link:
        <input
          type="text"
          value={webLink}
          onChange={(e) => setWebLink(e.target.value)}
          required
        />
      </label>
      <label>
        Latitude:
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          readOnly
        />
      </label>
      <label>
        Longitude:
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          readOnly
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          readOnly
        />
      </label>
      <button type="submit">Propose</button>
    </form>
  );
}

export default Form;
