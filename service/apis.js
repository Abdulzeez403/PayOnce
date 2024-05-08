const publickey = "";
const secret = "";


const s_api_key = "82f7a4ee19cbf4a71c267ef390c378ae";
const s_public = "PK_966b09134d907cd9cabe2d8f061c612f7e257742bd1";
const s_secret = "SK_108b772e5caa5f683e02eafc2c7ab94d3ba69abab7f";

export const generateRequestID = () => {
    // Generate a random date (YYYYMMDDHHMM)
    const currentDate = new Date();
    const datePart = [
        currentDate.getFullYear(),
        String(currentDate.getMonth() + 1).padStart(2, '0'),
        String(currentDate.getDate()).padStart(2, '0'),
        String(currentDate.getHours()).padStart(2, '0'),
        String(currentDate.getMinutes()).padStart(2, '0')
    ].join('');

    // Generate a random letter
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Generate a random string (assuming 8 characters)
    const randomString = [...Array(8)].map(() => (Math.random() * 36 | 0).toString(36)).join('');

    // Concatenate the parts
    const generatedValue = `${datePart}${randomLetter}${randomString}`;

    return generatedValue;
}


export const generateReferenceNumber = () => {
    // Generate a random number with 14 digits
    const randomNumber = Math.floor(Math.random() * 90000000000000) + 10000000000000;

    // Append "ref" prefix to the random number
    const referenceNumber = "ref" + randomNumber.toString();

    return referenceNumber;
}






export const getwallet = () => {

    fetch("https://sandbox.vtpass.com/api/balance", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "api-key": s_api_key,
            "public-key": s_public,
        },
    })
        .then((response) => {
            // Handle response
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network response was not ok.");
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
};


