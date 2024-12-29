import json
import hashlib
import uuid
import time
import os
import unittest

class SecuredService:
    def __init__(self, accounts_file='Data/Accounts/Accounts.json', users_data_dir='Data/Accounts/UsersData'):
        self.accounts_file = accounts_file
        self.users_data_dir = users_data_dir
        self.load_accounts()

    def load_accounts(self):
        try:
            with open(self.accounts_file, 'r') as file:
                self.accounts = json.load(file)
        except FileNotFoundError:
            self.accounts = {}
        except json.JSONDecodeError:
            self.accounts = {}
        except Exception as e:
            print(f"Unexpected error loading accounts: {e}")
            self.accounts = {}

    def save_accounts(self):
        try:
            with open(self.accounts_file, 'w') as file:
                json.dump(self.accounts, file, indent=4)
        except Exception as e:
            print(f"Unexpected error saving accounts: {e}")

    def hash_password(self, password):
        try:
            return hashlib.sha256(password.encode()).hexdigest()
        except Exception as e:
            print(f"Unexpected error hashing password: {e}")
            return None

    def create_account(self, email, username, role, password):
        try:
            for uid, account in self.accounts.items():
                if account['email'] == email:
                    return {'status': False, 'reason': 'email already registered'}

            uid = str(uuid.uuid4())
            hashed_password = self.hash_password(password)
            if not hashed_password:
                return {'status': False, 'reason': 'failed to hash password'}

            self.accounts[uid] = {
                'email': email,
                'username': username,
                "role":[role],
                'password': hashed_password,
                'token': None,
                'token_expiry': None
            }
            self.save_accounts()
            # Initialize user data file
            user_data_file = f'{self.users_data_dir}/{uid}.dat'
            with open(user_data_file, 'w') as file:
                json.dump({}, file, indent=4)
            return {'status': True, 'uid': uid}
        except Exception as e:
            print(f"Unexpected error creating account: {e}")
            return {'status': False, 'reason': 'internal error'}

    def get_account_data(self, uid):
        try:
            return self.accounts.get(uid, None)
        except Exception as e:
            print(f"Unexpected error getting account data: {e}")
            return None

    def generate_token(self, uid):
        try:
            token = str(uuid.uuid4())
            token_expiry = time.time() + 60 * 24 * 60 * 60  # 60 days from now
            if uid in self.accounts:
                self.accounts[uid]['token'] = token
                self.accounts[uid]['token_expiry'] = token_expiry
                self.save_accounts()
                return token
            return None
        except Exception as e:
            print(f"Unexpected error generating token: {e}")
            return None

    def check_token(self, uid, token):
        try:
            account = self.accounts.get(uid)
            if account and account['token'] == token and account['token_expiry'] > time.time():
                return True
            return False
        except Exception as e:
            print(f"Unexpected error checking token: {e}")
            return False

    def save_user_data(self, uid, data):
        try:
            user_data_file = os.path.join(self.users_data_dir, f'{uid}.dat')
            with open(user_data_file, 'w') as file:
                json.dump(data, file, indent=4)
        except Exception as e:
            print(f"Unexpected error saving user data: {e}")

    def set_user_data(self, uid, data):
        try:
            if uid in self.accounts:
                self.save_user_data(uid, data)
                return True
            return False
        except Exception as e:
            print(f"Unexpected error setting user data: {e}")
            return False

    def get_user_data(self, uid):
        try:
            user_data_file = os.path.join(self.users_data_dir, f'{uid}.dat')
            with open(user_data_file, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            return None
        except json.JSONDecodeError:
            return None
        except Exception as e:
            print(f"Unexpected error getting user data: {e}")
            return None

    def get_token(self, uid):
        try:
            account = self.accounts.get(uid)
            if account:
                return account['token']
            return None
        except Exception as e:
            print(f"Unexpected error getting token: {e}")
            return None

class TestSecuredService(unittest.TestCase):
    def setUp(self):
        self.service = SecuredService(accounts_file='test_accounts.json', users_data_dir='../data/Accounts/UsersData')

    def test_create_account(self):
        response = self.service.create_account('test@example.com', 'testuser', 'password123')
        self.assertTrue(response['status'])
        self.assertIsNotNone(response['uid'])

    def test_create_account_duplicate_email(self):
        self.service.create_account('test@example.com', 'testuser', 'password123')
        response = self.service.create_account('test@example.com', 'testuser2', 'password123')
        self.assertFalse(response['status'])
        self.assertEqual(response['reason'], 'email already registered')

    def test_get_account_data(self):
        response = self.service.create_account('test2@example.com', 'testuser2', 'password123')
        uid = response['uid']
        data = self.service.get_account_data(uid)
        self.assertIsNotNone(data)
        self.assertEqual(data['email'], 'test2@example.com')
        self.assertEqual(data['username'], 'testuser2')

    def test_generate_token(self):
        response = self.service.create_account('test3@example.com', 'testuser3', 'password123')
        uid = response['uid']
        token = self.service.generate_token(uid)
        self.assertIsNotNone(token)
        account_data = self.service.get_account_data(uid)
        self.assertEqual(account_data['token'], token)

    def test_check_token(self):
        response = self.service.create_account('test4@example.com', 'testuser4', 'password123')
        uid = response['uid']
        token = self.service.generate_token(uid)
        self.assertTrue(self.service.check_token(uid, token))
        # Simulate token expiry
        self.service.accounts[uid]['token_expiry'] = time.time() - 1
        self.service.save_accounts()
        self.assertFalse(self.service.check_token(uid, token))

    def test_set_user_data(self):
        response = self.service.create_account('test5@example.com', 'testuser5', 'password123')
        uid = response['uid']
        user_data = {'key': 'value'}
        success = self.service.set_user_data(uid, user_data)
        self.assertTrue(success)
        retrieved_data = self.service.get_user_data(uid)
        self.assertEqual(retrieved_data, user_data)

    def test_get_token(self):
        response = self.service.create_account('test6@example.com', 'testuser6', 'password123')
        uid = response['uid']
        token = self.service.generate_token(uid)
        retrieved_token = self.service.get_token(uid)
        self.assertEqual(retrieved_token, token)

    def test_nonexistent_uid(self):
        fake_uid = str(uuid.uuid4())
        account_data = self.service.get_account_data(fake_uid)
        self.assertIsNone(account_data)
        token = self.service.generate_token(fake_uid)
        self.assertIsNone(token)
        self.assertFalse(self.service.check_token(fake_uid, 'fake_token'))
        self.assertFalse(self.service.set_user_data(fake_uid, {'key': 'value'}))
        user_data = self.service.get_user_data(fake_uid)
        self.assertIsNone(user_data)
        retrieved_token = self.service.get_token(fake_uid)
        self.assertIsNone(retrieved_token)

if __name__ == "__main__":
    unittest.main()
