import requests
import unittest

class TestOrderRequests(unittest.TestCase):
    BASE_URL = "http://localhost:3001/api/store/order"

    def send_order(self, size, shipping_mode, destination, quantity, price):
        payload = {
            "size": size,
            "shippingMode": shipping_mode,
            "destination": destination,
            "quantity": quantity,
            "price": price
        }
        response = requests.post(self.BASE_URL, json=payload)
        print(response)
        return response

    def test_order_xlarge_air_usa(self):
        response = self.send_order("xlarge", "air", "usa", 1500, 20)
        self.assertEqual(response.status_code, 200)

    def test_order_small_land_india(self):
        response = self.send_order("small", "land", "india", 50, 15)
        self.assertEqual(response.status_code, 200)

    def test_order_medium_sea_bolivia(self):
        response = self.send_order("medium", "sea", "bolivia", 1000, 18)
        self.assertEqual(response.status_code, 200)

    def test_order_large_air_canada(self):
        response = self.send_order("large", "air", "canada", 750, 22)
        self.assertEqual(response.status_code, 200)

    def test_order_xlarge_land_germany(self):
        response = self.send_order("xlarge", "land", "germany", 2000, 25)
        self.assertEqual(response.status_code, 200)

    def test_order_medium_air_usa(self):
        response = self.send_order("medium", "air", "usa", 1200, 19)
        self.assertEqual(response.status_code, 200)

    def test_order_small_sea_bolivia(self):
        response = self.send_order("small", "sea", "bolivia", 300, 12)
        self.assertEqual(response.status_code, 200)

    def test_order_large_land_india(self):
        response = self.send_order("large", "land", "india", 900, 20)
        self.assertEqual(response.status_code, 200)

    def test_order_xlarge_sea_canada(self):
        response = self.send_order("xlarge", "sea", "canada", 1800, 23)
        self.assertEqual(response.status_code, 200)

    def test_order_medium_land_germany(self):
        response = self.send_order("medium", "land", "germany", 1100, 17)
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
