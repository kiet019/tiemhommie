export const createUrlVNPAY = (amount: number, returnUrl: string) => {
    const vnp_Version = `vnp_Version=2.1.0`
    const vnp_Command = `vnp_Command=pay`
    const vnp_OrderInfo = `vnp_OrderInfo=Thanh+toan+don+hang`
    const vnp_OrderType = `vnp_OrderType=other`
    const vnp_TxnRef = `vnp_TxnRef=${generateUniqueRandomNumber()}`
    const vnp_IpAddr = `vnp_IpAddr=127.0.0.1`
    const vnp_TmnCode = `vnp_TmnCode=${TmnCode}`
    const baseUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
    const vnp_Amount = `vnp_Amount=${amount}`
    const vnp_CreateDate = `vnp_CreateDate=${getCurrentDateTime()}`
    const vnp_CurrCode = `vnp_CurrCode=VND`
    const vnp_Locale = `vnp_Locale=vn`
    const vnp_ReturnUrl = `vnp_ReturnUrl=${returnUrl}`
    const vnp_SecureHash = `vnp_SecureHash=${HashSecret}`
    const vnp_ExpireDate = `vnp_ExpireDate${getExpireDateTime()}`
    return `${baseUrl}?${vnp_Version}&${vnp_Command}&${vnp_OrderInfo}&${vnp_OrderType}&${vnp_TxnRef}&${vnp_IpAddr}&${vnp_TmnCode}&${vnp_Amount}&${vnp_CreateDate}&${vnp_CurrCode}&${vnp_Locale}&${vnp_ReturnUrl}&${vnp_SecureHash}&${vnp_ExpireDate}`
}

const TmnCode = `DIY6W4QL`
const HashSecret = `RRKFYAWVWBRWYCPWBKEDXTQNGLBEKBAI`


function getCurrentDateTime() {
    const now = new Date();
    const timeZoneOffset = 7 * 60; // Độ chênh lệch múi giờ, tính bằng phút (GMT+7 = 7 giờ)

    // Thực hiện cộng thời gian chênh lệch múi giờ
    now.setMinutes(now.getMinutes() + timeZoneOffset);

    // Lấy các giá trị ngày, tháng, năm, giờ, phút, giây từ đối tượng Date
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Kết hợp các giá trị thành chuỗi định dạng "yyyyMMddHHmmss"
    const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return formattedDateTime;
}



function getExpireDateTime() {
    const now = new Date();
    const timeZoneOffset = 7 * 60; // Độ chênh lệch múi giờ, tính bằng phút (GMT+7 = 7 giờ)
    // Thực hiện cộng thời gian chênh lệch múi giờ
    now.setMinutes(now.getMinutes() + timeZoneOffset);
    // Lấy ngày của ngày tiếp theo
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    // Lấy các giá trị ngày, tháng, năm, giờ, phút, giây từ đối tượng Date
    const year = nextDay.getFullYear().toString();
    const month = (nextDay.getMonth() + 1).toString().padStart(2, "0");
    const day = nextDay.getDate().toString().padStart(2, "0");
    const hours = nextDay.getHours().toString().padStart(2, "0");
    const minutes = nextDay.getMinutes().toString().padStart(2, "0");
    const seconds = nextDay.getSeconds().toString().padStart(2, "0");
    // Kết hợp các giá trị thành chuỗi định dạng "yyyyMMddHHmmss"
    const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    
    return formattedDateTime;
  }

// Sử dụng hàm để lấy thời gian hiện tại;

function generateUniqueRandomNumber() {
    const generatedNumbers = new Set();

    // Hàm hỗ trợ để sinh số ngẫu nhiên trong khoảng từ min đến max (bao gồm cả min và max)
    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại dưới định dạng "yyyy-MM-dd"

    while (true) {
        const randomNumber = getRandomNumber(1, 100); // Sinh số ngẫu nhiên từ 1 đến 100 (có thể thay đổi theo nhu cầu)

        const uniqueNumber = currentDate + randomNumber.toString().padStart(2, "0"); // Kết hợp ngày và số ngẫu nhiên thành một chuỗi

        if (!generatedNumbers.has(uniqueNumber)) {
            generatedNumbers.add(uniqueNumber);
            return uniqueNumber;
        }
    }
}
