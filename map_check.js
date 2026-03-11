async function validatePlaceInLocation(place, location) {
  if (!place || !location) {
    alert("Please enter both place and location");
    return false;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(place)}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Police-Assistance-System-V2" }
    });

    const data = await res.json();

    if (data.length === 0) {
      alert("Place not found in geographic database.");
      return false;
    }

    const address = data[0].address;
    
    const hierarchy = [
      address.neighbourhood,
      address.suburb,
      address.city_district,
      address.city,
      address.town,
      address.village,
      address.county,
      address.state,
      address.country
    ].filter(Boolean).map(x => x.toLowerCase());

    const normalizedLocation = location.toLowerCase().trim();

    if (hierarchy.includes(normalizedLocation)) {
      return true;
    } else {
 
      console.warn(`Validation failed. Found hierarchy: ${hierarchy.join(", ")}`);
      contradictions.push(`Location mismatch: "${place}" does not appear to be within "${location}".`);
      return false;
    }

  } catch (error) {
    console.error("Geocoding Error:", error);
    alert("Error validating location via OpenStreetMap.");
    return false;
  }
}
