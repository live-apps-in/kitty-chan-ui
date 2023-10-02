export function hexToRgb(hex: string) {
  // Remove the '#' character if it's included
  hex = hex.replace(/^#/, '');

  // Parse the hex string into three parts: red, green, and blue
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Combine the RGB values into a single number
  const rgbValue = (r << 16) + (g << 8) + b;
  return rgbValue;
}

export function rgbToHex(rgbValue: number): string {
  // Convert the decimal RGB value to hexadecimal
  const hexColor = '#' + rgbValue.toString(16).padStart(6, '0');
  return hexColor;
}

export function filterEmptyFields(embedData: any) {
  // Helper function to recursively filter out empty properties
  function recursivelyFilter(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        // If the property is an object (but not an array), recursively filter it
        recursivelyFilter(obj[key]);

        // Check if all properties within the object are empty
        const isEmpty = Object.values(obj[key]).every(
          (value) => value === '' || value === undefined
        );
        if (isEmpty) {
          delete obj[key];
        }
      } else if (obj[key] === '' || obj[key] === undefined) {
        // If the property is empty or undefined, delete it
        delete obj[key];
      }
    }
  }

  // Create a copy of the input data to avoid modifying it directly
  const filteredData = { ...embedData };

  // Filter out empty fields and include `fields` only when it contains non-empty objects
  if (filteredData.fields && filteredData.fields.length > 0) {
    filteredData.fields = filteredData.fields.filter(
      (field: any) => field.name || field.value
    );
    if (filteredData.fields.length === 0) {
      delete filteredData.fields;
    }
  }

  // Recursively filter empty properties within the main object
  recursivelyFilter(filteredData);

  return filteredData;
}
